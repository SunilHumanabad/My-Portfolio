import Image from 'next/image';
import ProjectCover from './ProjectCover';

const VIEW_RATIO = 10 / 16; // frame viewport, height ÷ width

export const hostOf = (url) => {
  try {
    return new URL(url).host.replace(/^www\./, '');
  } catch {
    return '';
  }
};

/**
 * A quiet browser frame around a project. With a full-page `screenshot`, hovering
 * the frame scrolls through the whole page (fine pointers, animations on — CSS only).
 * `full` renders the entire screenshot at natural height instead (used in the dialog).
 */
export default function SiteFrame({ project, sizes = '(max-width: 900px) 100vw, 62vw', full = false }) {
  const shot = project.screenshot;
  const host = hostOf(project.liveUrl);
  const ratio = shot ? shot.height / shot.width : 0;
  const style = shot
    ? {
        '--shift': `${(-(1 - VIEW_RATIO / ratio) * 100).toFixed(2)}%`,
        '--dur': `${Math.min(9, Math.max(3, ratio * 1.7)).toFixed(1)}s`,
      }
    : undefined;

  return (
    <div className={`frame${full ? ' frame--full' : ''}`}>
      <div className="frame__bar" aria-hidden="true">
        <span className="frame__dots">
          <i />
          <i />
          <i />
        </span>
        {host ? <span className="frame__url">{host}</span> : null}
      </div>
      <div className={`frame__view${shot ? ' frame__view--scroll' : ''}`} style={style}>
        {shot ? (
          <Image
            className="frame__shot"
            src={shot.src}
            width={shot.width}
            height={shot.height}
            alt={full ? shot.alt : project.cover?.alt || shot.alt}
            sizes={sizes}
          />
        ) : (
          <ProjectCover project={project} sizes={sizes} />
        )}
      </div>
    </div>
  );
}
