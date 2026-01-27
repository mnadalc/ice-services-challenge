import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { InvoiceContext, type InvoiceContextValue } from '../../contexts/useInvoiceContext';
import { InvoiceHistory } from '../../components/InvoiceHistory';

import type { IssuedInvoice } from '../../types/types';

const MOCK_INVOICE: IssuedInvoice = {
  id: 'test-id-1',
  songId: 1,
  songName: 'Test Song',
  author: 'Test Artist',
  progress: 0.75,
  issuedAt: new Date('2026-01-27T00:00:00'),
};

function renderWithContext(invoices: IssuedInvoice[] = []) {
  const contextValue: InvoiceContextValue = {
    issuedInvoices: invoices,
    issueInvoice: () => {},
    lastIssuedPerSong: new Map(),
  };

  return render(
    <InvoiceContext.Provider value={contextValue}>
      <InvoiceHistory />
    </InvoiceContext.Provider>,
  );
}

describe('InvoiceHistory', () => {
  it('shows empty state when no invoices', () => {
    renderWithContext([]);

    expect(screen.getByText(/no invoices issued yet/i)).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('renders table', () => {
    renderWithContext([MOCK_INVOICE]);

    const table = screen.getByRole('table', { name: /invoice history/i });
    expect(table).toHaveAttribute('aria-labelledby', 'invoice-history-heading');
    expect(table).toHaveAttribute('aria-describedby', 'invoice-history-description');
  });

  it('renders invoice data in table', () => {
    renderWithContext([MOCK_INVOICE]);

    expect(screen.getByRole('columnheader', { name: /date/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /song name/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /author/i })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: /progress/i })).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    const dataRow = rows[1];

    const cells = within(dataRow).getAllByRole('cell');

    expect(cells[1]).toHaveTextContent(/test song/i);
    expect(cells[2]).toHaveTextContent(/test artist/i);
    expect(cells[3]).toHaveTextContent(/75%/i);
  });

  it('sorts invoices by date descending', () => {
    const OLD_INVOICE: IssuedInvoice = {
      ...MOCK_INVOICE,
      id: 'old',
      songName: 'Old Song',
      issuedAt: new Date('2026-01-01T10:00:00'),
    };

    const NEW_INVOICE: IssuedInvoice = {
      ...MOCK_INVOICE,
      id: 'new',
      songName: 'New Song',
      issuedAt: new Date('2026-01-27T10:00:00'),
    };

    renderWithContext([OLD_INVOICE, NEW_INVOICE]);

    const rows = screen.getAllByRole('row');

    expect(within(rows[1]).getByText(/new song/i)).toBeInTheDocument();
    expect(within(rows[2]).getByText(/old song/i)).toBeInTheDocument();
  });
});
