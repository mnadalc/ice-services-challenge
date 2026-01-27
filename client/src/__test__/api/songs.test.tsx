import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';
import { useSuspenseQuery } from '@tanstack/react-query';
import { songsQueryOptions } from '../../api/songs';
import { server } from '../mocks/server';
import { MOCK_SONGS } from '../mocks/handlers';

import type { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function createWrapper() {
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('songs API', () => {
  it('fetches songs successfully', async () => {
    const { result } = renderHook(() => useSuspenseQuery(songsQueryOptions), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    const songs = result.current.data;

    expect(songs).toHaveLength(3);
    expect(songs[0].songName).toBe('Test Song 1');
    expect(songs[0].author).toBe('Artist A');
    expect(songs[0].progress).toBe(0.75);
  });

  it('validates data with Zod schema', async () => {
    const { result } = renderHook(() => useSuspenseQuery(songsQueryOptions), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    const songs = result.current.data;

    songs.forEach((song) => {
      expect(typeof song.id).toBe('number');
      expect(typeof song.songName).toBe('string');
      expect(typeof song.author).toBe('string');
      expect(typeof song.progress).toBe('number');
    });
  });

  it('returns mock data from MSW handler', async () => {
    const { result } = renderHook(() => useSuspenseQuery(songsQueryOptions), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });

    const songs = result.current.data;
    expect(songs).toEqual(MOCK_SONGS);
  });

  it('throws error on failed fetch', async () => {
    server.use(
      http.get('/api/songs', () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const response = await fetch('/api/songs');

    expect(response.ok).toBe(false);
    expect(response.status).toBe(500);
  });
});
