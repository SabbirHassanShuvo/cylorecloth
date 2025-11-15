<?php

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie', '*'], // '*' দিলে সব রুট Allow হবে

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://localhost:5173'], // Inertia.js React frontend URL

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
];
