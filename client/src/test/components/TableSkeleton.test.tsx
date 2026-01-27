import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TableSkeleton } from '../../components/TableSkeleton';

describe('<TableSkeleton />', () => {
  it('table has correct a11y', () => {
    render(<TableSkeleton />);

    const status = screen.getByRole('status', { name: /loading songs table/i });
    expect(status).toHaveAttribute('aria-busy', 'true');

    const table = within(status).getByRole('table', { name: /songs/i });
    expect(table).toHaveAttribute('aria-labelledby', 'songs-table-heading-skeleton');
    expect(table).toHaveAttribute('aria-describedby', 'songs-table-description-skeleton');
  });

  it.each([undefined, 3, 5, 10])('renders %i rows by default', (rows) => {
    render(<TableSkeleton rows={rows} />);

    const table = screen.getByRole('table', { name: /songs/i });

    const tbody = within(table).getAllByRole('rowgroup')[1];
    const bodyRows = within(tbody).getAllByRole('row');

    const expectedLength = rows ?? 5;
    expect(bodyRows).toHaveLength(expectedLength);
  });
});
