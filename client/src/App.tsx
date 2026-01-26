import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { SongsTable } from './components/SongsTable';
import { InvoiceHistory } from './components/InvoiceHistory';
import { InvoiceContextProvider } from './contexts/InvoiceContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TableSkeleton } from './components/TableSkeleton';

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <InvoiceContextProvider>
        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<TableSkeleton />}>
            <SongsTable />
          </Suspense>

          <InvoiceHistory />
        </main>
      </InvoiceContextProvider>

      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
