import { site } from '@/config/site';
import { sortedProjects } from '@/data/projects';
import { experience } from '@/data/experience';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Experience from '@/components/Experience';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WorkSection from '@/components/WorkSection';

const { sections: S, labels: L } = site;

// Sections only render when they're switched on AND have real content.
const order = [
  S.work && { id: 'work', label: L.nav.work },
  S.about && { id: 'about', label: L.nav.about },
  S.experience && experience.length > 0 && { id: 'experience', label: L.nav.experience },
  S.contact && { id: 'contact', label: L.nav.contact },
].filter(Boolean);

const has = (id) => order.some((s) => s.id === id);

// Hero stats, derived from the data files (never typed in by hand).
const firstYear = [
  ...experience.map((e) => Number(e.start?.slice(0, 4))),
  ...sortedProjects.map((p) => Number(p.year)),
]
  .filter(Boolean)
  .sort()[0];
const metrics = [
  sortedProjects.length > 0 && { value: sortedProjects.length, label: 'Projects' },
  experience.length > 0 && { value: experience.length, label: experience.length === 1 ? 'Role' : 'Roles' },
  firstYear && { value: String(firstYear), label: 'Building since' },
].filter(Boolean);

export default function Home() {
  return (
    <>
      <Header nav={order} />
      <main id="main" tabIndex={-1}>
        <Hero metrics={metrics} />
        {has('work') ? <WorkSection showArchive={S.archive} /> : null}
        {has('about') ? <About /> : null}
        {has('experience') ? <Experience /> : null}
        {has('contact') ? <Contact /> : null}
      </main>
      <Footer />
    </>
  );
}
