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
// import {
//   ThemeProvider,
//   StyledEngineProvider,
//   createTheme,
// } from '@mui/material/styles';
import axios from 'axios';
import { getItem } from './lib/utils.ts';
const rootElement = document.getElementById('root');

// const theme = createTheme({
//   components: {
//     MuiPopover: {
//       defaultProps: {
//         container: rootElement,
//       },
//     },
//     MuiPopper: {
//       defaultProps: {
//         container: rootElement,
//       },
//     },
//     MuiDialog: {
//       defaultProps: {
//         container: rootElement,
//       },
//     },
//   },
// });

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
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

//Attaches the bearer token to the Authoriation header
axios.interceptors.request.use(function (config) {
  const token: string = getItem('token') || '';
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AuthProvider>
      <React.StrictMode>
        {/* <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}> */}
        <RouterProvider router={router} />
        {/* </ThemeProvider>
        </StyledEngineProvider> */}
      </React.StrictMode>
    </AuthProvider>
  </Provider>,
);
