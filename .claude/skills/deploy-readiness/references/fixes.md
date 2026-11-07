# Fix recipes

Concrete fixes for the most common audit findings. Adapt names/domains to the project; never invent values you can't derive from the repo (ask instead).

## robots.txt (replace framework stub)

```
User-agent: *
Allow: /

Disallow: /dashboard
Disallow: /settings
Disallow: /login
Disallow: /register
# add any other auth/admin prefixes found in the route table

Sitemap: https://<domain>/sitemap.xml
```

The `Sitemap:` line must point at the sitemap FILE, absolute URL. Derive the disallow list from the actual routes, don't copy this blindly.

## Sitemap (Laravel, route-based — no package needed)

Define next to the routes so it shares their source of truth. If pages live in an array (common for marketing sites), reuse it:

```php
Route::get('sitemap.xml', function () use ($marketingPages) {
    $uris = ['/', ...array_keys($marketingPages)]; // + other public GET routes
    $urls = collect($uris)
        ->map(fn (string $uri): string => '  <url><loc>'.e(url($uri)).'</loc></url>')
        ->implode("\n");
    $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n"
        .'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n".$urls."\n".'</urlset>';
    return response($xml, 200, ['Content-Type' => 'application/xml']);
})->name('sitemap');
```

Only public pages — never auth/admin. Add a feature test: 200 + `application/xml` + contains every public route + contains no auth route. Don't use crawler-based generators on SPAs without SSR (they see no links).

## Meta tags (Inertia + React shared layout)

Add to the shared layout's `<Head>`, driven by props — NOT the Blade shell (Blade head elements go stale on client-side navigation):

```tsx
const SITE_URL = 'https://<domain>';
// canonical: usePage().url, strip query/hash, prefix SITE_URL
<link rel="canonical" href={canonicalUrl} head-key="canonical" />
<meta property="og:type" content="website" head-key="og:type" />
<meta property="og:title" content={metaTitle} head-key="og:title" />
<meta property="og:description" content={metaDescription} head-key="og:description" />
<meta property="og:url" content={canonicalUrl} head-key="og:url" />
<meta property="og:image" content={absoluteImage} head-key="og:image" />
<meta name="twitter:card" content="summary_large_image" head-key="twitter:card" />
<meta name="twitter:title" content={metaTitle} head-key="twitter:title" />
<meta name="twitter:description" content={metaDescription} head-key="twitter:description" />
<meta name="twitter:image" content={absoluteImage} head-key="twitter:image" />
<script type="application/ld+json" head-key="org-json-ld">{ORGANIZATION_JSON_LD}</script>
```

`head-key` prevents duplicate accumulation across navigations. og:image must be an absolute URL, ideally 1200×630; a wide existing brand image is an acceptable stopgap — note a dedicated card as backlog. For other stacks: same tags via the framework's head manager (next/head, react-helmet, Django template block).

## .htaccess (Apache shared hosting, repo root as docroot)

First choice: point the docroot at `public/` and delete most of this. If stuck with root-serving:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine on

    # www → non-www + HTTPS, proxy-aware, single hop
    RewriteCond %{HTTP_HOST} ^www\. [NC,OR]
    RewriteCond %{HTTPS} off
    RewriteCond %{HTTP:X-Forwarded-Proto} !https
    RewriteRule ^ https://<domain>%{REQUEST_URI} [L,R=301,NE]

    # block sensitive directories BEFORE rewriting into public/
    RewriteRule ^(\.git|storage|vendor|bootstrap/cache|database|config|app|routes|tests)(/|$) - [F,L]

    # route everything into public/ — the leading slash matters (!^public loops)
    RewriteCond %{REQUEST_URI} !^/public/
    RewriteRule ^(.*)$ public/$1 [L]
</IfModule>

Options -Indexes

<FilesMatch "^\.|\.(env|json|lock|md|example|yml|yaml)$|^(artisan|composer\.(json|lock)|package\.json)$">
    Require all denied
</FilesMatch>
```

Known bugs this replaces: `!^public` (never matches — REQUEST_URI starts with `/`, causes a rewrite loop), root `index.php` fallback (front controller is `public/index.php`), Apache 2.2 `Order allow,deny` (500s on 2.4 without mod_access_compat), `%{HTTPS} off` alone (infinite loop behind Cloudflare/proxies). `*.json` blocking also blocks legit public JSON (PWA manifest) — whitelist if needed.

## .env production values (edit keys, never invent secrets)

```
APP_ENV=production
APP_DEBUG=false
APP_URL=https://<domain>
LOG_CHANNEL=daily
LOG_LEVEL=error
SESSION_SECURE_COOKIE=true
```

If `MAIL_HOST` is a personal relay (smtp.gmail.com etc.) with a custom-domain From: don't silently change it — flag SPF/DKIM misalignment and recommend host SMTP or a transactional provider. That's a user decision.

## Trusted proxies (Laravel behind CDN/load balancer)

`bootstrap/app.php`:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->trustProxies(at: '*');
})
```

## Custom error pages (Laravel 11+/12 + Inertia)

`bootstrap/app.php`:

```php
->withExceptions(function (Exceptions $exceptions) {
    $exceptions->respond(function (Response $response, Throwable $e, Request $request) {
        $status = $response->getStatusCode();
        if (in_array($status, [403, 404, 419, 429, 500, 503], true)
            && ! (app()->environment('local') && in_array($status, [500, 503], true))) {
            return Inertia::render('errors/error', ['status' => $status])
                ->toResponse($request)->setStatusCode($status);
        }
        return $response;
    });
})
```

## Form hardening

- Backend: FormRequest (Laravel) / schema validation with explicit rules incl. max lengths; whitelist enum-ish fields with `Rule::in` (keep the list in one shared place if the frontend duplicates it).
- Captcha: server-side verification is the part that counts — a validation rule that POSTs to the vendor's verify endpoint; strip the token from any forwarded payload.
- Frontend: display server errors per field with `aria-invalid`.
- Rate-limit public POST routes (`throttle:` middleware or equivalent).

## llms.txt / llms-full.txt (optional, on request)

`public/llms.txt`: site name, one-paragraph summary, then a markdown link list of key pages with one-line descriptions. `llms-full.txt`: concatenated core page copy in markdown. Generate from the real page content, keep in sync manually or via a build script — stale AI-crawler files are worse than none.
