const GITHUB_API = 'https://api.github.com';

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
  updated_at: string;
  pushed_at: string;
  archived: boolean;
};

async function fetchFromGitHub<T>(path: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${GITHUB_API}${path}`, {
    cache: 'force-cache',
    headers
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

export async function getGithubRepos(username: string) {
  const repos = await fetchFromGitHub<GithubRepo[]>(`/users/${username}/repos?sort=updated&per_page=100`);

  return repos
    .filter((repo) => !repo.archived)
    .sort(
      (a, b) =>
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
    );
}
