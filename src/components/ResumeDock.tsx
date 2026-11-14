import { content } from "../config/content.ts";
import { DownloadIcon } from "../utils/icons.tsx";

export function ResumeDock() {
  const { href, label, location, workAuthorization } = content.resume;

  return (
    <aside className="resume-dock" aria-label="Résumé and work authorization">
      <span className="resume-dock__signal" aria-hidden="true" />
      <span className="resume-dock__meta">
        <strong>{location}</strong>
        <span>{workAuthorization}</span>
      </span>
      <a className="resume-dock__link" href={href} target="_blank" rel="noopener">
        {label}
        <DownloadIcon size={15} aria-hidden="true" />
      </a>
    </aside>
  );
}
