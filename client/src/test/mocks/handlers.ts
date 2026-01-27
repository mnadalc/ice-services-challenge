import { http, HttpResponse } from 'msw';
import type { Song } from '../../types/types';

export const mockSongs: Song[] = [
  { id: 1, songName: 'Test Song 1', author: 'Artist A', progress: 0.75 },
  { id: 2, songName: 'Test Song 2', author: 'Artist B', progress: 0.5 },
  { id: 3, songName: 'Test Song 3', author: 'Artist C', progress: 1.0 },
];

export const handlers = [
  http.get('/api/songs', () => {
    return HttpResponse.json(mockSongs);
  }),
];
