# Nexora — AI Workspace (frontend)

An AI SaaS platform frontend built with React 18, TypeScript, Tailwind CSS, shadcn-style components, Framer Motion and Recharts.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Design language

- **Light, editorial:** paper background `#F5F3EE`, ink `#111`, an electric lime highlight `#D4FF3A`, flame orange `#F0541E`, and pastel blocks (lilac, peach, mint, mist, butter).
- **Type:** Geist for UI and headlines, Instrument Serif italic for expressive words (`.serif-i`), Geist Mono for labels (`.eyebrow`).
- **Chart palette** (checked for colour-blind safety): `#5b4bff`, `#f0541e`, `#0e9f6e`, `#b07800`.
- Tokens live in `tailwind.config.ts` and `src/index.css`.

## Routes

| Route | Page |
|---|---|
| `/` | Marketing site: hero with 3D scroll mockup, bento features, product tour, pricing, FAQ |
| `/login`, `/signup` | Split-screen auth with password-strength meter |
| `/app` | Dashboard: KPIs, usage charts, activity, projects |
| `/app/chat` | AI chat with streamed replies, model picker, code blocks, history |
| `/app/studio` | Image generation, style presets, masonry gallery, lightbox |
| `/app/writer` | Template gallery and AI document editor with SEO/readability scores |
| `/app/workflows` | Draggable node canvas, test runs, run log |
| `/app/library` | Projects in grid or list view |
| `/app/team` | Members, roles, invite modal |
| `/app/billing` | Plan, credit usage, pricing, invoices |
| `/app/settings` | Profile, appearance, notifications, API keys, security |

Press **Ctrl/⌘ + K** anywhere in the app to open the command palette.

AI responses are simulated with mock data in `src/data/mock.ts`. Connect a real backend there.
Images come from Unsplash.
