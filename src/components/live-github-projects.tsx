'use client';

import { ArrowUpRight, CircleDot, GitFork, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toPublicGithubRepo, type GithubRepo } from '@/lib/github-repo';

type LiveProject = GithubRepo;

const PRIORITY: Record<string, number> = {
  'AI-Voice-Cloning-System': 120,
  'AI-Parking-Analytics-System': 116,
  Customer_Churn_Prediction: 112,
  'AI-PR-Review-Bot': 108,
  'Self-Healing-RAG': 104,
  Documentify: 100,
  Zinemo: 96,
  'AI-Chat-Bot-Flutter': 94
};

function projectScore(project: LiveProject) {
  const current = PRIORITY[project.name] || 0;
  const traction = Math.min(project.stargazers_count, 100) * 0.25 + Math.min(project.forks_count, 30) * 0.4;
  const pushed = new Date(project.pushed_at).getTime();
  const ageInDays = Number.isFinite(pushed) ? Math.max(0, (Date.now() - pushed) / 86_400_000) : 365;
  const recency = Math.max(0, 8 - ageInDays / 45);

  return current + traction + recency;
}

function formatProjectName(name: string) {
  return name.replace(/[-_]+/g, ' ');
}

function selectProjects(projects: LiveProject[]) {
  return projects
    .filter((project) => !project.fork && !project.archived && project.name.toLowerCase() !== 'portfolio')
    .sort((left, right) => projectScore(right) - projectScore(left))
    .slice(0, 4);
}

function sanitizeProjects(value: unknown): LiveProject[] {
  if (!Array.isArray(value)) return [];

  return value
    .map(toPublicGithubRepo)
    .filter((project): project is LiveProject => Boolean(project));
}

export function LiveGithubProjects({ fallbackProjects }: { fallbackProjects: LiveProject[] }) {
  const [projects, setProjects] = useState(() => selectProjects(fallbackProjects));
  const [source, setSource] = useState<'snapshot' | 'live'>('snapshot');

  useEffect(() => {
    const controller = new AbortController();
    const cacheKey = 'portfolio-github-projects-v1';

    try {
      const cached = window.sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as { projects?: unknown };
        const cachedProjects = sanitizeProjects(parsed.projects);
        if (cachedProjects.length) {
          setProjects(selectProjects(cachedProjects));
          setSource('live');
        }
      }
    } catch {
      // The snapshot stays visible when browser storage is unavailable.
    }

    fetch('https://api.github.com/users/dcaayushd/repos?sort=updated&per_page=100', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal
    })
      .then((response) => (response.ok ? response.json() : Promise.reject(new Error('GitHub unavailable'))))
      .then((data: unknown) => {
        const nextProjects = selectProjects(sanitizeProjects(data));
        if (nextProjects.length) {
          setProjects(nextProjects);
          setSource('live');
          try {
            window.sessionStorage.setItem(cacheKey, JSON.stringify({ projects: nextProjects }));
          } catch {
            // The network result is still useful for this visit.
          }
        }
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  return (
    <div className="github-radar" aria-label="Selected GitHub projects">
      <div className="github-radar-head">
        <div>
          <span className="eyebrow">Live GitHub</span>
          <h2>Latest GitHub activity.</h2>
        </div>
        <span className={'github-source github-source-' + source}>
          <CircleDot size={14} />
          {source === 'live' ? 'Live data' : 'Verified snapshot'}
        </span>
      </div>

      <div className="github-radar-grid">
        {projects.map((project, index) => (
          <a
            className="github-radar-card"
            href={project.html_url}
            target="_blank"
            rel="noreferrer"
            key={project.name}
          >
            <div className="github-radar-card-top">
              <span>0{index + 1}</span>
              <ArrowUpRight size={18} />
            </div>
            <h3>{formatProjectName(project.name)}</h3>
            <p>{project.description || 'View the repository for the latest project details.'}</p>
            <div className="github-radar-meta">
              <span>{project.language || 'Code'}</span>
              <span><Star size={13} /> {project.stargazers_count}</span>
              <span><GitFork size={13} /> {project.forks_count}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
