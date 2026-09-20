import { portfolio } from '@/data/portfolio';
import type { GithubRepo } from '@/lib/github-repo';

export type ProjectCategory = 'AI/ML & Vision' | 'Backend & APIs' | 'Flutter Apps';

const CATEGORY_ORDER: ProjectCategory[] = ['AI/ML & Vision', 'Backend & APIs', 'Flutter Apps'];
const SHOWCASE_REPO_EXCLUDES = [
  'portfolio',
  'github profile',
  'profile readme',
  'personal website',
  'personal site',
  'resume site',
  'dotfiles',
  'config files'
];

const AI_ML_SIGNALS = [
  'ai',
  'ml',
  'machine learning',
  'deep learning',
  'neural',
  'pytorch',
  'tensorflow',
  'cnn',
  'opencv',
  'vision',
  'computer vision',
  'facial',
  'face',
  'emotion',
  'image',
  'recognition',
  'classifier',
  'classification',
  'detection',
  'inference',
  'rag',
  'embedding',
  'vector',
  'llm',
  'lora',
  'fine-tun',
  'transformer',
  'chatbot',
  'gemini',
  'openai',
  'langchain',
  'prompt',
  'document analysis',
  'q&a'
];

const BACKEND_SIGNALS = [
  'backend',
  'fastapi',
  'flask',
  'django',
  'drf',
  'api',
  'rest',
  'graphql',
  'server',
  'auth',
  'authentication',
  'jwt',
  'database',
  'postgres',
  'postgresql',
  'redis',
  'celery',
  'async',
  'service',
  'microservice',
  'deployment',
  'docker',
  'webhook',
  'cache',
  'orm'
];

const FLUTTER_SIGNALS = [
  'flutter',
  'dart',
  'mobile',
  'android',
  'ios',
  'firebase',
  'hive',
  'bloc',
  'riverpod',
  'provider',
  'responsive ui',
  'app architecture',
  'state management',
  'chat ui',
  'mobile ui'
];

const CATEGORY_META: Record<ProjectCategory, { description: string; id: string }> = {
  'AI/ML & Vision': {
    description: 'Computer vision, model training, inference workflows, and AI-backed product features.',
    id: 'category-ai-ml-vision'
  },
  'Backend & APIs': {
    description: 'Service design, auth, async work, and backend delivery built to be dependable.',
    id: 'category-backend-apis'
  },
  'Flutter Apps': {
    description: 'Mobile apps with clean UX, responsive states, and polished interaction details.',
    id: 'category-flutter-apps'
  }
};

const PROJECT_CATEGORY_OVERRIDES = portfolio.projectCategoryOverrides as Record<string, ProjectCategory>;
const PROJECT_PRIORITIES = portfolio.projectPriorities as Record<string, number>;

export function formatProjectName(name: string) {
  return name.replace(/[-_]+/g, ' ');
}

