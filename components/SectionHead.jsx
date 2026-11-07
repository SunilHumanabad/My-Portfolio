import Reveal from './Reveal';

/** Editorial section heading: "ABOUT (09)  a little about me". */
export default function SectionHead({ id, title, note, count }) {
  return (
    <Reveal as="header" className="section-head">
      <h2 className="section-head__title" id={`${id}-title`}>
        {title}
        {count ? <sup className="section-head__count">({count})</sup> : null}
      </h2>
      {note ? (
        <span className="section-head__note" aria-hidden="true">
          {note}
        </span>
      ) : null}
    </Reveal>
  );
}
