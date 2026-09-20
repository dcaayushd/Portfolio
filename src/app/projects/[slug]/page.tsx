import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Download, Github } from 'lucide-react';
import { DesktopNav } from '@/components/desktop-nav';
import { MobileNav } from '@/components/mobile-nav';
import { FadeIn } from '@/components/motion';
import { ThemeToggle } from '@/components/theme-toggle';
import { caseStudies, getCaseStudyBySlug } from '@/data/case-studies';
import { portfolio } from '@/data/portfolio';
import { getGithubRepos } from '@/lib/github';
import { formatGithubDate } from '@/lib/utils';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = await params;
  const study = getCaseStudyBySlug(resolved.slug);

  if (!study) {
    return {};
  }

  const title = study.title + ' Case Study';

  return {
    title,
    description: study.metaDescription,
    alternates: { canonical: '/projects/' + study.slug },
    openGraph: {
      title: title + ' | ' + portfolio.name,
      description: study.metaDescription,
      url: '/projects/' + study.slug,
      type: 'article',
      images: [
        {
          url: '/opengraph-image',
          width: 1200,
          height: 630,
          alt: portfolio.name + ' — ' + study.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: title + ' | ' + portfolio.name,
      description: study.metaDescription,
      images: ['/opengraph-image']
    }
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const resolved = await params;
  const study = getCaseStudyBySlug(resolved.slug);

  if (!study) {
    notFound();
  }

  const username = process.env.GITHUB_USERNAME || portfolio.handle;
  const repos = await getGithubRepos(username);
  const repo = repos.find((item) => item.name === study.repoName);
  const repoUrl = repo?.html_url || 'https://github.com/' + username + '/' + study.repoName;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://' + portfolio.domain;
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '#challenge', label: 'Context' },
    { href: '#system', label: 'System' },
    { href: '#approach', label: 'Decisions' },
    { href: '/#contact', label: 'Contact' }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': siteUrl + '/projects/' + study.slug + '#source',
    name: study.title,
    description: study.metaDescription,
    url: siteUrl + '/projects/' + study.slug,
    isPartOf: { '@id': siteUrl + '#website' },
    codeRepository: repoUrl,
    programmingLanguage: study.stack,
    author: { '@id': siteUrl + '#person' },
    dateModified: repo?.updated_at
  };

  return (
    <main className="site-shell case-study-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <a className="skip-link" href="#main-content">Skip to content</a>

      <header className="nav">
        <div className="container nav-inner">
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

      <section className="case-study-hero">
        <div className="container case-study-hero-layout">
          <FadeIn>
            <div className="case-study-hero-copy">
              <Link href="/projects" className="back-link">
                <ArrowLeft size={16} /> All projects
              </Link>
              <span className="eyebrow">{study.label}</span>
              <h1>{study.title}</h1>
              <p className="case-study-lede">{study.summary}</p>
              <p className="case-study-role"><strong>Scope:</strong> {study.role}</p>
              <div className="hero-actions">
                <a className="button button-primary" href={repoUrl} target="_blank" rel="noreferrer">
                  <Github size={18} /> View source
                </a>
                <a className="button button-secondary" href="#approach">
                  Read the approach <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <aside className="case-study-facts" aria-label="Project details">
              <div>
                <span>Repository</span>
                <strong>{study.repoName.replace(/[-_]+/g, ' ')}</strong>
              </div>
              <div>
                <span>Primary language</span>
                <strong>{repo?.language || study.stack[0]}</strong>
              </div>
              <div>
                <span>Last updated</span>
                <strong>{repo ? formatGithubDate(repo.updated_at) : 'Verified project snapshot'}</strong>
              </div>
              {repo ? (
                <div>
                  <span>GitHub snapshot</span>
                  <strong>{repo.stargazers_count} stars · {repo.forks_count} forks</strong>
                </div>
              ) : null}
              <a href={repoUrl} target="_blank" rel="noreferrer">
                Open repository <ArrowUpRight size={16} />
              </a>
            </aside>
          </FadeIn>
        </div>
      </section>

      <section className="section case-study-content-section" id="main-content" tabIndex={-1}>
        <div className="container case-study-content-grid">
          <FadeIn>
            <div className="case-study-sticky-label" id="challenge">
              <span className="eyebrow">The problem</span>
              <h2>What had to work beyond the model.</h2>
            </div>
          </FadeIn>

          <div className="case-study-detail-flow">
            <FadeIn delay={0.06}>
              <article className="case-study-prose">
                <p>{study.challenge}</p>
              </article>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="case-study-evidence-grid" aria-label="Evidence of technical scope">
                {study.evidence.map((item) => (
                  <article key={item.label}>
                    <span>{item.label}</span>
                    <p>{item.detail}</p>
                  </article>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.14}>
              <article className="case-study-system" id="system">
                <span className="eyebrow">System at a glance</span>
                <h2>How the pieces connect.</h2>
                <ol>
                  {study.systemMap.map((item, index) => (
                    <li key={item.label}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <strong>{item.label}</strong>
                      <p>{item.detail}</p>
                    </li>
                  ))}
                </ol>
              </article>
            </FadeIn>

            <FadeIn delay={0.18}>
              <article className="case-study-approach" id="approach">
                <span className="eyebrow">Key engineering decisions</span>
                <h2>Choices that make the system usable.</h2>
                <ol>
                  {study.buildNotes.map((note, index) => (
                    <li key={note}>
                      <span>0{index + 1}</span>
                      <p>{note}</p>
                    </li>
                  ))}
                </ol>
              </article>
            </FadeIn>

            <FadeIn delay={0.22}>
              <div className="case-study-delivery-grid">
                <article className="case-study-verification">
                  <span className="eyebrow">Verification path</span>
                  <h2>How the work can be inspected.</h2>
                  <ul>
                    {study.verification.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
                <article className="case-study-boundary">
                  <span className="eyebrow">Current boundary</span>
                  <p>{study.currentBoundary}</p>
                </article>
              </div>
            </FadeIn>

            <FadeIn delay={0.26}>
              <article className="case-study-stack">
                <span className="eyebrow">Technical stack</span>
                <div className="case-study-stack-list">
                  {study.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
              </article>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="case-study-next">
        <div className="container case-study-next-inner">
          <div>
            <span className="eyebrow">Want to discuss a similar system?</span>
            <h2>Let’s make the hard part usable.</h2>
          </div>
          <Link className="button button-primary" href="/#contact">
            Start a conversation <ArrowUpRight size={17} />
          </Link>
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
