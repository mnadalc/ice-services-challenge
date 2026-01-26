const MOCK_INVOICES = [
  {
    id: '1',
    date: new Date('2026-01-20T14:30:00'),
    songName: 'Flowers',
    author: 'Miley Cyrus',
    progress: 0.15,
  },
  {
    id: '2',
    date: new Date('2026-01-22T09:15:00'),
    songName: 'Anti-Hero',
    author: 'Taylor Swift',
    progress: 0.27,
  },
  {
    id: '3',
    date: new Date('2026-01-25T16:45:00'),
    songName: 'Heat Waves',
    author: 'Glass Animals',
    progress: 0.38,
  },
];

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

const formatProgress = (progress: number) => {
  return `${(progress * 100).toFixed(0)}%`;
};

export function InvoiceHistory() {
  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">Invoice History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Song Name</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Author</th>
              <th className="px-4 py-3 text-left text-sm font-semibold">Progress</th>
            </tr>
          </thead>

          <tbody>
            {MOCK_INVOICES.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-800 hover:bg-gray-300">
                <td className="px-4 py-3 text-sm">{formatDate(invoice.date)}</td>
                <td className="px-4 py-3 text-sm">{invoice.songName}</td>
                <td className="px-4 py-3 text-sm">{invoice.author}</td>
                <td className="px-4 py-3 text-sm">{formatProgress(invoice.progress)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
