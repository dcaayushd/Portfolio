export type GithubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  fork: boolean;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asText(value: unknown, limit: number): string | null {
  if (typeof value !== 'string') return null;

  const text = value.trim();
  return text ? text.slice(0, limit) : null;
}

function asCount(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value)
    ? Math.max(0, Math.floor(value))
    : 0;
}

function asTopics(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((topic) => asText(topic, 80))
    .filter((topic): topic is string => Boolean(topic))
    .slice(0, 20);
}

/** Accept only absolute HTTPS links before rendering external GitHub metadata. */
export function toSafeHttpsUrl(value: unknown): string | null {
  const text = asText(value, 2048);
  if (!text) return null;

  try {
    const url = new URL(text);
    return url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

/**
 * GitHub returns many fields beyond the portfolio's display needs. Explicitly
 * pick public fields so authenticated API responses never become build output.
 */
export function toPublicGithubRepo(value: unknown): GithubRepo | null {
  const repo = asRecord(value);
  if (!repo) return null;

  const id = repo.id;
  const name = asText(repo.name, 160);
  const htmlUrl = toSafeHttpsUrl(repo.html_url);
  const updatedAt = asText(repo.updated_at, 64);
  const pushedAt = asText(repo.pushed_at, 64);

  if (!Number.isSafeInteger(id) || id < 0 || !name || !htmlUrl || !updatedAt || !pushedAt) {
    return null;
  }

  return {
    id,
    name,
    html_url: htmlUrl,
    description: asText(repo.description, 1200),
    homepage: toSafeHttpsUrl(repo.homepage),
    language: asText(repo.language, 100),
    stargazers_count: asCount(repo.stargazers_count),
    forks_count: asCount(repo.forks_count),
    topics: asTopics(repo.topics),
    fork: repo.fork === true,
    updated_at: updatedAt,
    pushed_at: pushedAt,
    archived: repo.archived === true
  };
}
