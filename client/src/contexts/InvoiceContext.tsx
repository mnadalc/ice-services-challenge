import { useState } from 'react';
import type { IssuedInvoice, Song } from '../types/types';
import { InvoiceContext, type InvoiceContextValue } from './useInvoiceContext';

export const InvoiceContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [issuedInvoices, setIssuedInvoices] = useState<IssuedInvoice[]>([]);

  const lastIssuedPerSong = new Map<Song['id'], IssuedInvoice>();

  issuedInvoices.forEach((invoice) => {
    const existing = lastIssuedPerSong.get(invoice.songId);

    if (!existing || invoice.issuedAt > existing.issuedAt) {
      lastIssuedPerSong.set(invoice.songId, invoice);
    }
  });

  const issueInvoice = (
    author: Song['author'],
    progress: Song['progress'],
    songId: Song['id'],
    songName: Song['songName'],
  ) => {
    const newInvoice: IssuedInvoice = {
      author,
      id: crypto.randomUUID(),
      issuedAt: new Date(),
      progress,
      songId,
      songName,
    };

    setIssuedInvoices((prev) => [...prev, newInvoice]);
  };

  const value: InvoiceContextValue = {
    issuedInvoices,
    issueInvoice,
    lastIssuedPerSong,
  };

  return <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>;
};
