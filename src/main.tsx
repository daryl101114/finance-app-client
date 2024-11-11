import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import ErrorPage from './views/error-page/ErrorPage.tsx';
import Dashboard from './views/dashboard/Dashboard.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes.tsx';
import { AuthProvider } from './context/useAuth.tsx';
import { AppContextProvider } from '@/context/AppContextProvider.tsx';
import axios from 'axios';
import { getItem } from '@/lib/utils.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Wallet, loader as walletLoader } from '@/views/wallet/Wallet.tsx';
import {
  Transactions,
  loader as transactLoader,
} from './views/wallet/components/Transactions.tsx';
import Login from './views/login/Login.tsx';
import App from './App.tsx';
import Register from './views/register-page/Register.tsx';
// const App = lazy(() => import('@/App.tsx'));
// const Login = lazy(() => import('@/views/login/Login.tsx'));
// const Register = lazy(() => import('@/views/register-page/Register.tsx'));

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
        path: 'Budgets',
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
        <AppContextProvider>
          <RouterProvider router={router} />
        </AppContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  </AuthProvider>,
);
