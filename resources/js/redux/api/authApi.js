import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000',
    credentials: 'include', // cookies পাঠানোর জন্য
});

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: async (args, api, extraOptions) => {
        // CSRF cookie নাও
        await fetch(`${import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000'}/sanctum/csrf-cookie`, {
            credentials: 'include',
        });

        return baseQuery(args, api, extraOptions);
    },
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (body) => ({
                url: '/register',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useRegisterUserMutation } = authApi;
