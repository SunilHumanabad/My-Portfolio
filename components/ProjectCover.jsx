import Image from 'next/image';

/**
 * A project's cover image — or, when a project has no image, a designed
 * typographic cover so the card never looks empty or broken.
 */
export default function ProjectCover({ project, sizes = '(max-width: 900px) 100vw, 60vw', preload = false }) {
  if (project.cover?.src) {
    return (
      <Image
        className="cover__img"
        src={project.cover.src}
        width={project.cover.width}
        height={project.cover.height}
        alt={project.cover.alt || ''}
        sizes={sizes}
        preload={preload}
      />
    );
  }
  const words = project.title.split(' ');
  return (
    <div className="cover-type" role="img" aria-label={`${project.title} — ${project.category}`}>
      <span className="cover-type__mark" aria-hidden="true">
        {project.title.charAt(0)}
      </span>
      <span className="cover-type__cat" aria-hidden="true">
        {project.category}
        {project.year ? ` · ${project.year}` : ''}
      </span>
      <span className="cover-type__title" aria-hidden="true">
        {words.map((w, i) => (
          <span key={`${w}-${i}`}>{w} </span>
        ))}
      </span>
      {project.liveUrl ? (
        <span className="cover-type__url" aria-hidden="true">
          {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </span>
      ) : null}
    </div>
  );
}
