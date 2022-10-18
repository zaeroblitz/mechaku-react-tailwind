import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mechakuApi = createApi({
  reducerPath: 'mechakuAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mechaku-server.zaerodev.my.id/api',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/product',
    }),
    getSelectedProduct: builder.query({
      query: (id) => `/product/${id}`,
    }),
    getCouriers: builder.query({
      query: () => '/courier',
    }),
    getPayments: builder.query({
      query: () => '/payment',
    }),
    getUserTransactions: builder.query({
      query: (userId) => `/transaction/user/${userId}`,
    }),
    getTransactionById: builder.query({
      query: (transactionId) => `/transaction/${transactionId}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSelectedProductQuery,
  useGetCouriersQuery,
  useGetPaymentsQuery,
  useGetUserTransactionsQuery,
  useGetTransactionByIdQuery,
} = mechakuApi;
