import Link from 'next/link';
import { site } from '@/config/site';

export const metadata = { title: `Page not found — ${site.identity.fullName}` };

export default function NotFound() {
  return (
    <main id="main" className="not-found container">
      <h1 className="not-found__title">Lost the thread.</h1>
      <p className="meta-line">Error 404</p>
      <p className="muted">That page doesn’t exist. Let’s get you back to the work.</p>
      <Link className="btn btn--primary" href="/">
        Back to home
      </Link>
    </main>
  );
}