function hasAny(text: string, values: string[]) {
  return values.some((value) => matchesSignal(text, value));
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchesSignal(text: string, value: string) {
  const normalized = value.toLowerCase();

  if (/^[a-z0-9]{1,3}$/.test(normalized)) {
    return new RegExp(`(^|[^a-z0-9])${escapeRegex(normalized)}([^a-z0-9]|$)`, 'i').test(text);
  }

  const pattern = escapeRegex(normalized).replace(/\\ /g, '[\\s-_]+');
  return new RegExp(pattern, 'i').test(text);
}

function countMatches(text: string, values: string[], weight: number) {
  return values.reduce((score, value) => (matchesSignal(text, value) ? score + weight : score), 0);
}

function buildRepoText(repo: GithubRepo) {
  return [
    repo.name,
    repo.description || '',
    repo.language || '',
    ...(repo.topics || [])
  ]
    .join(' ')
    .toLowerCase();
}

function isShowcaseRepo(repo: GithubRepo) {
  const name = repo.name.toLowerCase();
  const text = buildRepoText(repo);

  if (repo.fork || name === 'dcaayushd' || name.includes('portfolio')) {
    return false;
  }

  return !hasAny(text, SHOWCASE_REPO_EXCLUDES);
}

function scoreProjectCategory(repo: GithubRepo, category: ProjectCategory) {
  const name = repo.name.toLowerCase();
  const description = (repo.description || '').toLowerCase();
  const topics = (repo.topics || []).join(' ').toLowerCase();
  const language = (repo.language || '').toLowerCase();

  if (category === 'Flutter Apps') {
    let score = 0;
    if (language === 'dart') score += 10;
    score += countMatches(name, FLUTTER_SIGNALS, 3);
    score += countMatches(description, FLUTTER_SIGNALS, 2);
    score += countMatches(topics, FLUTTER_SIGNALS, 4);
    return score;
  }

  if (category === 'AI/ML & Vision') {
    let score = 0;
    if (language === 'jupyter notebook') score += 9;
    if (language === 'python') score += 3;
    score += countMatches(name, AI_ML_SIGNALS, 3);
    score += countMatches(description, AI_ML_SIGNALS, 2);
    score += countMatches(topics, AI_ML_SIGNALS, 4);
    return score;
  }

  let score = 0;
  if (language === 'python') score += 4;
  if (language === 'typescript' || language === 'javascript') score += 1;
  score += countMatches(name, BACKEND_SIGNALS, 3);
  score += countMatches(description, BACKEND_SIGNALS, 2);
  score += countMatches(topics, BACKEND_SIGNALS, 4);
  return score;
}

export function inferProjectCategory(repo: GithubRepo): ProjectCategory {
  const override = PROJECT_CATEGORY_OVERRIDES[repo.name];

  if (override) {
    return override;
  }

  const scores = CATEGORY_ORDER.map((category) => ({
    category,
    score: scoreProjectCategory(repo, category)
  }));
  const winner = scores.reduce((best, current) => (current.score > best.score ? current : best), scores[0]);

  if (winner.score > 0) {
    return winner.category;
  }

  if (repo.language === 'Dart') return 'Flutter Apps';
  if (repo.language === 'Python') return 'Backend & APIs';
  return 'AI/ML & Vision';
}

function getProjectPriority(repo: GithubRepo) {
  return PROJECT_PRIORITIES[repo.name] || 0;
}

function sortReposForDisplay(repos: GithubRepo[]) {
  return [...repos].sort((a, b) => {
    const priorityGap = getProjectPriority(b) - getProjectPriority(a);

    if (priorityGap !== 0) {
      return priorityGap;
    }

    if (Boolean(b.homepage) !== Boolean(a.homepage)) {
      return Number(Boolean(b.homepage)) - Number(Boolean(a.homepage));
    }

    if (b.stargazers_count !== a.stargazers_count) {
      return b.stargazers_count - a.stargazers_count;
    }

    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  });
}

export function getShowcaseRepos(repos: GithubRepo[]) {
  return sortReposForDisplay(repos.filter((repo) => isShowcaseRepo(repo)));
}

export function getProjectCategoryMeta(category: ProjectCategory) {
  return CATEGORY_META[category];
}

export function buildProjectCategories(repos: GithubRepo[]) {
  const showcaseRepos = getShowcaseRepos(repos);

  return CATEGORY_ORDER.map((category) => {
    const grouped = sortReposForDisplay(showcaseRepos.filter((repo) => inferProjectCategory(repo) === category));
    const spotlight = grouped.slice(0, 2).map((repo) => formatProjectName(repo.name)).join(' · ');

    return {
      title: category,
      id: CATEGORY_META[category].id,
      href: `/projects#${CATEGORY_META[category].id}`,
      description: CATEGORY_META[category].description,
      count: grouped.length,
      latest: grouped[0] ? formatProjectName(grouped[0].name) : 'Updating from GitHub',
      spotlight: spotlight || 'Projects update from GitHub'
    };
  });
}

export function buildProjectCategorySections(repos: GithubRepo[]) {
  const showcaseRepos = getShowcaseRepos(repos);

  return CATEGORY_ORDER.map((category) => {
    const grouped = sortReposForDisplay(showcaseRepos.filter((repo) => inferProjectCategory(repo) === category));

    return {
      title: category,
      id: CATEGORY_META[category].id,
      description: CATEGORY_META[category].description,
      repos: grouped
    };
  });
}

export function getLiveDemoRepos(repos: GithubRepo[]) {
  return sortReposForDisplay(getShowcaseRepos(repos).filter((repo) => Boolean(repo.homepage && repo.homepage.trim())));
}
