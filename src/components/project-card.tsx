import { ArrowUpRight, GitFork, Globe, Star } from 'lucide-react';
import { GithubRepo } from '@/lib/github';
import { formatProjectName, inferProjectCategory } from '@/lib/projects';
import { formatGithubDate } from '@/lib/utils';

export function ProjectCard({
  repo,
  variant = 'secondary',
  label,
  hoverPreview = false,
  previewNote
}: {
  repo: GithubRepo;
  variant?: 'lead' | 'secondary' | 'recent';
  label?: string;
  hoverPreview?: boolean;
  previewNote?: string;
}) {
  const topics = (repo.topics || []).slice(0, variant === 'recent' ? 2 : 4);
  const displayName = formatProjectName(repo.name);
  const category = inferProjectCategory(repo);
  const previewSrc = `https://opengraph.githubassets.com/1/${repo.html_url.replace(/^https?:\/\/github\.com\//, '')}`;
  const previewBadge = repo.homepage ? 'Live demo + GitHub preview' : 'GitHub preview';

  return (
    <article className={`card project-card project-card-${variant}${hoverPreview ? ' project-card-hover-preview' : ''}`}>
      <div className="project-top">
        <div className="project-copy">
          <div className="project-kicker-row">
            <div className="project-label">{label || (variant === 'recent' ? 'Repository' : 'Featured project')}</div>
            <span className="project-category-pill">{category}</span>
          </div>
          <h3>{displayName}</h3>
          <p className="muted project-description">
            {repo.description || 'GitHub-synced project details and current activity.'}
          </p>
          {previewNote ? <p className="project-note">{previewNote}</p> : null}
        </div>
        <div className="project-actions">
          {repo.homepage ? (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noreferrer"
              className="icon-button"
              aria-label={`Open live site for ${repo.name}`}
            >
              <Globe size={16} />
            </a>
          ) : null}
          <a href={repo.html_url} target="_blank" rel="noreferrer" className="icon-button" aria-label={`Open ${repo.name}`}>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <div className="chips">
        {repo.language ? <span className="chip">{repo.language}</span> : null}
        {topics.map((topic) => (
          <span className="chip" key={topic}>{topic}</span>
        ))}
      </div>

      <div className="project-footer muted">
        <span><Star size={16} /> {repo.stargazers_count}</span>
        <span><GitFork size={16} /> {repo.forks_count}</span>
        <span>Updated {formatGithubDate(repo.updated_at)}</span>
      </div>

      {hoverPreview ? (
        <div className="project-hover-preview" aria-hidden="true">
          <img src={previewSrc} alt="" loading="lazy" />
          <div className="project-hover-preview-overlay">
            <span className="project-badge">{previewBadge}</span>
            {previewNote ? <span className="project-badge project-badge-muted">{previewNote}</span> : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}
