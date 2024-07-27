import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './views/login/Login.tsx';
import './styles/index.css';
import App from './App.tsx';
import ErrorPage from './views/error-page/ErrorPage.tsx';
import Register from './views/register-page/Register.tsx';
import Dashboard from './views/dashboard/Dashboard.tsx';
import { Provider } from 'react-redux';
import store from './store/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes.tsx';
import { AuthProvider } from './hooks/useAuth';
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
      <PrivateRoutes>
        <App />
      </PrivateRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);
console.log('hit');
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </AuthProvider>
  </Provider>,
);
