# Copilot Instructions

This is a Vite + Bun + React + Shadcn/UI boilerplate project for building modern full-stack web applications with TypeScript, dark mode, and API integration.

## Build, Test, and Lint Commands

**Development:**
```bash
# Full-stack development (recommended)
bun run dev  # Runs both backend and frontend concurrently

# Frontend only (UI development)
bun run dev:frontend  # Vite dev server on http://localhost:5173

# Backend only (API development)
bun run dev:backend  # Bun server on http://localhost:3001 with hot reload
```

**Build and Preview:**
```bash
bun run build  # Production build
bun run build:static  # Static build for GitHub Pages
bun run preview  # Preview production build
```

**Production:**
```bash
bun run start  # Start production server (serves from dist/)
```

**Linting and Formatting:**
```bash
bun run lint  # Run TypeScript type-check + ESLint
bun run format  # Format code with Prettier
```

## Architecture

**Dual Mode Architecture:**
- **Dynamic mode** (default): Bun server serves API endpoints + built frontend from `dist/`
- **Static mode** (`VITE_STATIC_MODE=true`): Build for static hosting (GitHub Pages) with data from `public/` folder

**Server Architecture (`src/index.ts`):**
- Uses Bun's native `serve()` with routes object (not Express/Hono)
- In development: Backend serves API only, frontend proxied by Vite
- In production: Single server serves both API and static files from `dist/`
- Client-side routing fallback: All non-API/non-file routes serve `index.html` for React Router

**Frontend Architecture:**
- Entry point: `src/frontend.tsx` → renders `src/App.tsx`
- Layout structure: `App.tsx` contains `<Layout>` wrapper with nav, theme toggle, and routing
- Global providers: `ThemeProvider` (dark mode) and `DataProvider` (static vs dynamic mode detection)
- Routing: React Router 7 with `<BrowserRouter basename={import.meta.env.BASE_URL}>`

**API Proxy:**
- Vite dev server proxies `/api/*` to `http://localhost:3001` (configured in `vite.config.ts`)
- Always use `/api` prefix for backend endpoints

## Key Conventions

**Package Manager:**
- Always use `bun` (not npm/yarn/pnpm) - project runs on Bun runtime

**Import Aliases:**
- Use `@/` for all src imports (e.g., `@/components/ui/button`)
- Configured in `tsconfig.json` paths and `vite.config.ts` alias
- Also in `components.json` for Shadcn CLI

**Shadcn/UI Components:**
- Style: "new-york"
- Location: `src/components/ui/`
- Add new components: `bunx shadcn@latest add <component-name>`
- Always use `cn()` utility from `@/lib/utils` for className merging

**Styling:**
- Tailwind CSS 4 with CSS variables for theming
- Use `cn()` helper for conditional classes (combines `clsx` + `twMerge`)
- Theme colors defined as CSS variables in `src/index.css`

**Asset Paths:**
- Use `getAssetPath()` for all public folder assets to support base URL (GitHub Pages)
- Use `getDataUrl()` for API/data endpoints (handles static vs dynamic mode)

**Type Safety:**
- Strict TypeScript enabled (`noUncheckedIndexedAccess`, `noImplicitOverride`, etc.)
- Never use `any` - use `unknown` if type is uncertain
- `noUnusedLocals` and `noUnusedParameters` disabled for development flexibility

**Code Style:**
- Prettier config in `.prettierrc.toml`:
  - 4 spaces for indentation
  - Single quotes
  - No semicolons
  - ES5 trailing commas
- ESLint flat config in `eslint.config.js`

**File Organization:**
- Create new files for components instead of inline definitions
- Use meaningful names for files, variables, and functions
- Components in `src/components/`, pages/views in `src/views/`

**Platform:**
- Development environment is Windows - ensure commands work on Windows

**Docker:**
- Multi-stage Dockerfile (install → build → release)
- Production container runs on port 3000
- `docker-compose.yml` available for orchestration
