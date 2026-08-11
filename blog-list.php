<?php
// Same-origin proxy for the homepage blog grid. The CMS API blocks any
// browser request that carries an Origin header, so app.js can't call it
// directly — it calls this endpoint instead, which fetches server-side
// (no Origin header) and hands back just what the grid needs.
require __DIR__ . '/inc/blog-helpers.php';

header('Content-Type: application/json; charset=utf-8');

$blogs = cms_fetch_all_blogs();

$simplified = array_map(function ($b) {
    return [
        'slug' => $b['slug'],
        'title' => $b['title'],
        'metaDescription' => $b['metaDescription'] ?? '',
        'featuredImage' => ['url' => $b['featuredImage']['url'] ?? null],
        'publishedAt' => $b['publishedAt'] ?? ($b['createdAt'] ?? null),
    ];
}, $blogs);

echo json_encode(['blogs' => $simplified]);
