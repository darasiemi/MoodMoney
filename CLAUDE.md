# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Stack

- **Next.js 16.2.5** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind CSS v4** — CSS-only config, no `tailwind.config.ts`
- **next-mdx-remote v6** — MDX rendered server-side via `next-mdx-remote/rsc`
- **next-themes v0.4.6** — class-based dark mode (`dark` class on `<html>`)
- **lucide-react v1** — brand icons (`Github`, `Linkedin`, `Twitter`) do not exist; use `ExternalLink`, `Link2`, `BookOpen` instead

---

## Commands

```bash
npm run dev                      # Dev server → localhost:3000
npm run build                    # Production build + type-check (run before every deploy)
npm run lint                     # ESLint
npm run content:add-publication  # Interactive CLI → appends to content/publications.json
npm run content:add-project      # Interactive CLI → creates content/projects/<slug>.mdx
```

No automated test suite. TypeScript type-checking runs inside `npm run build`.

---

## Architecture

### Principle: content never touches components

All editable data lives in `content/`. Components only receive typed props — they never read files directly.

```
content/
  publications.json     → lib/data.ts → PublicationCard
  people.json           → lib/data.ts → PersonCard
  projects/<slug>.mdx   → lib/mdx.ts  → app/research/[slug]/page.tsx
  blog/<slug>.mdx       → lib/mdx.ts  → app/blog/[slug]/page.tsx
```

- `lib/mdx.ts` — reads MDX files with `gray-matter`, returns typed objects. MDX body is rendered with `<MDXRemote source={...} />` from `next-mdx-remote/rsc` at page level.
- `lib/data.ts` — loads JSON with `require()` (not `import`). This is intentional: static `import` of JSON can cause bundler issues in server components with Turbopack.

### Adding a new content type

1. Define its TypeScript shape in `types/index.ts`.
2. Add a loader function in `lib/mdx.ts` (for MDX) or `lib/data.ts` (for JSON).
3. Create the page in `app/<route>/page.tsx` that calls the loader.
4. If the route is dynamic (`[slug]`), export `generateStaticParams()` using the slug loader — this keeps the route statically generated.

### Routing

Every route is statically generated at build time except the contact API:

| Route | Strategy | Key function |
|---|---|---|
| `app/research/[slug]` | SSG | `generateStaticParams` ← `getProjectSlugs()` |
| `app/blog/[slug]` | SSG | `generateStaticParams` ← `getBlogSlugs()` |
| `app/api/contact` | Dynamic (server) | POST handler; see file for Resend integration |

### Adding a new page

- Static page: create `app/<name>/page.tsx`, export `metadata`, add the route to `NAV_LINKS` in `components/layout/Navbar.tsx`.
- Dynamic detail page: create `app/<name>/[slug]/page.tsx`, export `generateStaticParams()` and `generateMetadata()`.
- No changes to any config file are needed.

---

## Styling

### Tailwind v4 — CSS-first config

All configuration lives in `app/globals.css`. There is no `tailwind.config.ts`.

- **Register new tokens** with `@theme { --color-my-token: #hex; }` → use as `bg-my-token`, `text-my-token`, etc.
- **Dark mode variant**: `@variant dark (&:where(.dark, .dark *))` — requires the `dark` class on `<html>`, which `next-themes` handles.
- **Typography plugin**: `@plugin "@tailwindcss/typography"` in the same file. Prose styles are applied with `className="prose prose-gray dark:prose-invert ..."`.
- **Do not** use arbitrary hex values (`bg-[#003087]`) for brand colours — use tokens.

### Colour system

All tokens are in `app/globals.css` under `@theme`. The hierarchy is strict:

| Token | Hex | When to use |
|---|---|---|
| `ucd-navy` + `ucd-navy-{900,800,700,200,100,50}` | `#003087` | Structure — headings, body text, navbar, footer bg, initial card borders |
| `ucd-gold` + `ucd-gold-{dark,100,50}` | `#FFCD00` | UCD brand identity only — navbar/footer top strip, logo SVG, hero title underline, conference badge, PI card border |
| `ucd-green` + `ucd-green-{100,50}` | `#2F6B3A` | Primary interactive accent — section heading bars, nav active underline, card hover borders, left accent bars on hover, hover text, tags, role labels, active status, success states, "Get in Touch" CTA |
| `ucd-blue` + `ucd-blue-{100,50}` | `#1E3A5F` | Sparse — journal publication badge only |

