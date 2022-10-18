import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import store from './redux/app/store';
import {
  Page404,
  CartPage,
  Homepage,
  ShopPage,
  LoginPage,
  DetailPage,
  CheckoutPage,
  RegisterPage,
  MemberPage,
  MemberOverviewPage,
  MemberTransactionPage,
  MemberTransactionDetailsPage,
  MemberSettingsPage,
} from './pages';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: '/shop',
        element: <ShopPage />,
      },
      {
        path: '/detail/:id',
        element: <DetailPage />,
      },
      {
        path: '/carts',
        element: <CartPage />,
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
      },
    ],
  },
  {
    path: '/member',
    element: <MemberPage />,
    children: [
      {
        index: true,
        element: <MemberOverviewPage />,
      },
      {
        path: '/member/transactions',
        element: <MemberTransactionPage />,
      },
      {
        path: '/member/transaction/details/:id',
        element: <MemberTransactionDetailsPage />,
      },
      {
        path: '/member/settings',
        element: <MemberSettingsPage />,
      },
    ],
  },
  {
    path: '/sign-in',
    element: <LoginPage />,
  },
  {
    path: '/sign-up',
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
