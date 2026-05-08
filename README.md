# Mood & Money Lab — Website

The official website for the **Mood & Money Lab** at the School of Computer Science, University College Dublin. The lab uses machine learning and statistical analysis to understand how financial behaviour and mental health are interconnected, with a particular focus on bipolar disorder.

**Live site:** [mood-money.vercel.app](https://mood-money.vercel.app)

---

## Stack

- **Next.js 16.2.5** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — CSS-only config in `app/globals.css`
- **next-mdx-remote v6** — MDX content rendered server-side
- **next-themes v0.4.6** — light/dark mode (defaults to light)
- **Georgia** — body font (system serif); **Montserrat** — "University College Dublin" labels only

---

## Getting Started

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # production build + type-check
npm run lint      # ESLint
```

---

## Content Management

All content lives in `content/` — no code changes needed for routine updates.

| Task | How |
|---|---|
| Add a publication | `npm run content:add-publication` or edit `content/publications.json` |
| Add a project | `npm run content:add-project` or create `content/projects/<slug>.mdx` |
| Add a blog post | Create `content/blog/<slug>.mdx` with `published: true` |
| Add a team member | Append to `content/people.json` |
| Feature on homepage | Set `featured: true` in the relevant file |
| Hide a blog post | Set `published: false` |
| Move someone to alumni | Set `leaveYear` in their `people.json` entry |

### Project status values

`active` · `under review` · `completed` · `upcoming`

---

## Pages

| Route | Description |
|---|---|
| `/` | Home — hero, featured research, recent news & publications |
| `/research` | Projects browser with Active / Under Review / Completed tabs |
| `/research/[slug]` | Individual project detail page |
| `/publications` | Full publication list grouped by year |
| `/people` | Team members with expandable flashcard profiles |
| `/blog` | Blog post listing |
| `/blog/[slug]` | Individual blog post |
| `/contact` | Contact form + lab address |

---

## Environment Variables

Create a `.env.local` file (not committed):

```env
LAB_EMAIL=your_email.com      # contact form recipient
RESEND_API_KEY=your_key_here         # only needed to activate email sending
```

The contact form logs submissions to the console until the Resend block in `app/api/contact/route.ts` is uncommented.

---

## Project Structure

```
app/                  # Next.js App Router pages and API routes
components/           # UI components (layout, home, research, people, etc.)
content/              # All editable content (JSON + MDX)
lib/                  # Data loaders (mdx.ts, data.ts)
public/               # Static assets (ucd-logo.svg, images/)
scripts/              # CLI scripts for adding content
types/                # TypeScript interfaces (single source of truth)
```

---

## Deployment

Deployed on [Vercel](https://vercel.com). All routes are statically generated at build time except `/api/contact` and `/api/search`.
