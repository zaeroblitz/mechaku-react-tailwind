import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://mechaku-server.zaerodev.my.id/api/carts',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Carts'],
  endpoints: (builder) => ({
    getCarts: builder.query({
      query: (userId) => `/user/${userId}`,
      providesTags: ['Carts'],
    }),
    addCartItem: builder.mutation({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Carts'],
    }),
    incrementCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/inc/${itemId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Carts'],
    }),
    decrementCartItem: builder.mutation({
      query: (itemId) => ({
        url: `/dec/${itemId}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Carts'],
    }),
    removeCartItem: builder.mutation({
      query: ({ userId, itemId }) => ({
        url: `/${userId}`,
        method: 'PUT',
        body: { item: itemId },
      }),
      invalidatesTags: ['Carts'],
    }),
  }),
});

export const {
  useGetCartsQuery,
  useAddCartItemMutation,
  useIncrementCartItemMutation,
  useDecrementCartItemMutation,
  useRemoveCartItemMutation,
} = cartApi;
