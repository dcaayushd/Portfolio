import type { Metadata } from 'next';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  Twitter
} from 'lucide-react';
import { CursorGlow } from '@/components/cursor-glow';
import { MobileNav } from '@/components/mobile-nav';
import { FadeIn } from '@/components/motion';
import { ProjectCard } from '@/components/project-card';
import { SectionHeading } from '@/components/section-heading';
import { SocialLinks } from '@/components/social-links';
import { ThemeToggle } from '@/components/theme-toggle';
import { portfolio } from '@/data/portfolio';
import { getGithubRepos } from '@/lib/github';
import { buildProjectCategories, buildProjectCategorySections, formatProjectName, getLiveDemoRepos, getShowcaseRepos } from '@/lib/projects';
import { formatGithubDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Projects | ${portfolio.name}`,
  description: 'Featured projects, live demos, and recent GitHub activity for AI/ML, backend, and Flutter work.',
  alternates: { canonical: '/projects' }
};

export default async function ProjectsPage() {
  const username = process.env.GITHUB_USERNAME || 'dcaayushd';
  const repos = await getGithubRepos(username).catch(() => []);
  const filteredRepos = repos.filter((repo) => repo.name.toLowerCase() !== username.toLowerCase());
  const showcaseRepos = getShowcaseRepos(filteredRepos);
  const featured = portfolio.featuredRepos
    .map((name) => showcaseRepos.find((repo) => repo.name === name))
    .filter((repo): repo is NonNullable<typeof repo> => Boolean(repo))
    .slice(0, 4);
  const featuredNames = new Set(featured.map((repo) => repo.name));
  const recentRepos = showcaseRepos
    .filter((repo) => !featuredNames.has(repo.name))
    .slice(0, 9);
  const liveDemos = getLiveDemoRepos(showcaseRepos).slice(0, 6);
  const categoryCards = buildProjectCategories(showcaseRepos);
  const categorySections = buildProjectCategorySections(showcaseRepos);
  const previewNotes = portfolio.projectPreviews;

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '#featured', label: 'Featured' },
    { href: '#project-tracks', label: 'Categories' },
    ...(liveDemos.length ? [{ href: '#live-demos', label: 'Live demos' }] : []),
    { href: '#recent', label: 'More work' },
    { href: '/#contact', label: 'Contact' }
  ];

  const socialLinks = [
    { href: portfolio.github, label: 'GitHub', icon: Github, external: true },
    { href: portfolio.linkedin, label: 'LinkedIn', icon: Linkedin, external: true },
    { href: portfolio.twitter, label: 'X', icon: Twitter, external: true },
    { href: `mailto:${portfolio.email}`, label: 'Email', icon: Mail }
  ];

  return (
    <main className="site-shell">
      <CursorGlow />
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="ambient ambient-bottom" />

      <header className="nav">
        <div className="container">
          <div className="nav-shell nav-inner">
            <a href="/" className="brand">
              <span className="brand-mark">AD</span>
              <span className="brand-copy">
                <strong>{portfolio.name}</strong>
                <span>{portfolio.role}</span>
              </span>
            </a>

            <nav className="nav-links" aria-label="Projects page navigation">
              {navItems.map((item) => (
                <a href={item.href} key={item.href}>{item.label}</a>
              ))}
            </nav>

            <div className="nav-actions nav-actions-desktop">
              <a className="button button-ghost nav-resume" href={portfolio.resumePath} download>
                <Download size={16} />
                Resume
              </a>
              <ThemeToggle />
            </div>

            <MobileNav links={navItems} resumePath={portfolio.resumePath} />
          </div>
        </div>
      </header>

      <section className="hero projects-page-hero">
        <div className="container projects-page-shell">
          <FadeIn>
            <div className="projects-page-copy">
              <h1>Selected projects organized by what they actually demonstrate.</h1>
              <p className="projects-page-summary muted">
                Featured work is curated first, then grouped into stronger project tracks so AI, backend, and Flutter work do not get mixed together.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#featured">
                  <ArrowRight size={18} />
                  Browse work
                </a>
                <a className="button button-secondary" href="/">
                  <ArrowLeft size={18} />
                  Back to portfolio
                </a>
              </div>

              <SocialLinks links={socialLinks} className="hero-socials" />
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="projects-page-metrics">
              {categoryCards.map((item) => (
                <a href={`#${item.id}`} className="card panel-card page-metric-card page-metric-card-link" key={item.title}>
                  <div className="mini-label">Project track</div>
                  <h2>{item.title}</h2>
                  <p className="muted">{item.description}</p>
                  <div className="page-metric-meta">
                    <strong>{item.count} curated projects</strong>
                    <span className="page-metric-spotlight">{item.spotlight}</span>
                  </div>
                </a>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section" id="featured">
        <div className="container">
          <SectionHeading
            eyebrow="Featured"
            title="Featured projects."
            description="A cleaner view of the strongest projects first, followed by category browsing and recent GitHub activity."
            action={
              <a href={portfolio.github} target="_blank" rel="noreferrer" className="button button-secondary">
                <Github size={18} />
                GitHub profile
              </a>
            }
          />

          {featured.length ? (
            <div className="featured-products">
              {featured.map((repo, index) => (
                <FadeIn key={repo.id} delay={index * 0.05}>
                  <ProjectCard
                    repo={repo}
                    variant="secondary"
                    label="Featured project"
                  />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="card empty-state">Featured repositories will appear here when GitHub data is available.</div>
          )}
        </div>
      </section>

      <section className="section" id="project-tracks">
        <div className="container">
          <SectionHeading
            eyebrow="By category"
            title="Project tracks."
            description="These categories use manual overrides for flagship repositories and smarter signal-based fallback for the rest."
          />

          <div className="project-track-nav">
            {categoryCards.map((item) => (
              <a href={`#${item.id}`} className="eyebrow project-track-link" key={item.id}>
                {item.title}
                <span>{item.count}</span>
              </a>
            ))}
          </div>

          <div className="project-category-stack">
            {categorySections.map((section, sectionIndex) => (
              <FadeIn key={section.id} delay={sectionIndex * 0.05}>
                <div className="project-category-block" id={section.id}>
                  <div className="projects-subheader">
                    <div>
                      <div className="mini-label">Category</div>
                      <h3>{section.title}</h3>
                    </div>
                    <p className="muted project-category-description">{section.description}</p>
                  </div>

                  {section.repos.length ? (
                    <div className="projects-grid projects-grid-recent">
                      {section.repos.slice(0, 6).map((repo, index) => (
                        <FadeIn key={repo.id} delay={index * 0.04}>
                          <ProjectCard
                            repo={repo}
                            variant="recent"
                            label={`${section.title} project`}
                            hoverPreview
                            previewNote={previewNotes[repo.name as keyof typeof previewNotes]?.note}
                          />
                        </FadeIn>
                      ))}
                    </div>
                  ) : (
                    <div className="card empty-state">GitHub project data for this category will appear here when matching repositories are available.</div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {liveDemos.length ? (
        <section className="section" id="live-demos">
          <div className="container">
            <SectionHeading
              eyebrow="Live demos"
              title="Projects with a published demo."
              description="These links come from the live homepage field on each repository."
            />

            <div className="live-demo-grid">
              {liveDemos.map((repo, index) => (
                <FadeIn key={repo.id} delay={index * 0.05}>
                  <article className="card panel-card live-demo-card">
                    <div className="project-preview live-demo-preview">
                      <img
                        src={`https://opengraph.githubassets.com/1/${repo.html_url.replace(/^https?:\/\/github\.com\//, '')}`}
                        alt={`${formatProjectName(repo.name)} preview`}
                        loading="lazy"
                      />
                      <div className="project-badge-row">
                        <span className="project-badge">Live demo available</span>
                      </div>
                    </div>

                    <div className="mini-label">Live project</div>
                    <h3>{formatProjectName(repo.name)}</h3>
                    <p className="muted live-demo-summary">
                      {repo.description || 'Live link and repo details are synced from GitHub.'}
                    </p>

                    <div className="chips">
                      {repo.language ? <span className="chip">{repo.language}</span> : null}
                      {(repo.topics || []).slice(0, 4).map((topic) => (
                        <span className="chip" key={topic}>{topic}</span>
                      ))}
                    </div>

                    <div className="live-demo-actions">
                      <a href={repo.homepage || repo.html_url} target="_blank" rel="noreferrer" className="button button-primary">
                        <Globe size={18} />
                        Open demo
                      </a>
                      <a href={repo.html_url} target="_blank" rel="noreferrer" className="button button-secondary">
                        <Github size={18} />
                        View repo
                      </a>
                    </div>

                    <div className="project-footer muted">
                      <span>Updated {formatGithubDate(repo.updated_at)}</span>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section" id="recent">
        <div className="container">
          <SectionHeading
            eyebrow="More work"
            title="More repositories from GitHub."
            description="Additional projects beyond the main featured and categorized selections."
          />

          {recentRepos.length ? (
            <div className="projects-grid projects-grid-recent">
              {recentRepos.map((repo, index) => (
                <FadeIn key={repo.id} delay={index * 0.04}>
                  <ProjectCard
                    repo={repo}
                    variant="recent"
                    label="Recent repository"
                    hoverPreview
                    previewNote={previewNotes[repo.name as keyof typeof previewNotes]?.note}
                  />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="card empty-state">Recent repositories will appear here when GitHub data is available.</div>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} {portfolio.name}</span>
          <span>{portfolio.role}</span>
        </div>
      </footer>
    </main>
  );
}
