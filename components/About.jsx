import { site, locationLabel } from '@/config/site';
import { experience } from '@/data/experience';
import { publication } from '@/data/projects';
import { capabilities } from '@/data/skills';
import { external } from '@/lib/utils';
import Reveal from './Reveal';
import SectionHead from './SectionHead';

const { identity, contact, labels: L } = site;

/** Wraps the specialties named in the statement in <em> for the accent treatment. */
function Statement({ text }) {
  const names = identity.specialties.filter((s) => text.includes(s));
  if (!names.length) return text;
  const pattern = new RegExp(`(${names.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return text.split(pattern).map((part, i) => (names.includes(part) ? <em key={i}>{part}</em> : part));
}

export default function About() {
  const current = experience.find((e) => !e.end);
  const facts = [
    locationLabel && { label: 'Based in', value: locationLabel },
    current && { label: 'Currently', value: `${current.role} at ${current.organization}` },
    identity.roleLine2 && { label: 'Focus', value: identity.roleLine2 },
    publication && { label: 'Published', value: publication.shortVenue, href: publication.url, external: true },
    contact.email && { label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
  ].filter(Boolean);

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container">
        <SectionHead id="about" title={L.aboutTitle} note={L.aboutNote} />

        <div className="about__grid">
          <div className="about__lead">
            {identity.statement ? (
              <Reveal as="p" className="about__statement">
                <Statement text={identity.statement} />
              </Reveal>
            ) : null}
            <Reveal className="about__body" delay={0.05}>
              {identity.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>
          </div>

          {facts.length ? (
            <Reveal className="about__facts" delay={0.1}>
              <dl className="facts">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>
                      {f.href ? (
                        <a href={f.href} {...(f.external ? external : {})}>
                          {f.value}
                          {f.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                        </a>
                      ) : (
                        f.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>

        {capabilities.length ? (
          <div className="capabilities">
            <Reveal as="header" className="capabilities__head">
              <h3 className="capabilities__title">{L.capabilities}</h3>
            </Reveal>
            <ul className="cap-list">
              {capabilities.map((c) => (
                <Reveal as="li" key={c.id} className="capability">
                  <h4 className="capability__title">{c.title}</h4>
                  <p className="capability__summary">{c.summary}</p>
                  <ul className="capability__skills">
                    {c.skills.map((s) => (
                      <li key={s.name}>
                        {s.name}
                        {s.detail ? <span className="capability__detail"> ({s.detail})</span> : null}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
