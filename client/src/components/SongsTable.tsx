import type { Song } from '../types/types';

const MOCK_SONGS: Song[] = [
  { id: 1, songName: 'Flowers', author: 'Miley Cyrus', progress: 0.15 },
  { id: 2, songName: 'Anti-Hero', author: 'Taylor Swift', progress: 0.27 },
  { id: 3, songName: 'As It Was', author: 'Harry Styles', progress: 0.12 },
  { id: 4, songName: 'Heat Waves', author: 'Glass Animals', progress: 0.38 },
  { id: 5, songName: 'Unholy', author: 'Sam Smith ft. Kim Petras', progress: 0.03 },
  { id: 6, songName: 'Calm Down', author: 'Rema & Selena Gomez', progress: 0.1 },
  { id: 7, songName: 'Bad Habit', author: 'Steve Lacy', progress: 0.35 },
  { id: 8, songName: "I'm Good (Blue)", author: 'David Guetta & Bebe Rexha', progress: 0.58 },
  { id: 9, songName: 'Lavender Haze', author: 'Taylor Swift', progress: 0.41 },
  { id: 10, songName: "Creepin'", author: 'Metro Boomin, The Weeknd, 21 Savage', progress: 0.32 },
];

export function SongsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Song Name</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Author</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Progress</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {MOCK_SONGS.map((song) => (
            <tr key={song.id} className="border-b border-gray-800 hover:bg-gray-300">
              <td className="px-4 py-3 text-sm">{song.id}</td>
              <td className="px-4 py-3 text-sm">{song.songName}</td>
              <td className="px-4 py-3 text-sm">{song.author}</td>
              <td className="px-4 py-3 text-sm">{(song.progress * 100).toFixed(0)}%</td>
              <td className="px-4 py-3 text-sm">
                <button className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700">
                  Issue Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
