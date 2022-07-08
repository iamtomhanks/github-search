import { QueryClient, QueryClientProvider } from 'react-query';
import { Routes, Route } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import './App.css';
import { SearchUsers } from './Pages';
import { UserProfile } from './Pages';
import { persistQueryClient } from 'react-query/persistQueryClient-experimental';
import { createWebStoragePersistor } from 'react-query/createWebStoragePersistor-experimental';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 60 * 24 // 24 hours
    }
  }
});

const localStoragePersistor = createWebStoragePersistor({ storage: window.localStorage });

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor
});

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <Link className="home-link" to="/">
          <h1>GitHub Searcher</h1>
        </Link>
        <Routes>
          <Route path="/" element={<SearchUsers />} />
          <Route path="/user/:username" element={<UserProfile />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
