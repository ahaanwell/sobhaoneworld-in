<?php

// Same-origin proxy for the homepage blog grid.
// The browser calls this PHP endpoint, and PHP fetches the CMS API
// server-side so the CMS does not receive a browser Origin header.

header('Content-Type: application/json; charset=utf-8');

// Prevent PHP warnings/notices from being printed into the JSON response.
ini_set('display_errors', '0');
error_reporting(E_ALL);

try {

    // Load CMS helper functions
    require_once __DIR__ . '/inc/blog-helpers.php';

    // Fetch all blogs from the CMS
    $blogs = cms_fetch_all_blogs();

    // Make sure we always have an array
    if (!is_array($blogs)) {
        $blogs = [];
    }

    // Return only the fields required by the blog grid
    $simplified = array_map(function ($blog) {

        return [
            'slug' => $blog['slug'] ?? '',

            'title' => $blog['title'] ?? '',

            'metaDescription' => $blog['metaDescription'] ?? '',

            'featuredImage' => [
                'url' => $blog['featuredImage']['url'] ?? null
            ],

            'publishedAt' => $blog['publishedAt']
                ?? ($blog['createdAt'] ?? null)
        ];

    }, $blogs);

    // Return JSON response
    echo json_encode(
        [
            'blogs' => $simplified
        ],
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    );

} catch (Throwable $e) {

    // Return a valid JSON response if something goes wrong
    http_response_code(500);

    echo json_encode(
        [
            'blogs' => [],
            'error' => 'Unable to load blogs right now.'
        ],
        JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE
    );
}