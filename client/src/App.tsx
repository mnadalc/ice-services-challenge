import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense } from 'react';
import { SongsTable } from './components/SongsTable';

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

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading</div>}>
          <SongsTable />
        </Suspense>
      </main>
    </QueryClientProvider>
  );
};

export default App;
