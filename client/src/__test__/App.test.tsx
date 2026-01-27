import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Suspense } from 'react';
import { describe, expect, it } from 'vitest';
import { InvoiceContextProvider } from '../contexts/InvoiceContext';
import { InvoiceHistory } from '../components/InvoiceHistory';
import { SongsTable } from '../components/SongsTable';
import { TableSkeleton } from '../components/TableSkeleton';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

function renderComponent() {
  return render(
    <QueryClientProvider client={queryClient}>
      <InvoiceContextProvider>
        <Suspense fallback={<TableSkeleton />}>
          <SongsTable />
        </Suspense>
        <InvoiceHistory />
      </InvoiceContextProvider>
    </QueryClientProvider>,
  );
}

describe('App', () => {
  it('shows loading state', () => {
    renderComponent();

    const status = screen.getByRole('status', { name: /loading songs table/i });

    expect(status).toBeInTheDocument();
  });

  it('renders', async () => {
    renderComponent();

    await waitFor(() => {
      const status = screen.queryByRole('status', { name: /loading songs table/i });
      expect(status).not.toBeInTheDocument();
    });

    const table = screen.getByRole('table', { name: /songs/i });
    const tbody = within(table).getAllByRole('rowgroup')[1];
    const rows = within(tbody).getAllByRole('row');

    expect(rows).toHaveLength(3);
  });

  it('displays song data correctly', async () => {
    renderComponent();

    await waitFor(() => {
      const songName = screen.getByText(/test song 1/i);
      expect(songName).toBeInTheDocument();
    });

    const artist = screen.getByText(/artist a/i);
    const progress = screen.getByText(/75%/i);

    expect(artist).toBeInTheDocument();
    expect(progress).toBeInTheDocument();
  });

  it('issues invoice and updates history', async () => {
    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /issue invoice for test song 1/i });
      expect(button).toBeInTheDocument();
    });

    const issueButton = screen.getByRole('button', { name: /issue invoice for test song 1/i });
    await user.click(issueButton);

    const historyTable = screen.getByRole('table', { name: /invoice history/i });
    const invoiceSongName = within(historyTable).getByText(/test song 1/i);

    expect(invoiceSongName).toBeInTheDocument();
  });

  it('shows last issued info after issuing invoice', async () => {
    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      const button = screen.getByRole('button', { name: /issue invoice for test song 1/i });
      expect(button).toBeInTheDocument();
    });

    const issueButton = screen.getByRole('button', { name: /issue invoice for test song 1/i });
    await user.click(issueButton);

    const lastInfo = await screen.findByText(/last:/i);

    expect(lastInfo).toBeInTheDocument();
  });

  it('sorts multiple invoices by date descending', async () => {
    const user = userEvent.setup();
    renderComponent();

    await waitFor(() => {
      const buttons = screen.getAllByRole('button', { name: /issue invoice/i });
      expect(buttons.length).toBeGreaterThan(1);
    });

    const button1 = screen.getByRole('button', { name: /issue invoice for test song 1/i });
    const button2 = screen.getByRole('button', { name: /issue invoice for test song 2/i });

    await user.click(button1);
    await user.click(button2);

    const historyTable = screen.getByRole('table', { name: /invoice history/i });
    const rows = within(historyTable).getAllByRole('row');
    const firstDataRow = rows[1];
    const secondDataRow = rows[2];

    const firstSong = within(firstDataRow).getByText(/test song 2/i);
    const secondSong = within(secondDataRow).getByText(/test song 1/i);

    expect(firstSong).toBeInTheDocument();
    expect(secondSong).toBeInTheDocument();
  });
});
