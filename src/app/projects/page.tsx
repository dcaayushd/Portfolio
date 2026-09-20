import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  Github,
  Globe,
  Linkedin,
  Mail,
  X
} from 'lucide-react';
import { DesktopNav } from '@/components/desktop-nav';
import { MobileNav } from '@/components/mobile-nav';
import { FadeIn } from '@/components/motion';
import { ProjectCard } from '@/components/project-card';
import { SocialLinks } from '@/components/social-links';
import { ThemeToggle } from '@/components/theme-toggle';
import { portfolio } from '@/data/portfolio';
import { getGithubRepos } from '@/lib/github';
import {
  buildProjectCategories,
  buildProjectCategorySections,
  formatProjectName,
  getLiveDemoRepos,
  getShowcaseRepos
} from '@/lib/projects';
import { formatGithubDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'AI/ML, Python Backend & Flutter Projects',
  description: 'Selected AI/ML, computer vision, RAG, FastAPI, Django, and Flutter projects—case studies in Python backend engineering and product delivery.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'AI/ML, Python Backend & Flutter Projects | Aayush D. C. Dangi',
    description: 'Computer vision, RAG, FastAPI, Django, and Flutter case studies in Python backend engineering and product delivery.'
  },
  twitter: {
    title: 'AI/ML, Python Backend & Flutter Projects | Aayush D. C. Dangi',
    description: 'Computer vision, RAG, FastAPI, Django, and Flutter case studies in Python backend engineering and product delivery.'
  }
};

