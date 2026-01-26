import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { SongsTable } from './components/SongsTable.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="container mx-auto px-4 py-8">
      <SongsTable />
    </main>
  </StrictMode>,
);
