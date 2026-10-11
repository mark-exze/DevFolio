# DevFolio

A production-ready personal developer portfolio built with **React**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **Lucide React**.

## Features

- Dark navy design with sky-blue accents
- Fully responsive layouts with accessible semantic HTML
- Reusable, typed components: `Navbar`, `Hero`, `About`, `Skills`, `Projects`, `Devlog`, `Contact`, `Footer`
- Typed local data files for projects, skills, devlog, and personal info
- Working navigation with hash routing and accessible mobile menu
- Real external links configured from placeholder data
- SEO metadata, Open Graph, Twitter cards, and structured data
- Basic Vitest tests for the data files
- GitHub Actions CI pipeline (lint, typecheck, test, build)
- No backend dependencies — contact uses a native `mailto:` form

## Tech stack

| Tool | Purpose |
| --- | --- |
| React 18 | UI library |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Styling |
| Lucide React | Icons |
| React Router DOM | Hash routing |
| Vitest | Testing |
| ESLint + TypeScript | Linting & type checking |

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 in your browser.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production bundle |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run the TypeScript compiler in check mode |
| `npm run test` | Run Vitest tests |

## Project structure

```
devfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/     # Navbar, Hero, About, Skills, Projects, Devlog, Contact, Footer, Layout
│   ├── data/           # projects.ts, skills.ts, devlog.ts, personal.ts
│   ├── test/           # setup.ts, data.test.ts
│   ├── hooks.ts
│   ├── utils.ts
│   ├── index.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .github/workflows/ci.yml
├── eslint.config.js
├── index.html
├── package.json
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
└── README.md
```

## Customization

All personal information, projects, skills, and devlog entries live in
`src/data/`. Edit those files to swap in your own content.

Replace the placeholder social links in `src/data/personal.ts` with your
real profiles before deploying.

## CI

The `.github/workflows/ci.yml` workflow runs on every push and pull
request to `main`. It installs dependencies, then runs lint, typecheck,
tests, and build across Node 18 and 20.

## License

MIT