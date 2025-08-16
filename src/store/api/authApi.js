import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3001/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Endpoint pour la connexion (utilise username et password)
    login: builder.mutation({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials, // { email: username, password }
      }),
    }),
    // Endpoint pour récupérer le profil utilisateur
    getProfile: builder.query({
      query: () => ({
        url: 'user/profile',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    // Endpoint pour mettre à jour le profil
    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: 'user/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
