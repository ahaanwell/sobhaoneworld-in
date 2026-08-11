<?php
require __DIR__ . '/inc/blog-helpers.php';

$slug = isset($_GET['slug']) ? $_GET['slug'] : '';
$blog = preg_match('/^[a-z0-9-]+$/', $slug) ? cms_fetch_blog_by_slug($slug) : null;

if (!$blog) {
    http_response_code(404);
    ?><!DOCTYPE html>
<html lang="en-IN">
<head>
    <title>Blog Not Found | <?= SITE_NAME ?></title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="noindex,follow">
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body class="min-h-screen flex items-center justify-center text-center p-6">
    <div>
        <h1 class="text-2xl font-bold text-gray-900 mb-3">Blog Not Found</h1>
        <p class="text-gray-600 mb-6">This blog post doesn't exist or may have been removed.</p>
        <a href="/#blogs" class="bg-primary text-white px-6 py-2 rounded-full font-semibold">Back to Blogs</a>
    </div>
</body>
</html><?php
    exit;
}

$title = htmlspecialchars($blog['metaTitle'] ?: $blog['title']);
$heading = htmlspecialchars($blog['title']);
$description = htmlspecialchars($blog['metaDescription'] ?? '');
$url = SITE_URL . '/' . $blog['slug'] . '.html';
$image = htmlspecialchars($blog['featuredImage']['url'] ?? (SITE_URL . '/images/logo.webp'));
$date = format_blog_date($blog['publishedAt'] ?? $blog['createdAt']);
?><!DOCTYPE html>
<html lang="en-IN">

<head>
    <title><?= $title ?> | <?= SITE_NAME ?></title>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta name="description" content="<?= $description ?>">
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">

    <link rel="canonical" href="<?= $url ?>">

    <meta property="og:type" content="article">
    <meta property="og:site_name" content="<?= SITE_NAME ?>">
    <meta property="og:url" content="<?= $url ?>">
    <meta property="og:title" content="<?= $title ?>">
    <meta property="og:description" content="<?= $description ?>">
    <meta property="og:image" content="<?= $image ?>">
    <meta property="og:locale" content="en_IN">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= $title ?>">
    <meta name="twitter:description" content="<?= $description ?>">
    <meta name="twitter:image" content="<?= $image ?>">

    <link rel="icon" type="image/png" href="/images/favicon.ico">
    <link rel="apple-touch-icon" href="/images/favicon.ico">

    <script src="https://cdn.tailwindcss.com?plugins=typography"></script>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>

