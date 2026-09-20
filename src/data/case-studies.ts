export type CaseStudy = {
  slug: string;
  repoName: string;
  label: string;
  title: string;
  summary: string;
  metaDescription: string;
  role: string;
  challenge: string;
  stack: string[];
  systemMap: Array<{ label: string; detail: string }>;
  evidence: Array<{ label: string; detail: string }>;
  buildNotes: string[];
  verification: string[];
  currentBoundary: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'voice-cloning-platform',
    repoName: 'AI-Voice-Cloning-System',
    label: 'Applied AI platform',
    title: 'Consent-first Voice Cloning Platform',
    summary:
      'A multi-tenant platform for consented voice enrollment, synthesis, streaming, conversion, quality evaluation, and workflow orchestration.',
    metaDescription:
      'Case study: a consent-first voice AI platform built with FastAPI, WebSockets, Celery, pgvector, and production-minded observability.',
    role: 'System design · Python backend · ML workflow integration',
    challenge:
      'Voice AI is more than generation quality. The product needs consent controls, streaming delivery, background processing, observable infrastructure, and a path for evaluation.',
    stack: ['Python', 'FastAPI', 'WebSockets', 'Celery', 'Redis', 'PostgreSQL + pgvector', 'MinIO', 'React / Vite', 'Prometheus', 'Jaeger'],
    systemMap: [
      { label: 'Client surface', detail: 'A React/Vite client guides enrollment, consent-aware actions, and the operational interface.' },
      { label: 'API boundary', detail: 'FastAPI exposes HTTP endpoints for request/response work and WebSockets for streamed synthesis events.' },
      { label: 'Async processing', detail: 'Celery and Redis keep long-running enrollment, synthesis, and evaluation work out of the request path.' },
      { label: 'State + observability', detail: 'PostgreSQL/pgvector, object storage, a model registry, logs, metrics, and traces support the service boundary.' }
    ],
    evidence: [
      { label: 'Consent', detail: 'Enrollment flow includes consent enforcement, liveness, and anti-spoofing concerns.' },
      { label: 'Delivery', detail: 'Real-time synthesis is designed around WebSocket streaming alongside REST APIs.' },
      { label: 'Operations', detail: 'The repository includes background jobs, structured logging, metrics, tracing, and deployment configuration.' }
    ],
    buildNotes: [
      'Separated routes, service logic, data access, ML integrations, and worker tasks so the system can evolve without becoming a single inference script.',
      'Reserved WebSockets for streamed synthesis while long-running enrollment and evaluation work moves through background workers.',
      'Made consent tokens, rate limiting, audit logging, liveness, and anti-spoofing concerns explicit at the enrollment boundary.',
      'Treated quality evaluation and observability as product requirements, with a documented container, migration, health-check, and tracing path.'
    ],
    verification: [
      'Health endpoints, migration commands, and container configuration make the local service topology inspectable.',
      'Structured logs, metrics, and tracing hooks are included so failure modes can be investigated rather than guessed at.',
      'The repository documents separate worker and API responsibilities, which makes asynchronous behavior visible in review.'
    ],
    currentBoundary: 'The repository describes a production-minded path, but this case study does not claim measured voice quality, uptime, or a customer deployment.'
  },
  {
    slug: 'ai-parking-analytics',
    repoName: 'AI-Parking-Analytics-System',
    label: 'Computer vision system',
    title: 'AI Parking Analytics System',
    summary:
      'A computer-vision operations platform that turns calibrated parking footage into occupancy signals, live events, analytics APIs, and a dashboard.',
    metaDescription:
      'Case study: AI Parking Analytics System, a computer vision product using Python, FastAPI, OpenCV, YOLOv8-compatible detection, WebSockets, and React.',
    role: 'Computer vision pipeline · API design · Product integration',
    challenge:
      'A detector alone does not make a useful parking product. It needs calibrated spaces, state interpretation, event delivery, storage, and a clear surface for operations teams.',
    stack: ['Python', 'FastAPI', 'OpenCV', 'YOLOv8-compatible detection', 'WebSockets', 'SQL storage', 'React'],
    systemMap: [
      { label: 'Camera input', detail: 'Media or camera frames enter a vision path that can use YOLOv8-compatible detection with an OpenCV fallback.' },
      { label: 'Space semantics', detail: 'Calibrated slot polygons convert vehicle detections into the state of specific parking spaces.' },
      { label: 'State + events', detail: 'Hysteresis and debounce guard state transitions before auditable occupancy events are emitted.' },
      { label: 'Operations surface', detail: 'FastAPI, WebSocket delivery, storage boundaries, and a dashboard turn detection into usable operational context.' }
    ],
    evidence: [
      { label: 'Vision', detail: 'Uses parking-slot polygons and object detection to reason about occupancy.' },
      { label: 'Realtime', detail: 'Includes WebSocket-oriented delivery for current events and changing state.' },
      { label: 'Product', detail: 'Pairs the vision pipeline with analytics APIs, storage, and a React dashboard.' }
    ],
    buildNotes: [
      'Made calibration a first-class part of the workflow because the product needs to understand individual spaces, not merely detect cars.',
      'Used a six-state vocabulary—free, occupied, unknown, blocked, reserved, and maintenance—so weak evidence does not silently become a false occupancy claim.',
      'Connected inference to APIs and live events only after state stabilization, so raw detections can become operational signals.',
      'Kept the platform boundary clear: vision, service layer, data storage, and dashboard each have a distinct job.'
    ],
    verification: [
      'The local PKLot setup defines 100 calibrated parking spaces for repeatable development and inspection.',
      'The dashboard is designed to refresh current data every three seconds while WebSockets carry changing state.',
      'The explicit unknown state preserves uncertainty when camera evidence is not strong enough to classify a space.'
    ],
    currentBoundary: 'The live runtime state is currently local and in-memory. SQL migrations exist, while durable workers, RBAC, and object-store retention remain deployment work rather than claimed production features.'
  },
  {
    slug: 'customer-churn-prediction',
    repoName: 'Customer_Churn_Prediction',
    label: 'ML operations system',
    title: 'Customer Churn Prediction',
    summary:
      'An end-to-end churn analytics system that connects data ingestion, feature engineering, model training, explainability, retention actions, serving, and monitoring.',
    metaDescription:
      'Case study: Customer Churn Prediction, an end-to-end ML system with FastAPI serving, model explainability, monitoring, Docker, and Streamlit analytics.',
    role: 'ML system architecture · Backend serving · Analytics workflow',
    challenge:
      'A churn score has limited value in isolation. The useful work is turning it into a repeatable workflow with inputs, explanations, recommendations, delivery, and checks over time.',
    stack: ['Python', 'FastAPI', 'LightGBM', 'XGBoost', 'scikit-learn', 'Streamlit', 'Docker', 'SQLite'],
    systemMap: [
      { label: 'Data inputs', detail: 'Customer, activity, transaction, and support data move through ingestion and feature-engineering stages.' },
      { label: 'Model candidates', detail: 'The workflow supports baseline and boosted classifiers, then resolves an active model through a registry pattern.' },
      { label: 'Decision service', detail: 'FastAPI exposes scoring, explanation, and retention-recommendation endpoints for downstream use.' },
      { label: 'Command center', detail: 'A Streamlit surface and monitoring reports make model behavior, data quality, and retention actions inspectable.' }
    ],
    evidence: [
      { label: 'Workflow', detail: 'Covers ingestion, feature engineering, model training, scoring, and retention recommendations.' },
      { label: 'Decision support', detail: 'Includes explanations and an analytics surface rather than exposing only a raw probability.' },
      { label: 'Operations', detail: 'Repository documents monitoring, batch entry points, tests, containers, and CI.' }
    ],
    buildNotes: [
      'Designed a model registry pattern so the API and dashboard can resolve an active model source instead of relying on a hard-coded artifact.',
      'Included both a synthetic demo path and a Kaggle Cell2Cell workflow so the system can be inspected without pretending one dataset fits every use case.',
      'Made per-customer explanations and treatment/control assignment visible rather than exposing an unexplained probability.',
      'Made monitoring and retention logic visible parts of the architecture, not hidden implementation details.'
    ],
    verification: [
      'The repository documents batch entry points, tests, containers, and CI alongside interactive analytics.',
      'Monitoring reports are designed to surface drift, missingness, classification quality, and calibration through Brier score.',
      'The service separates score, explain, and recommend actions so reviewers can inspect the decision path.'
    ],
    currentBoundary: 'This is an end-to-end engineering system, not a claim of a deployed churn program. No accuracy, retention lift, or A/B-test outcome is asserted without an evaluation report.'
  },
  {
    slug: 'ai-chat-bot-flutter',
    repoName: 'AI-Chat-Bot-Flutter',
    label: 'Flutter / AI product',
    title: 'AI Chat Bot Flutter',
    summary:
      'An open-source Flutter application that wraps Gemini in a mobile conversation experience with local chat history and a maintainable Android toolchain.',
    metaDescription:
      'Case study: AI Chat Bot Flutter, an open-source Flutter and Gemini mobile application with local Hive persistence and maintainable Android tooling.',
    role: 'Flutter engineering · AI interface design · Open-source maintenance',
    challenge:
      'An AI API is not a mobile product by itself. The interface needs clear conversation behavior, local persistence, sensible setup, and an approachable path for contributors.',
    stack: ['Flutter', 'Dart', 'Gemini', 'Hive', 'Provider', 'Markdown', 'Android', 'iOS'],
    systemMap: [
      { label: 'Conversation UI', detail: 'The Flutter interface manages message composition, response rendering, auto-scroll behavior, and image selection.' },
      { label: 'App state', detail: 'Provider-based state management keeps loading, conversation, and navigation behavior organized across the app.' },
      { label: 'AI connection', detail: 'Gemini requests are configured through the app environment, while Markdown rendering keeps responses readable.' },
      { label: 'Local continuity', detail: 'Hive-backed history preserves conversations locally so the product experience survives a single screen session.' }
    ],
    evidence: [
      { label: 'Community', detail: 'The public repository has visible open-source interest; current stars and forks are shown from the GitHub snapshot on the page.' },
      { label: 'Product', detail: 'Implements a conversational Gemini interface with local history and app-level navigation.' },
      { label: 'Maintenance', detail: 'Documents modern Android Gradle, Kotlin, and Java compatibility updates for contributors.' }
    ],
    buildNotes: [
      'Used Flutter to focus on the interaction layer around an AI capability rather than presenting a bare API call.',
      'Kept local history in the product so the conversation experience survives beyond a single screen session.',
      'Kept environment and API-key setup explicit so a contributor can run the app without hard-coding secrets.',
      'Modernized the Android toolchain around Gradle 8.14, AGP 8.11.1, Kotlin 2.2.20, and Java 17 for current Flutter tooling.'
    ],
    verification: [
      'The repository documents environment setup, dependency installation, and the Android compatibility path for contributors.',
      'Local persistence, state management, response rendering, and scrolling behavior are visible product-level concerns rather than hidden behind one API call.',
      'Stars and forks are rendered from the current GitHub repository snapshot instead of being used as a fixed marketing claim.'
    ],
    currentBoundary: 'Local history does not make the model offline-capable, and this case study does not claim an App Store or Play Store release, engagement metrics, or production adoption.'
  }
];

export function getCaseStudyBySlug(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudyByRepo(repoName: string) {
  return caseStudies.find((study) => study.repoName === repoName);
}
