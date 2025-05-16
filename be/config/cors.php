<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie',],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['http://myapp.test:3000'], // pakai domain FE

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => ['*'],

    'max_age' => 0,

    'supports_credentials' => true, // token mode, no need for credentials, tp kalau fe yes maka be yes

];
