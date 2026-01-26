import { queryOptions, type QueryFunction } from '@tanstack/react-query';
import { songsSchema, type Song } from '../types/types';

const fetchSongs: QueryFunction<Song[], ['songs']> = async () => {
  const response = await fetch('/api/songs');

  if (!response.ok) {
    throw new Error('Failed to fetch songs');
  }

  const data = await response.json();
  return songsSchema.parse(data);
};

export const songsQueryOptions = queryOptions({
  queryKey: ['songs'],
  queryFn: fetchSongs,
});
