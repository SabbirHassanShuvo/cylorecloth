import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_APP_URL || 'http://127.0.0.1:8000';

// Helper to read a cookie by name in the browser
function getCookie(name) {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^|;)\\s*' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
}

const baseQuery = fetchBaseQuery({
    baseUrl: API_URL,
    credentials: 'include', // ensure cookies are sent
    prepareHeaders: (headers) => {
        headers.set('X-Requested-With', 'XMLHttpRequest');
        headers.set('Accept', 'application/json');

        const xsrf = getCookie('XSRF-TOKEN');
        if (xsrf) {
            // Laravel expects the CSRF token in this header when using cookie-based CSRF
            headers.set('X-XSRF-TOKEN', xsrf);
        }
        return headers;
    },
});

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: async (args, api, extraOptions) => {
        // Ensure we obtain CSRF cookie first (sets XSRF-TOKEN and session cookie)
        await fetch(`${API_URL}/sanctum/csrf-cookie`, {
            credentials: 'include',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
            },
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
