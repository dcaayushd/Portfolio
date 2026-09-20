import Link from 'next/link';
import { ArrowRight, ArrowUpRight, GitFork, Globe, Star } from 'lucide-react';
import { getCaseStudyByRepo } from '@/data/case-studies';
import type { GithubRepo } from '@/lib/github-repo';
import { formatProjectName, inferProjectCategory } from '@/lib/projects';
import { formatGithubDate } from '@/lib/utils';

export function ProjectCard({
  repo,
  variant = 'secondary',
  label,
  previewNote
}: {
  repo: GithubRepo;
  variant?: 'lead' | 'secondary' | 'recent';
  label?: string;
  previewNote?: string;
}) {
  const topics = (repo.topics || []).slice(0, variant === 'recent' ? 2 : 4);
  const displayName = formatProjectName(repo.name);
  const category = inferProjectCategory(repo);
  const caseStudy = getCaseStudyByRepo(repo.name);
  return (
    <article className={`card project-card project-card-${variant}`}>
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

      {caseStudy ? (
        <Link href={'/projects/' + caseStudy.slug} className="project-case-link">
          Read case study <ArrowRight size={15} />
        </Link>
      ) : null}

      <div className="project-footer muted">
        <span><Star size={16} /> {repo.stargazers_count}</span>
        <span><GitFork size={16} /> {repo.forks_count}</span>
        <span>Updated {formatGithubDate(repo.updated_at)}</span>
      </div>
    </article>
  );
}
