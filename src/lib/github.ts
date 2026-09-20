const GITHUB_API = 'https://api.github.com';
import { toPublicGithubRepo, type GithubRepo } from '@/lib/github-repo';

export type { GithubRepo } from '@/lib/github-repo';

// A verified public-project snapshot keeps the static export useful whenever
// GitHub is unavailable during a deployment. Live GitHub data remains the
// primary source and replaces this list whenever the API responds.
const FALLBACK_REPOS: GithubRepo[] = [
  {
    id: 1201,
    name: 'AI-Voice-Cloning-System',
    html_url: 'https://github.com/dcaayushd/AI-Voice-Cloning-System',
    description: 'Platform for consented voice enrollment, synthesis, real-time streaming, voice conversion, quality evaluation, and agent-driven workflow orchestration.',
    homepage: null,
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    topics: ['fastapi', 'websockets', 'celery', 'pgvector', 'voice-ai'],
    updated_at: '2026-06-02T11:04:21Z',
    pushed_at: '2026-06-02T11:04:21Z',
    archived: false,
    fork: false
  },
  {
    id: 1202,
    name: 'AI-Parking-Analytics-System',
    html_url: 'https://github.com/dcaayushd/AI-Parking-Analytics-System',
    description: 'Computer-vision parking operations platform with FastAPI, OpenCV, YOLOv8-compatible detection, analytics APIs, WebSockets, SQL-ready storage, and a React dashboard.',
    homepage: null,
    language: 'Python',
    stargazers_count: 1,
    forks_count: 0,
    topics: ['fastapi', 'opencv', 'python', 'yolov8'],
    updated_at: '2026-05-28T16:20:41Z',
    pushed_at: '2026-05-28T16:20:41Z',
    archived: false,
    fork: false
  },
  {
    id: 1203,
    name: 'Self-Healing-RAG',
    html_url: 'https://github.com/dcaayushd/Self-Healing-RAG',
    description: 'A retrieval-augmented generation system with evaluation and recovery-oriented workflows.',
    homepage: null,
    language: 'Python',
    stargazers_count: 3,
    forks_count: 0,
    topics: ['chroma', 'fastapi', 'langgraph', 'ollama', 'streamlit', 'typer'],
    updated_at: '2026-05-12T14:53:47Z',
    pushed_at: '2026-05-12T14:53:47Z',
    archived: false,
    fork: false
  },
  {
    id: 1204,
    name: 'CUSTOMER_COMPLAINT_CLASSIFICATION',
    html_url: 'https://github.com/dcaayushd/CUSTOMER_COMPLAINT_CLASSIFICATION',
    description: 'Hybrid RAG system for complaint classification.',
    homepage: null,
    language: 'Python',
    stargazers_count: 2,
    forks_count: 0,
    topics: ['docker-compose', 'faiss', 'ollama', 'streamlit', 'tf-idf'],
    updated_at: '2026-04-25T18:17:27Z',
    pushed_at: '2026-04-25T18:17:27Z',
    archived: false,
    fork: false
  },
  {
    id: 1205,
    name: 'Customer_Churn_Prediction',
    html_url: 'https://github.com/dcaayushd/Customer_Churn_Prediction',
    description: 'Churn prediction system covering data ingestion, feature engineering, explainability, retention recommendations, FastAPI serving, analytics, monitoring, and automation.',
    homepage: null,
    language: 'Python',
    stargazers_count: 3,
    forks_count: 1,
    topics: ['churn-prediction', 'docker', 'fastapi', 'lightgbm', 'python', 'scikit-learn', 'xgboost'],
    updated_at: '2026-04-21T14:28:07Z',
    pushed_at: '2026-04-21T14:28:07Z',
    archived: false,
    fork: false
  },
  {
    id: 1206,
    name: 'Zinemo',
    html_url: 'https://github.com/dcaayushd/Zinemo',
    description: 'Full-stack movie and TV logging platform with personalized recommendations.',
    homepage: null,
    language: 'Dart',
    stargazers_count: 4,
    forks_count: 0,
    topics: ['fastapi', 'flutter', 'movie-recommendation-app', 'postgresql', 'supabase'],
    updated_at: '2026-04-18T13:29:45Z',
    pushed_at: '2026-04-18T13:29:45Z',
    archived: false,
    fork: false
  },
  {
    id: 1207,
    name: 'Subscriptional',
    html_url: 'https://github.com/dcaayushd/Subscriptional',
    description: 'Full-stack subscription tracker with renewal reminders and spending trends, built with Flutter, Node.js, and PostgreSQL.',
    homepage: null,
    language: 'Dart',
    stargazers_count: 2,
    forks_count: 0,
    topics: ['docker', 'express', 'flutter', 'nodejs', 'postgresql', 'riverpod'],
    updated_at: '2026-04-07T17:16:30Z',
    pushed_at: '2026-04-07T17:16:30Z',
    archived: false,
    fork: false
  },
  {
    id: 1208,
    name: 'Facial-Emotion-Recognition-system',
    html_url: 'https://github.com/dcaayushd/Facial-Emotion-Recognition-system',
    description: 'Full-stack facial recognition and emotion analysis SaaS built with Next.js, FastAPI, MTCNN, FaceNet, and Supabase.',
    homepage: null,
    language: 'Python',
    stargazers_count: 3,
    forks_count: 0,
    topics: ['computer-vision', 'face-detection', 'facenet', 'fastapi', 'mtcnn', 'nextjs', 'supabase'],
    updated_at: '2026-03-29T13:12:41Z',
    pushed_at: '2026-03-29T13:12:41Z',
    archived: false,
    fork: false
  },
  {
    id: 1209,
    name: 'AI-PR-Review-Bot',
    html_url: 'https://github.com/dcaayushd/AI-PR-Review-Bot',
    description: 'AI-powered GitHub App that reviews pull requests, posts structured feedback, leaves inline comments, and manages check runs with OpenAI or Gemini.',
    homepage: null,
    language: 'Python',
    stargazers_count: 2,
    forks_count: 0,
    topics: ['ai', 'automation', 'code-review', 'devops', 'fastapi', 'github-app', 'llm'],
    updated_at: '2026-03-25T14:54:00Z',
    pushed_at: '2026-03-25T14:54:00Z',
    archived: false,
    fork: false
  },
  {
    id: 1210,
    name: 'Documentify',
    html_url: 'https://github.com/dcaayushd/Documentify',
    description: 'AI platform for analyzing large documents using RAG, built with Flutter, FastAPI, and open-source LLM tooling.',
    homepage: null,
    language: 'Dart',
    stargazers_count: 3,
    forks_count: 0,
    topics: ['chromadb', 'fastapi', 'llm', 'ollama', 'python', 'sentence-transformers'],
    updated_at: '2026-03-24T12:24:04Z',
    pushed_at: '2026-03-24T12:24:04Z',
    archived: false,
    fork: false
  },
  {
    id: 1211,
    name: 'AI-Chat-Bot-Flutter',
    html_url: 'https://github.com/dcaayushd/AI-Chat-Bot-Flutter',
    description: 'Flutter application with a conversational interface for Gemini.',
    homepage: null,
    language: 'Dart',
    stargazers_count: 87,
    forks_count: 17,
    topics: ['flutter', 'gemini', 'hive'],
    updated_at: '2026-03-19T12:07:12Z',
    pushed_at: '2026-03-19T12:07:12Z',
    archived: false,
    fork: false
  }
];

async function fetchFromGitHub<T>(path: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: 'application/vnd.github+json'
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${GITHUB_API}${path}`, {
    next: { revalidate: 3600 },
    headers
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return response.json();
}

export async function getGithubRepos(username: string) {
  try {
    const response = await fetchFromGitHub<unknown>(`/users/${username}/repos?sort=updated&per_page=100`);

    if (!Array.isArray(response)) {
      throw new Error('GitHub API returned an unexpected repository response');
    }

    const repos = response
      .map(toPublicGithubRepo)
      .filter((repo): repo is GithubRepo => Boolean(repo));

    return repos
      .filter((repo) => !repo.archived && !repo.fork)
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      );
  } catch {
    return FALLBACK_REPOS;
  }
}
