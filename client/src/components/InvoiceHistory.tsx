import { useInvoiceContext } from '../contexts/useInvoiceContext';
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

export function InvoiceHistory() {
  const { issuedInvoices } = useInvoiceContext();

  const sortedInvoices = [...issuedInvoices].sort(
    (a, b) => b.issuedAt.getTime() - a.issuedAt.getTime(),
  );

  return (
    <div className="mt-8">
      <h2 id="invoice-history-heading" className="mb-4 text-xl font-semibold">
        Invoice History
      </h2>

      {!sortedInvoices || sortedInvoices.length === 0 ? (
        <p className="text-sm text-gray-600">No invoices issued yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table
            className="min-w-full border-collapse"
            aria-labelledby="invoice-history-heading"
            aria-describedby="invoice-history-description">
            <caption id="invoice-history-description" className="sr-only">
              List of all issued invoices with date, song name, author, and progress percentage
            </caption>

            <thead>
              <tr className="border-b border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Song Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Author</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Progress</th>
              </tr>
            </thead>

            <tbody>
              {sortedInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-800 hover:bg-gray-300">
                  <td className="px-4 py-3 text-sm">{formatDate(invoice.issuedAt)}</td>
                  <td className="px-4 py-3 text-sm">{invoice.songName}</td>
                  <td className="px-4 py-3 text-sm">{invoice.author}</td>
                  <td className="px-4 py-3 text-sm">{formatProgress(invoice.progress)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
