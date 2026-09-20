# Aayush Portfolio

A portfolio built with Next.js, TypeScript, Framer Motion, and a static GitHub-synced build. The current version leans into a stronger landing experience with a live build console, animated signal rails, richer project storytelling, and a deployment path prepared for `www.aayushdcdangi.com.np`.

## Why this stack

- **Next.js App Router** for SEO, server rendering, and clean routing
- **TypeScript** for safer refactors as the site grows
- **Framer Motion** for polished, intentional animation
- **Static export** for the fastest possible hosting path on a CDN
- **Cloudflare Pages** for free global edge delivery
- **GitHub API integration** so projects stay fresh without manual updates

## Features

- Distinctive hero section with animated build metrics and project-lane callouts
- Signal marquee and section reveals powered by Framer Motion
- Responsive design for mobile, tablet, and desktop
- SEO metadata plus JSON-LD structured data
- GitHub repositories pulled at build time for a static deploy
- Featured projects, category browsing, live demos, and recent activity
- Resume download button
- Contact form via Formspree
- Optional light and dark theme toggle

## 1. Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

## 2. Environment variables

Create `.env.local` and fill these values:

```env
NEXT_PUBLIC_SITE_URL=https://www.aayushdcdangi.com.np
GITHUB_USERNAME=dcaayushd
GITHUB_TOKEN=
NEXT_PUBLIC_FORMSPREE_ENDPOINT=
```

Notes:

- `GITHUB_TOKEN` is optional, but it gives you a higher GitHub API rate limit.
- `NEXT_PUBLIC_FORMSPREE_ENDPOINT` is optional until you create your form.

## 3. Edit content

Main editable content lives in:

- `src/data/portfolio.ts`

Key places to update:

- Bio and hero copy
- Experience and education
- Featured repo names
- Resume path
- Contact details

## 4. Add your resume

Replace:

- `public/resume.pdf`

## 5. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/dcaayushd/aayush-portfolio.git
git push -u origin main
```

If the repository already exists, just connect the remote and push.

## 6. Deploy to Cloudflare Pages

Recommended for this portfolio because it is free and extremely fast for static sites.

1. Push the project to GitHub
2. In Cloudflare, open **Workers & Pages**
3. Create a new **Pages** project and connect your GitHub repository
4. Use:
   - Build command: `npm run build:cloudflare`
   - Build output directory: `out`
   - Do not use `npx @cloudflare/next-on-pages@1`; this site is a static export and does not need the Workers adapter.
5. Add the same environment variables from `.env.local`
6. Deploy

### Local production preview

```bash
npm run build
npx serve out
```

## 7. Connect `www.aayushdcdangi.com.np`

Fastest and easiest setup:

1. Open the Cloudflare Pages project
2. Go to **Custom domains**
3. Add `www.aayushdcdangi.com.np`
4. In your current DNS provider, create the `CNAME` record that Cloudflare tells you to create, pointing `www` to your Pages project

For the root domain `aayushdcdangi.com.np`:

- easiest: forward it to `https://www.aayushdcdangi.com.np` from your registrar or DNS provider
- best long-term: move the domain’s nameservers to Cloudflare, then add the apex domain there too

Why this split exists:

- Cloudflare Pages subdomains work with a standard `CNAME`
- Cloudflare’s docs say apex domains require the domain to be a Cloudflare zone with Cloudflare nameservers

Keep this environment variable set in both local and Vercel environments:

```env
NEXT_PUBLIC_SITE_URL=https://www.aayushdcdangi.com.np
```

## 8. HTTPS

Cloudflare will provision SSL automatically once the DNS records are correct and propagation finishes.

## 9. Formspree setup

1. Create a free form on Formspree
2. Copy the endpoint URL
3. Put it in `.env.local` as:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

Redeploy after adding it to the Cloudflare Pages environment variables too.

## 10. Future upgrades

Good next improvements:

- Blog with MDX
- Deeper case-study pages for featured projects
- Real analytics with Plausible or Vercel Analytics
- GitHub contribution graph or recent activity snapshot
- AI assistant for visitors
- CMS-backed content editing
- Custom OG image generation

## Project structure

```txt
aayush-portfolio/
├── public/
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── api/github/route.ts
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── projects/page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── contact-form.tsx
│   │   ├── cursor-glow.tsx
│   │   ├── hero-console.tsx
│   │   ├── motion.tsx
│   │   ├── project-card.tsx
│   │   ├── section-heading.tsx
│   │   ├── signal-marquee.tsx
│   │   └── theme-toggle.tsx
│   ├── data/
│   │   └── portfolio.ts
│   └── lib/
│       ├── github.ts
│       ├── profile.ts
│       ├── projects.ts
│       └── utils.ts
├── .env.example
├── .gitignore
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```