<body>
    <nav class="sticky top-0 bg-white z-50 shadow-sm" aria-label="Main Navigation">
        <div class="flex justify-between items-center w-[95%] mx-auto py-1">

            <a href="/"><img class="w-[40px]" src="/images/logo.webp" alt="Logo"></a>

            <ul class="hidden lg:flex items-center gap-1 text-[15px] font-medium">
                <li><a class="nav-not-active" href="/">Home</a></li>
                <li><a class="nav-not-active" href="/price.html">Price</a></li>
                <li><a class="nav-not-active" href="/floor-plans.html">Floor Plan</a></li>
                <li><a class="nav-not-active" href="/master-plan.html">Master Plan</a></li>
                <li><a class="nav-not-active" href="/location.html">Location</a></li>
                <li><a class="nav-not-active" href="/amenities.html">Amenities</a></li>
                <li><a class="nav-not-active" href="/bangalore.html">Bangalore</a></li>
                <li><a class="nav-not-active" href="/#gallery">Gallery</a></li>
                <li><a class="nav-not-active cursor-pointer" onclick="openModel()">Brochure</a></li>

                <li class="px-4">
                    <a href="<?= WHATSAPP_URL ?>"
                        class="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-4 py-2 rounded-full flex items-center gap-2">
                        <i class="fa-brands fa-whatsapp"></i> <?= WHATSAPP_NUMBER ?>
                    </a>
                </li>
            </ul>

            <button onclick="toggleMenu()" class="lg:hidden text-2xl">
                <i class="fa fa-bars"></i>
            </button>

        </div>
    </nav>

    <div id="menu" class="fixed top-0 right-[-100%] w-[80%] h-full bg-white z-50 shadow-lg transition-all duration-300">
        <div class="flex justify-between items-center p-4 border-b">
            <span class="font-semibold">Menu</span>
            <button onclick="toggleMenu()"><i class="fa fa-times text-xl"></i></button>
        </div>

        <ul class="flex flex-col p-5 gap-4 text-lg">
            <li><a href="/" onclick="toggleMenu()">Home</a></li>
            <li><a href="/price.html" onclick="toggleMenu()">Price</a></li>
            <li><a href="/floor-plans.html" onclick="toggleMenu()">Floor Plan</a></li>
            <li><a href="/master-plan.html" onclick="toggleMenu()">Master Plan</a></li>
            <li><a href="/location.html" onclick="toggleMenu()">Location</a></li>
            <li><a href="/amenities.html" onclick="toggleMenu()">Amenities</a></li>
            <li><a href="/bangalore.html" onclick="toggleMenu()">Bangalore</a></li>
            <li><a href="/#gallery" onclick="toggleMenu()">Gallery</a></li>
            <li><a class="cursor-pointer" onclick="openModel()">Brochure</a></li>

            <li>
                <a href="<?= WHATSAPP_URL ?>"
                    class="bg-yellow-500 text-white px-4 py-2 rounded-full text-center block">
                    <i class="fa-brands fa-whatsapp"></i> <?= WHATSAPP_NUMBER ?>
                </a>
            </li>
        </ul>
    </div>

    <article class="max-w-3xl mx-auto px-4 py-8">
        <p class="text-sm"><a href="/#blogs" class="text-primary font-semibold">&larr; Back to Blogs</a></p>

        <h1 class="text-2xl md:text-4xl font-bold text-gray-900 mt-4 mb-3"><?= $heading ?></h1>
        <p class="text-sm text-gray-500 mb-6"><?= $date ?></p>

        <img src="<?= $image ?>" alt="<?= $heading ?>"
            class="w-full h-auto rounded-xl shadow-md mb-8 object-cover">

        <div class="prose prose-lg max-w-none prose-a:text-primary">
            <?= $blog['content'] ?? '' ?>
        </div>

        <div class="mt-10 p-6 bg-gray-50 rounded-xl text-center">
            <p class="font-semibold text-gray-800 mb-4">Interested in <?= SITE_NAME ?>? Get in touch with us.</p>
            <button onclick="openModel()"
                class="bg-primary text-white px-8 py-2 rounded-full text-lg font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                <i class="fa fa-phone-alt mr-2"></i>Enquire Now
            </button>
        </div>
    </article>

    <!-- Lead Modal -->
    <div id="modelContainer" class="fixed inset-0 bg-black/60 hidden z-50 flex justify-center items-center">
        <div class="lg:w-[500px] w-[95%] bg-white relative rounded shadow-lg animate-fadeIn">
            <button id="modelRemoveBtn" class="absolute top-2 right-3 text-white bg-black/40 px-2 rounded">
                ✕
            </button>

            <div class="bg-yellow-500 p-3">
                <h4 id="formHeading" class="text-center text-xl lg:text-2xl font-semibold text-white">
                    Enquire Now For More Details
                </h4>
            </div>

            <div class="flex">
                <div class="w-[25%] hidden lg:flex flex-col gap-6 bg-gray-100 p-4">
                    <div class="text-center">
                        <img class="w-[50px] m-auto" src="/images/telephone-call.webp">
                        <span class="text-xs">Instant Call Back</span>
                    </div>
                    <div class="text-center">
                        <img class="w-[50px] m-auto" src="/images/house.webp">
                        <span class="text-xs">Free Visit</span>
                    </div>
                    <div class="text-center">
                        <img class="w-[50px] m-auto" src="/images/rupees.webp">
                        <span class="text-xs">Best Price</span>
                    </div>
                </div>

                <form onsubmit="submitBtn1(event)" class="lg:w-[75%] w-full flex flex-col p-5 gap-4">
                    <input id="name_1" required class="p-2 border-b outline-none" type="text" placeholder="Name">

                    <div class="flex">
                        <select id="country_code_1" class="border-b outline-none">
                            <option value="+91">+91(IND)</option>
                            <option value="+971">+971(UAE)</option>
                            <option value="+44">+44(UK)</option>
                            <option value="+1">+1(USA)</option>
                        </select>
                        <input id="number_1" required class="p-2 border-b outline-none w-full" type="text"
                            placeholder="Mobile No">
                    </div>

                    <input id="email_1" required class="p-2 border-b outline-none" type="email" placeholder="Email">

                    <button id="submitBtn_1" type="submit" class="bg-yellow-500 text-white py-2 rounded shadow">
                        Submit Now
                    </button>

                    <div class="flex gap-3">
                        <a href="<?= WHATSAPP_URL ?>"
                            target="_blank" class="w-full bg-green-500 text-white text-center py-2 rounded">
                            WhatsApp
                        </a>
                        <a href="tel:<?= WHATSAPP_NUMBER ?>" class="w-full bg-yellow-500 text-white text-center py-2 rounded">
                            Call Now
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <footer class="bg-gray-900 text-gray-300 mt-10">
        <div class="max-w-6xl mx-auto px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

            <div>
                <a href="/"><img class="w-[120px] mb-4 bg-white rounded p-1" src="/images/logo.webp" alt="Sobha One World Logo"></a>
                <p class="text-sm text-gray-400 leading-relaxed mb-4">
                    Sobha One World is a premium 300-acre township by Sobha Limited in Hoskote, East Bangalore, offering
                    luxury 1, 2, 3 & 4 BHK apartments.
                </p>
                <div class="flex gap-3">
                    <a href="#" aria-label="Facebook"
                        class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition">
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#" aria-label="Instagram"
                        class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a href="#" aria-label="YouTube"
                        class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                    <a href="#" aria-label="LinkedIn"
                        class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition">
                        <i class="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a href="#" aria-label="Twitter / X"
                        class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary hover:text-white transition">
                        <i class="fa-brands fa-x-twitter"></i>
                    </a>
                </div>
            </div>

            <div>
                <h3 class="text-white font-semibold mb-4">Quick Links</h3>
                <ul class="space-y-2 text-sm">
                    <li><a href="/" class="hover:text-[#facc15] transition">Home</a></li>
                    <li><a href="/price.html" class="hover:text-[#facc15] transition">Price</a></li>
                    <li><a href="/floor-plans.html" class="hover:text-[#facc15] transition">Floor Plan</a></li>
                    <li><a href="/master-plan.html" class="hover:text-[#facc15] transition">Master Plan</a></li>
                    <li><a href="/location.html" class="hover:text-[#facc15] transition">Location</a></li>
                    <li><a href="/amenities.html" class="hover:text-[#facc15] transition">Amenities</a></li>
                </ul>
            </div>

            <div>
                <h3 class="text-white font-semibold mb-4">Company</h3>
                <ul class="space-y-2 text-sm">
                    <li><a href="/about.html" class="hover:text-[#facc15] transition">About Us</a></li>
                    <li><a href="/contact.html" class="hover:text-[#facc15] transition">Contact Us</a></li>
                    <li><a href="/privacy-policy.html" class="hover:text-[#facc15] transition">Privacy Policy</a></li>
                    <li><a href="/disclaimer.html" class="hover:text-[#facc15] transition">Disclaimer</a></li>
                    <li><a href="/sitemap.xml" class="hover:text-[#facc15] transition">Sitemap</a></li>
                </ul>
            </div>

            <div>
                <h3 class="text-white font-semibold mb-4">Get in Touch</h3>
                <ul class="space-y-3 text-sm text-gray-400">
                    <li class="flex items-start gap-2">
                        <i class="fa fa-phone-alt mt-1 text-[#facc15]"></i>
                        <a href="tel:<?= WHATSAPP_NUMBER ?>" class="hover:text-[#facc15] transition"><?= WHATSAPP_NUMBER ?></a>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa-brands fa-whatsapp mt-1 text-[#facc15]"></i>
                        <a href="<?= WHATSAPP_URL ?>" class="hover:text-[#facc15] transition">WhatsApp Us</a>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa fa-map-marker-alt mt-1 text-[#facc15]"></i>
                        <span>Sarakariguttahalli Village, Hoskote, Old Madras Road (NH-75), East Bangalore, Karnataka –
                            562114</span>
                    </li>
                    <li class="flex items-start gap-2">
                        <i class="fa fa-clock mt-1 text-[#facc15]"></i>
                        <span>10:00 AM – 7:00 PM (Open all days)</span>
                    </li>
                </ul>
            </div>

        </div>

        <div class="border-t border-white/10">
            <div class="max-w-6xl mx-auto px-4 py-6">
                <p class="text-xs text-gray-500 leading-relaxed">
                    <span class="font-medium text-gray-400">Disclaimer</span> : Please be advised that this website is not an
                    official site and serves solely as an informational portal managed by a RERA authorized real estate
                    agent. It does not constitute an offer or guarantee of any services. The prices displayed on this
                    website are subject to change without prior notice, and the availability of properties cannot be
                    guaranteed. The images showcased on this website are for representational purposes only and may not
                    accurately reflect the actual properties. We may share your data with Real Estate Regulatory
                    Authority (RERA) registered Developers for further processing as necessary. Additionally, we may
                    send updates and information to the mobile number or email address registered with us.
                    All rights reserved. The content, design, and information on this website are protected by copyright
                    and other intellectual property rights. Any unauthorized use or reproduction of the content may
                    violate applicable laws.
                    For accurate and up-to-date information regarding services, pricing, availability, and any other
                    details, it is recommended to contact us directly through the provided contact information on this
                    website. Thank you for visiting our website.
                </p>
            </div>
            <div class="flex justify-center border-t border-white/10 py-4 text-sm text-gray-400">
                <p>Developed and Marketing by <a href="https://www.mndigitalagency.com"
                        class="text-[#facc15] hover:underline">M2N Digital Agency</a></p>
            </div>
        </div>
    </footer>

    <section class=" sticky bottom-0">
        <div class="lg:hidden md:hidden flex justify-between bg-primary p-1.5">
            <button onclick="openModel()" class="text-white font-semibold w-full py-0.5">
                <i class="fa fa-envelope text-white text-md"></i>
                Enquiry Now
            </button>
            <span class="text-white font-semibold">|</span>
            <a href="<?= WHATSAPP_URL ?>"
                target="_blank" class="text-white font-semibold text-center w-full py-0.5">
                <i class="fa-brands fa-whatsapp text-white  p-0.5 rounded-sm"></i>
                WhatsApp
            </a>
        </div>
    </section>

    <script src="/js/app.js"></script>
</body>

</html>
