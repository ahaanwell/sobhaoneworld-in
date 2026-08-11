<?php

require_once __DIR__ . '/inc/blog-helpers.php';

header('Content-Type: application/xml; charset=utf-8');

$baseUrl = 'https://www.sobhaoneworlds.in';

$staticPages = [
    ['url' => '/', 'priority' => '1.00'],
    ['url' => '/price', 'priority' => '0.80'],
    ['url' => '/floor-plans', 'priority' => '0.80'],
    ['url' => '/master-plan', 'priority' => '0.80'],
    ['url' => '/location', 'priority' => '0.80'],
    ['url' => '/amenities', 'priority' => '0.80'],
    ['url' => '/bangalore', 'priority' => '0.60'],
    ['url' => '/bangalore/sobha-crystal-meadows', 'priority' => '0.50'],
    ['url' => '/bangalore/sobha-liora', 'priority' => '0.50'],
    ['url' => '/bangalore/sobha-neopolis', 'priority' => '0.50'],
    ['url' => '/bangalore/sobha-victoria-park', 'priority' => '0.50'],
    ['url' => '/bangalore/sobha-madison-heights', 'priority' => '0.50'],
    ['url' => '/about', 'priority' => '0.60'],
    ['url' => '/contact', 'priority' => '0.60'],
    ['url' => '/privacy-policy', 'priority' => '0.40'],
    ['url' => '/disclaimer', 'priority' => '0.40'],
];

function xmlEscape($value)
{
    return htmlspecialchars(
        (string) $value,
        ENT_XML1 | ENT_QUOTES,
        'UTF-8'
    );
}

function formatLastModified($date)
{
    if (!$date) {
        return date('Y-m-d');
    }

    $timestamp = strtotime($date);

    if (!$timestamp) {
        return date('Y-m-d');
    }

    return date('c', $timestamp);
}

echo '<?xml version="1.0" encoding="UTF-8"?>';
echo "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
echo "\n";

foreach ($staticPages as $page) {
    echo "    <url>\n";
    echo "        <loc>" . xmlEscape($baseUrl . $page['url']) . "</loc>\n";
    echo "        <lastmod>" . date('Y-m-d') . "</lastmod>\n";
    echo "        <priority>" . $page['priority'] . "</priority>\n";
    echo "    </url>\n";
}

try {

    $blogs = cms_fetch_all_blogs();

    if (is_array($blogs)) {

        foreach ($blogs as $blog) {

            if (empty($blog['slug'])) {
                continue;
            }

            $slug = trim($blog['slug']);

            $lastModified =
                $blog['updatedAt']
                ?? $blog['publishedAt']
                ?? $blog['createdAt']
                ?? null;

            echo "    <url>\n";

            echo "        <loc>"
                . xmlEscape($baseUrl . '/' . $slug)
                . "</loc>\n";

            echo "        <lastmod>"
                . xmlEscape(formatLastModified($lastModified))
                . "</lastmod>\n";

            echo "        <priority>0.70</priority>\n";

            echo "    </url>\n";
        }
    }

} catch (Throwable $e) {
    // Keep the sitemap valid even if the CMS is temporarily unavailable.
}

echo "</urlset>\n";