Dark mode surfaces (use as arbitrary values where needed):
- Page background: `#030c22`
- Card/surface: `#071030`
- Borders: `#0e2155`

**The rule:** gold = brand decoration. Green = any interactive or status signal. If you're about to use gold for a hover, link, tag, or button — use green instead.

### Shared CSS classes

- `.section-heading` — adds the green left border accent to section `<h2>` elements.
- `.hero-pattern` — dot-grid background on the hero section.

### Component conventions

- All components are server components by default. Add `"use client"` only when the component needs browser APIs, event handlers, or React state (e.g., `Navbar`, `ThemeToggle`, `ContactForm`).
- Props are always typed against `types/index.ts` — never use `any` or inline object types for content shapes.
- The `Tag` component accepts `variant="default" | "outline" | "gold"`. Default and outline use green; gold variant is reserved for explicit brand moments.
- `PersonCard` accepts `variant="full" | "compact"`. PI role gets a gold border; all other roles use the standard navy border.

---

## Static assets

All static files go in `public/` and are served from the root URL:

| File | URL |
|---|---|
| `public/ucd-logo.svg` | `/ucd-logo.svg` |
| `public/images/people/<name>.jpg` | `/images/people/<name>.jpg` |

The UCD logo (`public/ucd-logo.svg`) is rendered with `next/image` in two places: `components/layout/Navbar.tsx` and `components/home/Hero.tsx`. It does **not** use `dark:invert` — the SVG retains its original colours in both light and dark themes. Do not add `dark:invert` to the logo.

When adding team member photos, place them in `public/images/people/` and reference them as `/images/people/<filename>` in `content/people.json`.

---

## Types

`types/index.ts` is the single source of truth. When adding a new content field:
1. Update the interface in `types/index.ts` first.
2. Update the corresponding content file(s).
3. The loader and components will surface TypeScript errors guiding the remaining changes.

---

## Content reference

### People (`content/people.json`)

Current team: **Mark Matthews** (PI) and **Dara Adedeji** (PhD Candidate).

`role` must be one of: `pi | postdoc | phd | msc | undergrad | collaborator | alumni`. Display order on the People page is controlled by `ROLE_ORDER` in `lib/data.ts`. The `joinYear` field is required; set `leaveYear` to move someone to the Alumni section without deleting their record.

### MDX frontmatter shapes

**Project** (`content/projects/<slug>.mdx`):
```yaml
title, slug, description, status (active|completed|upcoming),
startYear, endYear?, tags[], image?, featured?, collaborators[]?, funding?
```
`slug` must match the filename exactly.

**Blog post** (`content/blog/<slug>.mdx`):
```yaml
title, slug, date (YYYY-MM-DD), author, summary, tags[], published (true|false)
```
`published: false` hides the post from all listings without deleting it.

### Publications (`content/publications.json`)

`id` must be unique. Set `featured: true` to surface on the homepage. Sorted by `year` descending automatically.

### Updating content without touching code

| Task | Action |
|---|---|
| Add publication | `npm run content:add-publication` or append to `publications.json` |
| Add project | `npm run content:add-project` or create `content/projects/<slug>.mdx` |
| Add team member | Append to `content/people.json` |
| Add blog post | Create `content/blog/<slug>.mdx` with `published: true` |
| Feature something on homepage | Set `featured: true` in the relevant file |
| Hide a blog post | Set `published: false` — do not delete the file |
| Move someone to alumni | Set `leaveYear` in their `people.json` entry |

### Editing the home page

| Section | How to edit |
|---|---|
| Hero text and buttons | `components/home/Hero.tsx` |
| Which projects appear | `featured: true/false` in `content/projects/<slug>.mdx` |
| Which publications appear | `featured: true/false` in `content/publications.json` |
| Blog posts shown | Two most recent with `published: true`, sorted by `date` |

---

## Path alias

`@/*` resolves to the project root (`tsconfig.json`). Always use `@/components/...`, `@/lib/...`, `@/content/...`, `@/types` — never relative paths across directory boundaries.
