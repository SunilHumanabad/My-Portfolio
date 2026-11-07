# Laravel (+ Inertia/React) production checks

How to verify each item is stated with the check itself. `artisan` commands are only for when a PHP runtime is available; otherwise verify by reading files.

## Blockers — site 500s or ships broken if skipped

- **Frontend assets**: is `/public/build` in `.gitignore`? If yes and deploys are git-based, the site has no CSS/JS. Resolve: upload `public/build/` manually, build in CI, or un-ignore. Shared hosts rarely have Node.
- **Database & drivers**: read `.env` for `SESSION_DRIVER`, `CACHE_STORE`, `QUEUE_CONNECTION`. If any are `database`, an unmigrated DB takes down *every page*, not just data features. Deploy must run `php artisan migrate --force`. SQLite: the file **and its parent directory** must be writable.
- **Writable paths**: `storage/` and `bootstrap/cache/` writable by the web user.
- **`route:cache` with closure routes fails.** Grep `routes/*.php` for `fn ()` / `function ()` route actions. If present, either convert to controllers or explicitly warn: run `config:cache` and `view:cache` but NOT `route:cache`. Generic deploy guides get this wrong.
- **PHP version**: host PHP ≥ the `require.php` constraint in `composer.json`.
- **Captcha/OAuth domain allowlists**: if reCAPTCHA or social login exists, the production domain must be registered in the vendor console. Works locally, fails live — flag as `[~]` user-verify.

## .env production values

Verify in the local `.env`, then flag that the *server's* `.env` is what actually counts:

- `APP_ENV=production`, `APP_DEBUG=false` (debug pages leak code + credentials and get indexed), `APP_KEY` set, `APP_URL=https://<real domain>` (drives absolute URL generation).
- `LOG_LEVEL` — `debug` in production floods disk; use `error` or `warning`. `LOG_CHANNEL=stack` → prefer `daily` (single unbounded `laravel.log` otherwise).
- `SESSION_SECURE_COOKIE=true` when HTTPS-only.
- Mail: `MAIL_MAILER`, `MAIL_HOST`, From address. Apply the deliverability check from SKILL.md item 5.
- Never echo secret values into the report — verify keys are *set*, print `<set>`/`<missing>` only.

## Behind a proxy/CDN (Cloudflare etc.)

- `bootstrap/app.php` needs `$middleware->trustProxies(at: '*')` (Laravel 11+ style) or Laravel sees HTTP → mixed content, wrong signed URLs, redirect loops.
- Any `.htaccess` HTTPS redirect must check `X-Forwarded-Proto`, not just `%{HTTPS}`.

## Apache / shared hosting `.htaccess` (when repo root is the docroot)

State up front: pointing the docroot at `public/` is the correct fix and makes most of this unnecessary. If root-serving is unavoidable, verify:

- Rewrite into public uses `RewriteCond %{REQUEST_URI} !^/public/` — the widespread `!^public` variant never matches (REQUEST_URI starts with `/`) and loops.
- No fallback rewrite to a root `index.php` (doesn't exist; `public/.htaccess` handles the front controller).
- Access control uses Apache 2.4 `Require all denied`, not 2.2 `Order allow,deny` (500s without mod_access_compat).
- `<Files>` blocks do **not** protect directories — `.git/`, `storage/`, `vendor/`, `database/` need explicit `RewriteRule ... [F]` or equivalent.
- `Options -Indexes`; dotfiles, `.env*`, `composer.*`, `artisan` blocked.

## Inertia-specific

- **No SSR running?** (no `config/inertia.php` SSR block / no SSR process): crawler-based tools see an empty shell. Sitemap must be generated from the route list, not by crawling. Meta tags via Inertia `<Head>` still reach crawlers only through the server-rendered shell on first load — Google executes JS, LinkedIn/WhatsApp scrapers generally don't, so OG tags in `<Head>` without SSR won't show in share previews reliably. Flag honestly.
- Meta/canonical must NOT live in the Blade shell with `url()->current()` — Inertia only updates head elements it manages, so Blade-rendered canonicals go stale on client navigation. They belong in the shared layout's `<Head>`.
- Blade-era packages (`artesaos/seotools` etc.) render meta via Blade directives — wrong tool for Inertia; per-page props into a shared layout is the native pattern.

## Forms & mail

- Every public form: backend `FormRequest` validation (not just frontend), captcha verified **server-side** (a rule hitting `siteverify`), and the frontend displays server validation errors.
- Synchronous `Mail::send` in a controller = slow submits and lost mail on SMTP failure; acceptable for low traffic, but note it. If anything queues (`ShouldQueue`), a worker + supervisor entry becomes a blocker.
- File-upload forms: confirm max sizes align across `php.ini` (`upload_max_filesize`, `post_max_size`), validation rules, and any web-server limit.

## Deploy command sequence

```bash
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan config:cache
php artisan view:cache
# route:cache ONLY if no closure routes
# queue worker ONLY if jobs/queued mail exist
```

## Pre-ship verification

- `php artisan test --compact` passes; `vendor/bin/pint --dirty` clean; `npm run build` succeeds.
- Any change made during the audit itself needs a test per the project's conventions.
