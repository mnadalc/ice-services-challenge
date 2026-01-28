import { SongsTableHead } from './table/SongsTableHead';

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div role="status" aria-busy="true" aria-label="Loading songs table">
      <span className="sr-only">Loading songs...</span>

      <div>
        <h1 id="songs-table-heading-skeleton" className="mb-4 text-2xl font-bold">
          Songs
        </h1>

        <div className="overflow-x-auto">
          <table
            className="min-w-full border-collapse"
            aria-labelledby="songs-table-heading-skeleton"
            aria-describedby="songs-table-description-skeleton">
            <caption id="songs-table-description-skeleton" className="sr-only">
              List of songs with royalty calculation progress and invoice actions
            </caption>

            <SongsTableHead />

            <tbody>
              {Array.from({ length: rows }).map((_, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="px-4 py-3">
                    <div className="h-4 w-8 animate-pulse rounded bg-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-4 w-12 animate-pulse rounded bg-gray-300" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="h-8 w-28 animate-pulse rounded bg-gray-300" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
