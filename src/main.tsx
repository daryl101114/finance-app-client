import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './views/login/Login.tsx';
import './styles/index.css';
import App from './App.tsx';
import ErrorPage from './views/error-page/ErrorPage.tsx';
import Register from './views/register-page/Register.tsx';
import Dashboard from './views/dashboard/Dashboard.tsx';
import { Wallet, loader as walletLoader } from '@/views/wallet/Wallet.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes.tsx';
import { AuthProvider } from './hooks/useAuth';
import axios from 'axios';
import { getItem } from '@/lib/utils.ts';
import data from '@emoji-mart/data';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  Transactions,
  loader as transactLoader,
} from './views/wallet/components/Transactions.tsx';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'em-emoji': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { id: string; size: string };
    }
  }
}
//Attaches the bearer token to the Authoriation header
axios.interceptors.request.use(function (config) {
  const token: string = getItem('token') || '';
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
// Create a client
// const queryClient = new QueryClient()
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

// Routes
const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
    children: [],
  },
  {
    path: '/register-user',
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: (
      //Add route guards
      <PrivateRoutes>
        <App />
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
      {
        path: 'Wallets',
        element: <Wallet />,
        loader: walletLoader(queryClient),
        children: [
          {
            path: '',
            element: <Transactions />,
            loader: transactLoader(queryClient),
          },
        ],
      },
      {
        path: 'Wallets',
        element: (
          <div className="p-5 text-5xl font-semibold text-primary">Budgets</div>
        ),
      },
      {
        path: 'Expense',
        element: (
          <div className="p-5 text-5xl font-semibold text-primary">Expense</div>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </React.StrictMode>
  </AuthProvider>,
);
