import { useSuspenseQuery } from '@tanstack/react-query';
import { songsQueryOptions } from '../api/songs';
import { useInvoiceContext } from '../contexts/useInvoiceContext';
import { SongsTableHead } from './table/SongsTableHead';

import type { Song } from '../types/types';

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const formatProgress = (progress: Song['progress']) => {
  return `${(progress * 100).toFixed(0)}%`;
};

export function SongsTable() {
  const { data: songs } = useSuspenseQuery(songsQueryOptions);
  const { issueInvoice, lastIssuedPerSong } = useInvoiceContext();

  return (
    <div>
      <h1 id="songs-table-heading" className="mb-4 text-2xl font-bold">
        Songs
      </h1>
      <div className="overflow-x-auto">
        <table
          className="min-w-full border-collapse"
          aria-labelledby="songs-table-heading"
          aria-describedby="songs-table-description">
          <caption id="songs-table-description" className="sr-only">
            List of songs with royalty calculation progress and invoice actions
          </caption>

          <SongsTableHead />

          <tbody>
            {songs.map((song) => {
              const issuedInvoice = lastIssuedPerSong.get(song.id);

              return (
                <tr key={song.id} className="border-b border-gray-800 hover:bg-gray-300">
                  <td className="px-4 py-3 text-sm">{song.id}</td>
                  <td className="px-4 py-3 text-sm">{song.songName}</td>
                  <td className="px-4 py-3 text-sm">{song.author}</td>
                  <td className="px-4 py-3 text-sm">{formatProgress(song.progress)}</td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() =>
                        issueInvoice(song.author, song.progress, song.id, song.songName)
                      }
                      className="rounded bg-blue-600 px-3 py-1 text-sm font-medium text-white hover:bg-blue-700"
                      aria-label={`Issue invoice for ${song.songName} by ${song.author}`}>
                      Issue Invoice
                    </button>

                    {issuedInvoice ? (
                      <span className="ml-3 text-xs text-gray-600">
                        Last: {formatDate(issuedInvoice.issuedAt)} -{' '}
                        {formatProgress(issuedInvoice.progress)}
                      </span>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
