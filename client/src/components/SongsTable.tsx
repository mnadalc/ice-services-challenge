import { useSuspenseQuery } from '@tanstack/react-query';
import { songsQueryOptions } from '../api/songs';

export function SongsTable() {
  const { data: songs } = useSuspenseQuery(songsQueryOptions);

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
          {songs.map((song) => (
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
