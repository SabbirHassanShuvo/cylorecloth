<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'register', 'login'],
    'allowed_origins' => [env('FRONTEND_URL', 'http://127.0.0.1:5173')],
    'supports_credentials' => true, // '*' 
    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:5173'], // Inertia.js React frontend URL

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
