import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin
} from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';
import { LiveGithubProjects } from '@/components/live-github-projects';
import { MobileNav } from '@/components/mobile-nav';
import { FadeIn } from '@/components/motion';
import { SocialLinks } from '@/components/social-links';
import { ThemeToggle } from '@/components/theme-toggle';
import { DesktopNav } from '@/components/desktop-nav';
import { getCaseStudyByRepo } from '@/data/case-studies';
import { portfolio } from '@/data/portfolio';
import { getGithubRepos } from '@/lib/github';
import { getProfileSnapshot } from '@/lib/profile';
import { buildProjectCategories, getShowcaseRepos } from '@/lib/projects';
import { formatGithubDate } from '@/lib/utils';

export const revalidate = 3600;

export default async function HomePage() {
  const username = process.env.GITHUB_USERNAME || 'dcaayushd';
  const profileSnapshot = await getProfileSnapshot();
  const repos = await getGithubRepos(username).catch(() => []);
  const showcaseRepos = getShowcaseRepos(
    repos.filter((repo) => repo.name.toLowerCase() !== username.toLowerCase())
  );
  const categoryCards = buildProjectCategories(showcaseRepos);
  const caseStudies = portfolio.caseStudies
    .map((item) => ({
      ...item,
      repo: showcaseRepos.find((repo) => repo.name === item.repoName),
      detail: getCaseStudyByRepo(item.repoName)
    }))
    .slice(0, 4);
  const currentStudy = profileSnapshot.education[0];
  const spotlightRepo = showcaseRepos.find((repo) => repo.name === 'AI-Parking-Analytics-System');
  const chatRepo = showcaseRepos.find((repo) => repo.name === 'AI-Chat-Bot-Flutter');
  const orderedExperience = [...profileSnapshot.experience].sort((left, right) => {
    if (left.company === 'Nepal Telecom') return -1;
    if (right.company === 'Nepal Telecom') return 1;
    return 0;
  });

  const navItems = [
    { href: '#work', label: 'Work' },
    { href: '#github', label: 'GitHub' },
    { href: '#practice', label: 'Capabilities' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' }
  ];

  const socialLinks = [
    { href: portfolio.github, label: 'GitHub', icon: Github, external: true },
    { href: portfolio.linkedin, label: 'LinkedIn', icon: Linkedin, external: true },
    { href: 'mailto:' + portfolio.email, label: 'Email', icon: Mail }
  ];

  const practiceLinks = portfolio.focusAreas.map((area, index) => ({
    ...area,
    href: categoryCards[index]?.href || '/projects',
    number: String(index + 1).padStart(2, '0')
  }));

  const communityWork = [
    {
      organization: 'Microsoft',
      project: 'AI for Beginners',
      detail: 'Open-source pull request focused on safer learning materials.',
      href: 'https://github.com/microsoft/AI-For-Beginners/pull/638'
    },
    {
      organization: 'OpenAI',
      project: 'simple-evals',
      detail: 'Contributed a public pull request to an evaluation-focused repository.',
      href: 'https://github.com/openai/simple-evals/pull/111'
    },
    {
      organization: 'Microsoft',
      project: 'teams.py',
      detail: 'A published contribution to the Teams Python SDK.',
      href: 'https://github.com/microsoft/teams.py/pull/438'
    }
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://' + portfolio.domain;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': siteUrl + '#person',
        name: portfolio.name,
        alternateName: portfolio.handle,
        jobTitle: portfolio.role,
        url: siteUrl,
        email: portfolio.email,
        sameAs: [portfolio.github, portfolio.linkedin, portfolio.twitter, portfolio.instagram],
        alumniOf: currentStudy ? { '@type': 'CollegeOrUniversity', name: currentStudy.institution } : undefined,
        hasOccupation: {
          '@type': 'Occupation',
          name: 'AI/ML Engineer, Python Backend Developer, and Flutter Developer',
          skills: ['Machine learning', 'computer vision', 'RAG', 'Python', 'FastAPI', 'Django', 'Flutter', 'Dart']
        },
        knowsAbout: [
          'Machine learning',
          'Computer vision',
          'retrieval-augmented generation',
          'Python',
          'FastAPI',
          'Flutter',
          'AI product engineering'
        ],
        address: { '@type': 'PostalAddress', addressLocality: 'Kathmandu', addressCountry: 'NP' }
      },
      {
        '@type': 'WebSite',
        '@id': siteUrl + '#website',
        url: siteUrl,
        name: portfolio.name + ' — Portfolio',
        description: portfolio.seo.description,
        inLanguage: 'en',
        publisher: { '@id': siteUrl + '#person' }
      },
      {
        '@type': 'ProfilePage',
        '@id': siteUrl + '#profile',
        url: siteUrl,
        name: 'Aayush D. C. Dangi — AI/ML Engineer, Python Backend Developer, and Flutter Developer',
        description: portfolio.seo.description,
        inLanguage: 'en',
        isPartOf: { '@id': siteUrl + '#website' },
        mainEntity: { '@id': siteUrl + '#person' }
      }
    ]
  };

  return (
    <main className="home-v2-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <a className="home-v2-skip-link" href="#main-content">Skip to content</a>

      <header className="home-v2-nav">
        <div className="home-v2-container home-v2-nav-inner">
          <a href="#home" className="home-v2-brand" aria-label="Aayush D C Dangi — home">
            <span className="home-v2-brand-mark" aria-hidden="true">AD</span>
            <span className="home-v2-brand-copy">
              <span className="home-v2-brand-name">Aayush D C Dangi</span>
              <span className="home-v2-brand-role">AI/ML · Python · Flutter</span>
            </span>
          </a>

          <DesktopNav navItems={navItems} />

          <div className="home-v2-nav-actions">
            <a className="home-v2-resume-link" href={portfolio.resumePath} download>
              Resume <Download size={15} />
            </a>
            <ThemeToggle />
          </div>

          <MobileNav links={navItems} resumePath={portfolio.resumePath} />
        </div>
      </header>

      <div className="home-v2-main" id="main-content" tabIndex={-1}>
        <section className="home-v2-hero" id="home" aria-labelledby="home-v2-title">
          <div className="home-v2-container home-v2-hero-grid">
            <FadeIn>
              <div className="home-v2-hero-copy">
                <div className="home-v2-availability">
                  <span aria-hidden="true" />
                  Available for select engineering roles
                </div>
                <p className="home-v2-eyebrow">AI/ML Engineer · Python Backend Developer · Flutter Developer</p>
                <h1 id="home-v2-title">
                  I build AI/ML systems, Python backends, and <em>Flutter Applications.</em>
                </h1>
                <p className="home-v2-hero-lede">
                  From computer vision and RAG pipelines to FastAPI services and Flutter apps, I build the reliable layers that make AI useful to people and teams.
                </p>

                <div className="home-v2-hero-actions">
                  <a className="home-v2-button home-v2-button-primary" href="#work">
                    Explore selected work <ArrowDown size={17} />
                  </a>
                  <a className="home-v2-button home-v2-button-secondary" href={portfolio.resumePath} download>
                    Download resume <Download size={17} />
                  </a>
                </div>

                <div className="home-v2-proof-grid" aria-label="Career highlights">
                  <div className="home-v2-proof-card">
                    <span>Based in</span>
                    <strong><MapPin size={15} /> {portfolio.location}</strong>
                  </div>
                  <div className="home-v2-proof-card">
                    <span>Applied AI</span>
                    <strong>Nepal Telecom internship</strong>
                  </div>
                  <div className="home-v2-proof-card">
                    <span>Open source</span>
                    <strong>
                      {chatRepo
                        ? String(chatRepo.stargazers_count) + ' stars · ' + String(chatRepo.forks_count) + ' forks'
                        : 'Active public work'}
                    </strong>
                  </div>
                </div>

                <SocialLinks links={socialLinks} className="home-v2-socials" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <aside className="home-v2-spotlight" aria-label="Featured project">
                <div className="home-v2-spotlight-topline">
                  <span>Featured system</span>
                  <span>{spotlightRepo ? 'Updated ' + formatGithubDate(spotlightRepo.updated_at) : 'GitHub project'}</span>
                </div>

                <div className="home-v2-spotlight-body">
                  <p className="home-v2-spotlight-label">Camera input → model → operations dashboard</p>
                  <h2>AI Parking Analytics</h2>
                  <p>
                    Calibrated camera feeds become occupancy signals, FastAPI events, and a usable operations dashboard.
                  </p>
                </div>

                <dl className="home-v2-spotlight-evidence">
                  <div>
                    <dt>Input + model</dt>
                    <dd>Camera zones · YOLOv8 · OpenCV</dd>
                  </div>
                  <div>
                    <dt>Service layer</dt>
                    <dd>FastAPI · WebSockets · SQL</dd>
                  </div>
                  <div>
                    <dt>Product surface</dt>
                    <dd>React analytics dashboard</dd>
                  </div>
                </dl>

                <div className="home-v2-spotlight-actions">
                  <Link href="/projects/ai-parking-analytics" className="home-v2-inline-link">
                    Read case study <ArrowUpRight size={16} />
                  </Link>
                  <a
                    href={spotlightRepo?.html_url || 'https://github.com/dcaayushd/AI-Parking-Analytics-System'}
                    target="_blank"
                    rel="noreferrer"
                    className="home-v2-icon-link"
                    aria-label="View AI Parking Analytics repository"
                  >
                    <Github size={18} />
                  </a>
                </div>
              </aside>
            </FadeIn>
          </div>
        </section>

        <section className="home-v2-section home-v2-work" id="work" aria-labelledby="work-title">
          <div className="home-v2-container">
            <div className="home-v2-section-heading home-v2-work-heading">
              <div>
                <p className="home-v2-eyebrow">Selected work</p>
                <h2 id="work-title">Selected AI/ML, backend, and Flutter systems.</h2>
              </div>
              <div className="home-v2-section-heading-aside">
                <p>Case studies that show the technical decisions behind model delivery, APIs, and product experience.</p>
                <Link href="/projects" className="home-v2-inline-link">
                  View all projects <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {caseStudies.length ? (
              <div className="home-v2-project-grid">
                {caseStudies.map((item, index) => (
                  <FadeIn key={item.repoName} delay={index * 0.06}>
                    <article className="home-v2-project-card">
                      <div className="home-v2-project-card-topline">
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <span>{item.label}</span>
                      </div>
                      <div className="home-v2-project-card-body">
                        <h3>{item.title}</h3>
                        <p className="home-v2-project-result">{item.result}</p>
                        <p className="home-v2-project-summary">{item.summary}</p>
                      </div>
                      <ul className="home-v2-project-points">
                        {item.bullets.slice(0, 2).map((point) => <li key={point}>{point}</li>)}
                      </ul>
                      <div className="home-v2-project-card-footer">
                        <span>{item.repo ? 'Updated ' + formatGithubDate(item.repo.updated_at) : 'Open source project'}</span>
                        <div>
                          {item.detail ? (
                            <Link href={'/projects/' + item.detail.slug} className="home-v2-inline-link">
                              Case study <ArrowUpRight size={15} />
                            </Link>
                          ) : null}
                          <a
                            href={item.repo?.html_url || 'https://github.com/dcaayushd/' + item.repoName}
                            target="_blank"
                            rel="noreferrer"
                            className="home-v2-project-repo"
                            aria-label={'Open ' + item.title + ' on GitHub'}
                          >
                            <Github size={17} />
                          </a>
                        </div>
                      </div>
                    </article>
                  </FadeIn>
                ))}
              </div>
            ) : (
              <div className="home-v2-empty-state">Projects will reappear as soon as GitHub data is available.</div>
            )}
          </div>
        </section>

        <section className="home-v2-section home-v2-github" id="github" aria-labelledby="github-title">
          <div className="home-v2-container">
            <div className="home-v2-section-heading home-v2-github-heading">
              <div>
                <p className="home-v2-eyebrow">GitHub activity</p>
                <h2 id="github-title">Open-source work and current engineering activity.</h2>
              </div>
              <p>Recent repositories, curated for technical relevance and refreshed from GitHub.</p>
            </div>
            <div className="home-v2-github-feed">
              <LiveGithubProjects fallbackProjects={showcaseRepos} />
            </div>
            <div className="home-v2-contributions" aria-label="Open source contributions">
              <p className="home-v2-contributions-label">Selected public contributions</p>
              <div className="home-v2-contributions-list">
                {communityWork.map((item) => (
                  <a href={item.href} target="_blank" rel="noreferrer" className="home-v2-contribution" key={item.project}>
                    <span>{item.organization}</span>
                    <strong>{item.project}</strong>
                    <p>{item.detail}</p>
                    <ArrowUpRight size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="home-v2-section home-v2-capabilities" id="practice" aria-labelledby="capabilities-title">
          <div className="home-v2-container">
            <div className="home-v2-capabilities-intro">
              <div>
                <p className="home-v2-eyebrow">Capabilities</p>
                <h2 id="capabilities-title">AI/ML, Python backend, and Flutter—one product stack.</h2>
              </div>
              <p>I connect model development, FastAPI and Django services, and Flutter interfaces into dependable end-to-end products.</p>
            </div>

            <div className="home-v2-capability-grid">
              {practiceLinks.map((area, index) => (
                <FadeIn delay={0.06 + index * 0.07} key={area.title}>
                  <a href={area.href} className="home-v2-capability-card">
                    <span className="home-v2-capability-number">{area.number}</span>
                    <div>
                      <h3>{area.title}</h3>
                      <p>{area.description}</p>
                    </div>
                    <ArrowUpRight size={20} />
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="home-v2-section home-v2-experience" id="experience" aria-labelledby="experience-title">
          <div className="home-v2-container">
            <div className="home-v2-section-heading">
              <div>
                <p className="home-v2-eyebrow">Experience</p>
                <h2 id="experience-title">Applied AI and product engineering experience.</h2>
              </div>
              <p>Hands-on AI and Flutter work, informed by computer science study and publicly visible engineering practice.</p>
            </div>

            <div className="home-v2-experience-grid">
              <FadeIn>
                <article className="home-v2-experience-column">
                  <div className="home-v2-experience-column-heading">
                    <span>01</span>
                    <h3>Professional work</h3>
                  </div>
                  <div className="home-v2-timeline">
                    {orderedExperience.map((role) => (
                      <article className="home-v2-timeline-item" key={role.company + role.title}>
                        <div className="home-v2-timeline-meta">
                          <span>{role.period}</span>
                          <span>{role.state}</span>
                        </div>
                        <h4>{role.title}</h4>
                        <strong>{role.company}</strong>
                        <p>{role.description}</p>
                      </article>
                    ))}
                  </div>
                </article>
              </FadeIn>

              <FadeIn delay={0.1}>
                <article className="home-v2-experience-column home-v2-education-column">
                  <div className="home-v2-experience-column-heading">
                    <span>02</span>
                    <h3>Education</h3>
                  </div>
                  <div className="home-v2-timeline">
                    {profileSnapshot.education.map((study) => (
                      <article className="home-v2-timeline-item" key={study.institution + study.degree}>
                        <div className="home-v2-timeline-meta">
                          <span>{study.period}</span>
                          <span>{study.state}</span>
                        </div>
                        <h4>{study.degree}</h4>
                        <strong>{study.institution}</strong>
                        <p>{study.description}</p>
                      </article>
                    ))}
                  </div>
                </article>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="home-v2-contact" id="contact" aria-labelledby="contact-title">
          <div className="home-v2-container home-v2-contact-grid">
            <FadeIn>
              <div className="home-v2-contact-copy">
                <p className="home-v2-eyebrow">Let’s work together</p>
                <h2 id="contact-title">Need an AI product, backend service, or Flutter app built well?</h2>
                <p>{portfolio.availability}. Tell me what you are building, where it is getting difficult, and what success needs to look like.</p>
                <a className="home-v2-contact-email" href={'mailto:' + portfolio.email}>
                  {portfolio.email} <ArrowUpRight size={18} />
                </a>
                <SocialLinks links={socialLinks} className="home-v2-contact-socials" />
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="home-v2-contact-form">
                <p className="home-v2-contact-form-label">Start a conversation</p>
                <h3>Tell me about the work.</h3>
                <ContactForm email={portfolio.email} />
              </div>
            </FadeIn>
          </div>
        </section>
      </div>

      <footer className="home-v2-footer">
        <div className="home-v2-container home-v2-footer-inner">
          <span>© {new Date().getFullYear()} {portfolio.name}</span>
          <span>AI/ML · Python · Flutter</span>
          <a href="#home">Back to top <ArrowUpRight size={14} /></a>
        </div>
      </footer>
    </main>
  );
}
