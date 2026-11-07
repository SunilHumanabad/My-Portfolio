import { ArrowUp } from 'lucide-react';
import { site } from '@/config/site';
import { external } from '@/lib/utils';
import { SocialIcon } from './Icons';

const YEAR = new Date().getFullYear();
const { identity, contact, labels: L } = site;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p className="site-footer__mark" aria-hidden="true">
          {identity.nameLines.join(' ')}
        </p>
        <div className="site-footer__row">
          <p className="muted">
            © {YEAR} {identity.fullName}. {identity.profession}.
          </p>
          <ul className="site-footer__links">
            {contact.socials.map((s) => (
              <li key={s.href}>
                <a href={s.href} {...external}>
                  <SocialIcon name={s.icon} size={18} />
                  <span className="sr-only">{s.label} (opens in a new tab)</span>
                </a>
              </li>
            ))}
            <li>
              <a href="#top" className="to-top">
                {L.backToTop} <ArrowUp size={16} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
