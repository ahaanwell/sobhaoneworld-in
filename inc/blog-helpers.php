<?php
// Shared helpers for talking to the M2N Blog CMS from the server side.
// Server-side requests don't send an Origin header, so they aren't
// affected by the CMS API's CORS policy (browser-side requests are).

define('CMS_API_BASE', 'https://m2nblogcmsapi.vercel.app/api/blogs/project/sobha-one-world');
define('CMS_API_KEY', 'sk_sobha_one_world_b9a81483d3babf4688f08163dc9386d4c6d3683a468fcde0');

define('SITE_URL', 'https://www.sobhaoneworlds.in/');
define('SITE_NAME', 'Sobha One World');
define('WHATSAPP_URL', 'https://wa.me/+918317452005?text=Hi!%20I%27m%20Interested%20In%20Sobha%20Liora%20Please%20Share%20Details.');
define('WHATSAPP_NUMBER', '+918317452005');

function cms_fetch($url) {
    $headers = ["x-api-key: " . CMS_API_KEY];

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        $body = curl_exec($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        return ['status' => $status, 'body' => $body];
    }

    // Fallback when the curl extension isn't available.
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => implode("\r\n", $headers),
            'timeout' => 10,
            'ignore_errors' => true,
        ],
    ]);
    $body = @file_get_contents($url, false, $context);
    $status = 0;
    if (isset($http_response_header)) {
        foreach ($http_response_header as $h) {
            if (preg_match('#HTTP/\S+\s+(\d+)#', $h, $m)) {
                $status = (int) $m[1];
            }
        }
    }
    return ['status' => $status, 'body' => $body];
}

function cms_fetch_all_blogs() {
    $res = cms_fetch(CMS_API_BASE . '?limit=100');
    if ($res['status'] !== 200 || !$res['body']) return [];
    $data = json_decode($res['body'], true);
    return $data['blogs'] ?? [];
}

function cms_fetch_blog_by_slug($slug) {
    $res = cms_fetch(CMS_API_BASE . '/slug/' . rawurlencode($slug));
    if ($res['status'] !== 200 || !$res['body']) return null;
    $data = json_decode($res['body'], true);
    if (!isset($data['slug'])) return null;
    return $data;
}

function format_blog_date($iso) {
    $ts = strtotime((string) $iso);
    return $ts ? date('j F Y', $ts) : '';
}
