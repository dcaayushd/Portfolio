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
import { SplineHeroOnly } from '@/components/ui/spline-hero-only';
import { BackgroundPaths } from '@/components/ui/background-paths';
import { GooeyTextRole } from '@/components/gooey-text-role';
// import { ThreeJsShowcase } from '@/components/ui/three-js-showcase';
import { portfolio } from '@/data/portfolio';
import { getGithubRepos } from '@/lib/github';
import { getProfileSnapshot } from '@/lib/profile';
import { buildProjectCategories, getShowcaseRepos } from '@/lib/projects';
import { formatGithubDate } from '@/lib/utils';

// Revalidate GitHub projects every 12 hours (43200 seconds)
export const revalidate = 43200;

import { DesktopNav } from '@/components/desktop-nav';

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
    { href: '#home', label: 'Home' },
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
            <a href="#home" className="brand">
              <span className="brand-copy">
                <strong className="brand-signature">{portfolio.name}</strong>
              </span>
            </a>

            <DesktopNav navItems={navItems} />

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

    

      <BackgroundPaths>
        <section className="hero" id="home">
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
                <GooeyTextRole roles={["AI/ML Engineer", "Flutter Developer"]} />
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
              <div className="hero-curation-panel flex items-center justify-center h-full">
                <SplineHeroOnly />
              </div>
            </FadeIn>
          </div>
        </section>
      </BackgroundPaths>
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
            description="Professional background and academic journey."
          />

          <div className="timeline-grid">
            <FadeIn>
              <div className="card panel-card" style={{ padding: '2rem', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                  <div className="profile-icon">
                    <BriefcaseBusiness size={20} />
                  </div>
                  <h3 style={{ margin: 0 }}>Work Experience</h3>
                </div>
                <div className="linkedin-timeline">
                  {profileSnapshot.experience.map((role) => (
                    <div className="linkedin-timeline-item" key={role.company + role.title}>
                      <div className="linkedin-timeline-indicator"></div>
                      <div className="linkedin-timeline-content">
                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.05rem', fontWeight: 600 }}>{role.title}</h4>
                        <div style={{ fontWeight: 500, color: 'var(--text)', marginBottom: '0.25rem' }}>{role.company}</div>
                        <div className="muted" style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                          {role.period}
                        </div>
                        <p className="muted" style={{ lineHeight: 1.6, fontSize: '0.95rem' }}>
                          {role.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <div className="card panel-card" style={{ padding: '2rem', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                  <div className="profile-icon">
                    <GraduationCap size={20} />
                  </div>
                  <h3 style={{ margin: 0 }}>Education</h3>
                </div>
                <div className="linkedin-timeline">
                  {profileSnapshot.education.map((study) => (
                    <div className="linkedin-timeline-item" key={study.institution + study.degree}>
                      <div className="linkedin-timeline-indicator"></div>
                      <div className="linkedin-timeline-content">
                        <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.05rem', fontWeight: 600 }}>{study.institution}</h4>
                        <div style={{ fontWeight: 500, color: 'var(--text)', marginBottom: '0.25rem' }}>{study.degree}</div>
                        <div className="muted" style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                          {study.period}
                        </div>
                        <p className="muted" style={{ lineHeight: 1.6, fontSize: '0.95rem' }}>
                          {study.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
