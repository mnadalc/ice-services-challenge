import { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { SongsTable } from './components/SongsTable';
import { InvoiceHistory } from './components/InvoiceHistory';
import { InvoiceContextProvider } from './contexts/InvoiceContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 2,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <InvoiceContextProvider>
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading</div>}>
          <SongsTable />
        </Suspense>

        <InvoiceHistory />
      </main>
    </InvoiceContextProvider>

    <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
  </QueryClientProvider>
);

export default App;
