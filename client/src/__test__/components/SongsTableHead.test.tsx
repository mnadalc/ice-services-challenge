import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SongsTableHead } from '../../components/table/SongsTableHead';

describe('<SongsTableHead />', () => {
  it('renders all column headers', () => {
    render(
      <table>
        <SongsTableHead />
      </table>,
    );

    const idHeader = screen.getByRole('columnheader', { name: /id/i });
    const songNameHeader = screen.getByRole('columnheader', { name: /song name/i });
    const authorHeader = screen.getByRole('columnheader', { name: /author/i });
    const progressHeader = screen.getByRole('columnheader', { name: /progress/i });
    const actionsHeader = screen.getByRole('columnheader', { name: /actions/i });

    expect(idHeader).toBeInTheDocument();
    expect(songNameHeader).toBeInTheDocument();
    expect(authorHeader).toBeInTheDocument();
    expect(progressHeader).toBeInTheDocument();
    expect(actionsHeader).toBeInTheDocument();
  });
});