export const revalidate = 3600;

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
  const liveDemos = getLiveDemoRepos(showcaseRepos).slice(0, 6);
  const categoryCards = buildProjectCategories(showcaseRepos);
  const categorySections = buildProjectCategorySections(showcaseRepos).map((section) => ({
    ...section,
    repos: section.repos.filter((repo) => !featuredNames.has(repo.name))
  }));
  const previewNotes = portfolio.projectPreviews;
  const totalProjects = categoryCards.reduce((total, track) => total + track.count, 0);
  const latestRepository = [...showcaseRepos].sort(
    (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
  )[0];
  const mostRecentUpdate = latestRepository ? formatGithubDate(latestRepository.updated_at) : 'synced from GitHub';

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '#featured', label: 'Featured' },
    { href: '#project-tracks', label: 'Categories' },
    ...(liveDemos.length ? [{ href: '#live-demos', label: 'Live demos' }] : []),
    { href: '/#contact', label: 'Contact' }
  ];

  const socialLinks = [
    { href: portfolio.github, label: 'GitHub', icon: Github, external: true },
    { href: portfolio.linkedin, label: 'LinkedIn', icon: Linkedin, external: true },
    { href: portfolio.twitter, label: 'X', icon: X, external: true },
    { href: `mailto:${portfolio.email}`, label: 'Email', icon: Mail }
  ];

  return (
    <main className="site-shell projects-v2-page" id="main-content" tabIndex={-1}>
      <a className="skip-link" href="#projects-v2-content">Skip to projects</a>

      <header className="nav projects-v2-nav">
        <div className="container nav-inner projects-v2-nav-inner">
          <Link href="/" className="brand" aria-label="Aayush D C Dangi — home">
            <span className="brand-mark">AD</span>
            <span className="brand-name">Aayush D C Dangi</span>
          </Link>

          <DesktopNav navItems={navItems} />

          <div className="nav-actions nav-actions-desktop">
            <a className="text-link" href={portfolio.resumePath} download>
              Resume <Download size={15} />
            </a>
            <ThemeToggle />
          </div>

          <MobileNav links={navItems} resumePath={portfolio.resumePath} />
        </div>
      </header>

      <div className="projects-v2-content" id="projects-v2-content">
        <section className="projects-v2-hero" aria-labelledby="projects-v2-title">
          <div className="container projects-v2-hero-inner">
            <FadeIn>
              <div className="projects-v2-hero-copy">
                <p className="projects-v2-kicker">Selected engineering work</p>
                <h1 id="projects-v2-title">AI/ML, FastAPI &amp; Flutter Projects.</h1>
                <p className="projects-v2-intro">
                  A curated selection of computer vision, RAG, FastAPI, Django, and Flutter work—built to show system design, product integration, and delivery discipline.
                </p>

                <div className="projects-v2-hero-actions">
                  <a className="button button-primary" href="#featured">
                    Explore featured work <ArrowRight size={17} />
                  </a>
                  <Link className="button button-secondary" href="/">
                    <ArrowLeft size={17} /> Back to portfolio
                  </Link>
                </div>

                <SocialLinks links={socialLinks} className="projects-v2-socials" />
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <aside className="projects-v2-dossier" aria-label="Project collection notes">
                <div className="projects-v2-dossier-header">
                  <span>Field notes</span>
                  <span>GitHub refresh · {mostRecentUpdate}</span>
                </div>
                <div className="projects-v2-dossier-line">
                  <span>01</span>
                  <div><strong>Computer vision</strong><p>Calibrated feeds, model inference, live operational data.</p></div>
                </div>
                <div className="projects-v2-dossier-line">
                  <span>02</span>
                  <div><strong>Python + FastAPI</strong><p>APIs, background jobs, retrieval systems, and deployment paths.</p></div>
                </div>
                <div className="projects-v2-dossier-line">
                  <span>03</span>
                  <div><strong>Flutter products</strong><p>Mobile interfaces that make model capabilities usable.</p></div>
                </div>
                <footer><span>{totalProjects} curated repositories</span><span>{featured.length} detailed case studies</span></footer>
              </aside>
            </FadeIn>
          </div>
        </section>

        <section className="projects-v2-tracks" aria-labelledby="projects-v2-tracks-title">
          <div className="container">
            <div className="projects-v2-section-heading">
              <p className="projects-v2-kicker">Project tracks</p>
              <h2 id="projects-v2-tracks-title">Explore work by engineering discipline.</h2>
            </div>

            <nav className="projects-v2-track-list" aria-label="Project tracks">
              {categoryCards.map((track, index) => (
                <a className="projects-v2-track" href={`#${track.id}`} key={track.id}>
                  <span className="projects-v2-track-index">0{index + 1}</span>
                  <span className="projects-v2-track-copy">
                    <strong>{track.title}</strong>
                    <span>{track.description}</span>
                  </span>
                  <span className="projects-v2-track-count">{track.count} projects</span>
                  <ArrowRight aria-hidden="true" size={18} />
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section className="projects-v2-featured" id="featured" aria-labelledby="projects-v2-featured-title">
          <div className="container">
            <div className="projects-v2-section-heading projects-v2-section-heading-row">
              <div>
                <p className="projects-v2-kicker">Featured systems</p>
                <h2 id="projects-v2-featured-title">Featured AI/ML and product engineering case studies.</h2>
              </div>
              <a href={portfolio.github} target="_blank" rel="noreferrer" className="projects-v2-inline-link">
                GitHub profile <Github size={17} />
              </a>
            </div>

            {featured.length ? (
              <div className="projects-v2-featured-grid">
                {featured.map((repo, index) => (
                  <FadeIn key={repo.id} delay={index * 0.05}>
                    <ProjectCard repo={repo} variant="secondary" label={`Featured system · 0${index + 1}`} />
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="projects-v2-empty-state">Featured repositories will appear here when GitHub data is available.</div>
            )}
          </div>
        </section>

        <section className="projects-v2-categories" id="project-tracks" aria-labelledby="projects-v2-categories-title">
          <div className="container">
            <div className="projects-v2-section-heading">
              <p className="projects-v2-kicker">The full collection</p>
              <h2 id="projects-v2-categories-title">More work across AI, backend, and Flutter.</h2>
              <p className="projects-v2-section-intro">
                Supporting projects organized by the engineering discipline they demonstrate, with source code and current GitHub activity.
              </p>
            </div>

            <div className="projects-v2-category-list">
              {categorySections.map((section, sectionIndex) => (
                <section className="projects-v2-category" id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
                  <FadeIn delay={sectionIndex * 0.05}>
                    <header className="projects-v2-category-header">
                      <span className="projects-v2-category-index">0{sectionIndex + 1}</span>
                      <div>
                        <p className="projects-v2-kicker">Engineering track</p>
                        <h3 id={`${section.id}-title`}>{section.title}</h3>
                      </div>
                      <p>{section.description}</p>
                    </header>
                  </FadeIn>

                  {section.repos.length ? (
                    <div className="projects-v2-project-grid">
                      {section.repos.slice(0, 6).map((repo, index) => (
                        <FadeIn key={repo.id} delay={index * 0.04}>
                          <ProjectCard
                            repo={repo}
                            variant="recent"
                            label={`${section.title} · ${String(index + 1).padStart(2, '0')}`}
                            previewNote={previewNotes[repo.name as keyof typeof previewNotes]?.note}
                          />
                        </FadeIn>
                      ))}
                    </div>
                  ) : (
                    <div className="projects-v2-empty-state">No additional projects in this track yet.</div>
                  )}
                </section>
              ))}
            </div>
          </div>
        </section>

        {liveDemos.length ? (
          <section className="projects-v2-demos" id="live-demos" aria-labelledby="projects-v2-demos-title">
            <div className="container">
              <div className="projects-v2-section-heading projects-v2-section-heading-row">
                <div>
                  <p className="projects-v2-kicker">Published work</p>
                  <h2 id="projects-v2-demos-title">Live products and published builds.</h2>
                </div>
                <p className="projects-v2-section-note">Published links are synchronized from repository homepages.</p>
              </div>

              <div className="projects-v2-demo-grid">
                {liveDemos.map((repo, index) => (
                  <FadeIn key={repo.id} delay={index * 0.05}>
                    <article className="projects-v2-demo-card">
                      <header className="projects-v2-demo-header">
                        <span className="projects-v2-demo-status">Live</span>
                        <span>{repo.language || 'Project'}</span>
                      </header>
                      <h3>{formatProjectName(repo.name)}</h3>
                      <p>{repo.description || 'A published build with repository details available on GitHub.'}</p>

                      <div className="projects-v2-demo-tags" aria-label="Project technologies">
                        {(repo.topics || []).slice(0, 3).map((topic) => (
                          <span key={topic}>{topic}</span>
                        ))}
                      </div>

                      <footer className="projects-v2-demo-footer">
                        <span>Updated {formatGithubDate(repo.updated_at)}</span>
                        <div>
                          <a href={repo.homepage || repo.html_url} target="_blank" rel="noreferrer" aria-label={`Open live demo for ${repo.name}`}>
                            <Globe size={17} /> Live demo
                          </a>
                          <a href={repo.html_url} target="_blank" rel="noreferrer" aria-label={`Open GitHub repository for ${repo.name}`}>
                            <Github size={17} /> Source
                          </a>
                        </div>
                      </footer>
                    </article>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>

      <footer className="projects-v2-footer">
        <div className="container projects-v2-footer-inner">
          <div>
            <span className="projects-v2-footer-mark">AD</span>
            <p>© {new Date().getFullYear()} {portfolio.name}</p>
          </div>
          <p>{portfolio.role}</p>
          <a href={`mailto:${portfolio.email}`}>Let&apos;s work together <ArrowRight size={16} /></a>
        </div>
      </footer>
    </main>
  );
}
