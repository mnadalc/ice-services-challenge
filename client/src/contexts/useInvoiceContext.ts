import { createContext, use } from 'react';
import type { IssuedInvoice, Song } from '../types/types';

export type InvoiceContextValue = {
  issuedInvoices: IssuedInvoice[];
  issueInvoice: (
    author: Song['author'],
    progress: Song['progress'],
    songId: Song['id'],
    songName: Song['songName'],
  ) => void;
  lastIssuedPerSong: Map<number, IssuedInvoice>;
};

export const InvoiceContext = createContext<InvoiceContextValue | null>(null);

export const useInvoiceContext = () => {
  const context = use(InvoiceContext);

  if (!context) {
    throw new Error('useInvoiceContext must be used within InvoiceContextProvider');
  }

  return context;
};
