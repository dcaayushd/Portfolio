import {
  ArrowUpRight,
  ArrowRight,
  BrainCircuit,
  ChevronDown,
  BriefcaseBusiness,
  Download,
  GitFork,
  Github,
  GraduationCap,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Server,
  Smartphone,
  Star,
  Twitter
} from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { CursorGlow } from '@/components/cursor-glow';
import { MobileNav } from '@/components/mobile-nav';
import { FadeIn } from '@/components/motion';
import { SectionHeading } from '@/components/section-heading';
import { SocialLinks } from '@/components/social-links';
import { ThemeToggle } from '@/components/theme-toggle';
import { portfolio } from '@/data/portfolio';
import { getGithubRepos } from '@/lib/github';
import { getProfileSnapshot } from '@/lib/profile';
import { buildProjectCategories, getShowcaseRepos } from '@/lib/projects';
import { formatGithubDate } from '@/lib/utils';

// Revalidate GitHub projects every 12 hours (43200 seconds)
export const revalidate = 43200;

export default async function HomePage() {
  const username = process.env.GITHUB_USERNAME || 'dcaayushd';
  const profileSnapshot = await getProfileSnapshot();
  const repos = await getGithubRepos(username).catch(() => []);
  const filteredRepos = repos.filter((repo) => repo.name.toLowerCase() !== username.toLowerCase());
  const showcaseRepos = getShowcaseRepos(filteredRepos);
  const categoryCards = buildProjectCategories(showcaseRepos);
  const aiTrack = categoryCards.find((item) => item.id === 'category-ai-ml-vision');
  const backendTrack = categoryCards.find((item) => item.id === 'category-backend-apis');
  const flutterTrack = categoryCards.find((item) => item.id === 'category-flutter-apps');
  const caseStudies = portfolio.caseStudies
    .map((item) => ({
      ...item,
      repo: showcaseRepos.find((repo) => repo.name === item.repoName)
    }))
    .slice(0, 3);

  const currentRole = profileSnapshot.experience[0];
  const currentStudy = profileSnapshot.education[0];
  const currentImpact = portfolio.experienceImpact;
  const workSignals = [
    {
      label: 'Backend stack',
      value: 'Django REST + Celery + FAISS',
      note: 'API delivery, async jobs, retrieval'
    },
    {
      label: 'Live system inputs',
      value: 'CMS cache + RAG + Ollama',
      note: 'grounded package and support flows'
    },
    {
      label: 'QA surface',
      value: '86 backend tests',
      note: 'conversation, package, and support flows'
    }
  ];
  const skillGroups = Object.entries(portfolio.skills);
  const focusCards = [
    { icon: BrainCircuit, ...portfolio.focusAreas[0], label: 'AI systems', href: aiTrack?.href || '/projects#category-ai-ml-vision' },
    { icon: Server, ...portfolio.focusAreas[1], label: 'Backend systems', href: backendTrack?.href || '/projects#category-backend-apis' },
    { icon: Smartphone, ...portfolio.focusAreas[2], label: 'Flutter delivery', href: flutterTrack?.href || '/projects#category-flutter-apps' }
  ];
  const heroHighlights = [
    { label: portfolio.heroHighlights[0], href: aiTrack?.href || '/projects#category-ai-ml-vision' },
    { label: portfolio.heroHighlights[1], href: aiTrack?.href || '/projects#category-ai-ml-vision' },
    { label: portfolio.heroHighlights[2], href: flutterTrack?.href || '/projects#category-flutter-apps' }
  ];
  const featuredProjectLinks = caseStudies.map((item) => ({
    ...item,
    href: item.repo?.html_url || `https://github.com/dcaayushd/${item.repoName}`,
    meta: item.repo ? `Updated ${formatGithubDate(item.repo.updated_at)}` : 'Featured on GitHub'
  }));

  const navItems = [
    { href: '#top', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#timeline', label: 'Experience' },
    { href: '#contact', label: 'Contact' }
  ];

  const socialLinks = [
    { href: portfolio.github, label: 'GitHub', icon: Github, external: true },
    { href: portfolio.linkedin, label: 'LinkedIn', icon: Linkedin, external: true },
    { href: portfolio.twitter, label: 'X', icon: Twitter, external: true },
    { href: portfolio.instagram, label: 'Instagram', icon: Instagram, external: true },
    { href: `mailto:${portfolio.email}`, label: 'Email', icon: Mail }
  ];
  const heroSocialLinks = [socialLinks[0], socialLinks[1], socialLinks[4]];

  const snapshot = [
    {
      icon: BriefcaseBusiness,
      label: 'Current role',
      value: currentRole ? `${currentRole.title} at ${currentRole.company}` : 'AI systems and product engineering',
      href: '#timeline'
    },
    {
      icon: GraduationCap,
      label: 'Education',
      value: currentStudy ? `${currentStudy.degree} at ${currentStudy.institution}` : 'Continuous learning across ML and backend systems',
      href: '#timeline'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: portfolio.location,
      href: '#contact'
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: portfolio.name,
    jobTitle: portfolio.role,
    url: `https://${portfolio.domain}`,
    sameAs: [portfolio.github, portfolio.linkedin, portfolio.twitter, portfolio.instagram],
    worksFor: currentRole ? { '@type': 'Organization', name: currentRole.company } : undefined,
    alumniOf: currentStudy ? { '@type': 'CollegeOrUniversity', name: currentStudy.institution } : undefined
  };

  return (
    <main className="site-shell">
      <CursorGlow />
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="ambient ambient-bottom" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="nav">
        <div className="container">
          <div className="nav-shell nav-inner">
            <a href="#top" className="brand">
              <span className="brand-mark">AD</span>
              <span className="brand-copy">
                <strong>{portfolio.name}</strong>
                <span>{portfolio.role}</span>
              </span>
            </a>

            <nav className="nav-links" aria-label="Section navigation">
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

      <section className="hero" id="top">
        <div className="container hero-grid">
          <FadeIn>
            <div className="hero-copy">
              <div className="hero-meta" aria-label="Location and availability">
                <a href="#contact" className="eyebrow eyebrow-strong hero-meta-pill hero-meta-link">
                  <MapPin size={16} />
                  {portfolio.location}
                </a>
                <a href="#contact" className="eyebrow hero-meta-pill hero-meta-link">{portfolio.availabilityShort}</a>
              </div>

              <h1>{portfolio.heroTitle}</h1>
              <p className="hero-summary">{portfolio.tagline}</p>

              <div className="hero-tags" aria-label="Core strengths">
                {heroHighlights.map((tag) => (
                  <a href={tag.href} className="hero-tag hero-tag-link" key={tag.label}>{tag.label}</a>
                ))}
              </div>

              <div className="hero-actions">
                <a className="button button-primary" href="/projects">
                  <ArrowRight size={18} />
                  View projects
                </a>
                <a className="button button-secondary" href={portfolio.resumePath} download>
                  <Download size={18} />
                  Resume
                </a>
              </div>

              <SocialLinks links={heroSocialLinks} className="hero-socials" />
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <article className="card panel-card hero-curation-panel">
              <div className="hero-curation-header">
                <div>
                  <span className="mini-label">How I build</span>
                  <h2>A proven approach to shipping products.</h2>
                </div>
              </div>

              <p className="muted hero-curation-intro">{portfolio.shortBio}</p>

              <div className="hero-delivery-approach">
                {portfolio.deliveryApproach.map((step) => (
                  <div className="delivery-step" key={step.label}>
                    <div className="delivery-step-label">{step.label}</div>
                    <strong>{step.title}</strong>
                    <p className="muted">{step.description}</p>
                  </div>
                ))}
              </div>

              <div className="hero-snapshot-grid">
                {snapshot.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a href={item.href} className="hero-snapshot-card" key={item.label}>
                      <div className="hero-snapshot-top">
                        <div className="profile-icon">
                          <Icon size={16} />
                        </div>
                        <span className="profile-label">{item.label}</span>
                      </div>
                      <strong>{item.value}</strong>
                    </a>
                  );
                })}
              </div>
            </article>
          </FadeIn>
        </div>
      </section>

      <section className="section" id="projects">
        <div className="container">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work across AI/ML, backend, and Flutter."
            description="A smaller set of projects that best shows the range: AI systems, backend thinking, and product-minded Flutter work."
            action={
              <div className="section-actions">
                <a href="/projects" className="button button-secondary">
                  <ArrowRight size={18} />
                  All projects
                </a>
                <a href={portfolio.github} target="_blank" rel="noreferrer" className="button button-ghost">
                  <Github size={18} />
                  GitHub
                </a>
              </div>
            }
          />

          <div className="project-track-nav home-track-nav">
            {categoryCards.map((item) => (
              <a href={item.href} className="eyebrow project-track-link" key={item.id}>
                {item.title}
                <span>{item.count}</span>
              </a>
            ))}
          </div>

          {caseStudies.length ? (
            <div className="case-study-grid">
              {caseStudies.map((item, index) => (
                <FadeIn key={item.repoName} delay={index * 0.06}>
                  <article className="card panel-card case-study-card">
                    <div className="case-study-top">
                      <div>
                        <div className="project-label">{item.label}</div>
                        <h3>{item.title}</h3>
                      </div>
                      <a
                        href={item.repo?.html_url || `https://github.com/dcaayushd/${item.repoName}`}
                        target="_blank"
                        rel="noreferrer"
                        className="icon-button"
                        aria-label={`Open ${item.title}`}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    </div>

                    <p className="case-study-result">{item.result}</p>
                    <p className="muted case-study-summary">{item.summary}</p>

                    <div className="case-study-points">
                      {item.bullets.map((point) => (
                        <div className="case-study-point" key={point}>{point}</div>
                      ))}
                    </div>

                    <div className="project-footer muted">
                      <span><Star size={16} /> {item.repo?.stargazers_count ?? 0}</span>
                      <span><GitFork size={16} /> {item.repo?.forks_count ?? 0}</span>
                      <span>{item.repo ? `Updated ${formatGithubDate(item.repo.updated_at)}` : 'Live on GitHub'}</span>
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          ) : null}

          {!caseStudies.length ? (
            <div className="card empty-state">
              GitHub project data is temporarily unavailable. The projects section will repopulate automatically the next time the GitHub request succeeds.
            </div>
          ) : null}
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <SectionHeading
            eyebrow="About"
            title="AI/ML systems, dependable backend engineering, and polished Flutter delivery."
            description="I prefer clean experiments, readable systems, and delivery that holds up after launch."
          />

          <div className="capability-grid">
            <div className="capability-column">
              <FadeIn>
                <article className="card panel-card story-card">
                  <p className="story-lead">{portfolio.aboutLead}</p>
                  <p className="muted">{portfolio.longBio}</p>
                  <div className="story-signature">Built around practical delivery, not buzzwords</div>
                </article>
              </FadeIn>
              
              <FadeIn delay={0.12}>
                <article className="card panel-card skills-panel">
                  <div className="skills-panel-header">
                    <h3>Stack I actually use</h3>
                    <span className="muted">AI/ML, Python backend, Flutter apps</span>
                  </div>

                  <div className="skill-matrix">
                    {skillGroups.map(([group, items]) => (
                      <div className="skill-group" key={group}>
                        <h4>{group}</h4>
                        <div className="skill-chip-row">
                          {items.map((item) => (
                            <span className="skill-chip" key={item}>{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </FadeIn>
            </div>

            <FadeIn delay={0.08}>
              <div className="capability-rail">
                <div className="focus-grid">
                  {focusCards.map((area) => {
                    const Icon = area.icon;

                    return (
                      <a href={area.href} className="card panel-card focus-tile focus-tile-link" key={area.title}>
                        <div className="focus-icon">
                          <Icon size={18} />
                        </div>
                        <div className="mini-label">{area.label}</div>
                        <h3>{area.title}</h3>
                        <p className="muted">{area.description}</p>
                        {'points' in area && Array.isArray(area.points) ? (
                          <div className="focus-points">
                            {area.points.map((point) => (
                              <span className="focus-point" key={point}>{point}</span>
                            ))}
                          </div>
                        ) : null}
                      </a>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" id="timeline">
        <div className="container">
          <SectionHeading
            eyebrow="Experience"
            title="Work and education."
            description="Open a card to see the current role, delivery scope, and study focus."
          />

          <div className="timeline-grid">
            <FadeIn>
              <details className="card panel-card timeline-card timeline-detail timeline-card-work" data-section="work">
                <summary className="timeline-summary">
                  <div className="timeline-summary-main">
                    <div className="profile-icon timeline-summary-icon">
                      <BriefcaseBusiness size={18} />
                    </div>
                    <div>
                      <div className="mini-label">Work</div>
                      <h3>{currentImpact.title}</h3>
                      <div className="muted timeline-summary-copy">{currentImpact.company}</div>
                      <p className="muted timeline-preview">Django chatbot backend work across retrieval, live package data, async jobs, and production-facing support flows.</p>
                    </div>
                  </div>

                  <div className="timeline-summary-side">
                    <span className="timeline-note">{currentImpact.period}</span>
                    <span className="timeline-state">{currentRole?.state || 'In progress'}</span>
                    <span className="timeline-toggle">
                      Details
                      <ChevronDown size={16} />
                    </span>
                  </div>
                </summary>

                <div className="timeline-detail-body timeline-detail-layout">
                  <div className="timeline-detail-main">
                    <p className="muted experience-impact-summary">{currentImpact.summary}</p>

                    <div className="experience-impact-list">
                      {currentImpact.bullets.map((item) => (
                        <div className="experience-impact-item" key={item}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <aside className="timeline-detail-side">
                    <div className="timeline-signal-grid">
                      {workSignals.map((item) => (
                        <div className="timeline-signal-card" key={item.label}>
                          <span>{item.label}</span>
                          <strong>{item.value}</strong>
                          <p className="muted">{item.note}</p>
                        </div>
                      ))}
                    </div>
                  </aside>
                </div>
              </details>
            </FadeIn>

            <FadeIn delay={0.08}>
              <details className="card panel-card timeline-card timeline-detail" data-section="education">
                <summary className="timeline-summary">
                  <div className="timeline-summary-main">
                    <div className="profile-icon timeline-summary-icon">
                      <GraduationCap size={18} />
                    </div>
                    <div>
                      <div className="mini-label">Education</div>
                      <h3>{currentStudy?.degree || 'Education'}</h3>
                      <div className="muted timeline-summary-copy">{currentStudy?.institution || 'Current program'}</div>
                      <p className="muted timeline-preview">Computer science fundamentals paired with active AI/ML, Python backend, and Flutter project work.</p>
                    </div>
                  </div>

                  <div className="timeline-summary-side">
                    <span className="timeline-note">{currentStudy?.period || 'Ongoing'}</span>
                    <span className="timeline-state">{currentStudy?.state || 'In progress'}</span>
                    <span className="timeline-toggle">
                      Details
                      <ChevronDown size={16} />
                    </span>
                  </div>
                </summary>

                <div className="timeline-detail-body timeline-detail-layout">
                  <div className="timeline-detail-main">
                    <p className="muted experience-impact-summary">
                      {currentStudy?.description || 'Studying core computer science while building practical AI/ML, backend, and Flutter systems.'}
                    </p>

                    <div className="timeline-course-grid" aria-label="Coursework highlights">
                      {(currentStudy?.coursework || []).map((item) => (
                        <div className="timeline-signal-card timeline-course-card" key={item.label}>
                          <span>{item.label}</span>
                          <strong>{item.title}</strong>
                          <p className="muted">{item.courses}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <SectionHeading
            eyebrow="Contact"
            title="Fast contact."
            description="If there is a role, project, or collaboration in mind, a short note is enough."
          />

          <div className="contact-grid">
            <FadeIn>
              <article className="card panel-card contact-card contact-card-primary">
                <div className="contact-band">
                  <div className="mini-label">Reach out directly</div>
                  <span className="contact-response">Usually replies within a day</span>
                </div>

                <div className="contact-callout">
                  <p className="contact-lead">Practical AI features, Python APIs, and polished Flutter delivery.</p>
                </div>

                <p className="muted contact-copy">{portfolio.availability}.</p>

                <div className="contact-mini-grid">
                  <div className="contact-mini-card">
                    <span>Based in</span>
                    <strong>{portfolio.location}</strong>
                  </div>
                  <div className="contact-mini-card">
                    <span>Best for</span>
                    <strong>AI/ML features, Python APIs, and Flutter app delivery</strong>
                  </div>
                </div>

                <SocialLinks links={socialLinks} variant="button" className="contact-socials" />
              </article>
            </FadeIn>

            <FadeIn delay={0.1}>
              <article className="card panel-card contact-card">
                <h3>Send a message</h3>
                <p className="muted contact-intro">A short note about the role, product, or collaboration is enough.</p>
                <ContactForm />
              </article>
            </FadeIn>
          </div>
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
