<div align="center">

# Capitole Movie App

Browse, discover and save movies from TMDB with Server‑Side Rendered (streaming) React 19, Vite and Express.

</div>

---

## Data Flow & SSR Pipeline

1. Incoming GET request hits Express catch‑all.
2. HTML template is loaded and split at `<!--ssr-outlet-->`.
3. Server dynamically imports `entry-server.tsx` (transformed via Vite in dev).
4. `streamRender` sets up React tree (StaticRouter, QueryClientProvider, App) and uses `renderToPipeableStream`.
5. Shell is streamed to client while React continues rendering; placeholders / suspense boundaries hydrate progressively.
6. Client bundles hydrate via `entry-client.tsx` using `hydrateRoot`.
7. Subsequent navigation handled entirely client-side (SPA behaviour).

Data transformation:

- Raw TMDB objects are converted to internal `Movie` objects (`convertTMDBToMovie`) ensuring single formatting responsibility.

## Getting Started

### Prerequisites

- Node.js 18+ (recommended) – supports native fetch & modern ESM.
- TMDB account for an API Read Access Token (v4).

### Install

```
npm install
```

### Development (with HMR + SSR)

```
npm run dev
```

Visit: http://localhost:3000

### Production build & run

SSR implemetation is not adapted to prod enviroments!!

## Environment Variables

Create a `.env` file 

```
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_ACCESS_TOKEN=YOUR_TMDB_V4_READ_ACCESS_TOKEN
```

## Available NPM Scripts

| Script         | Description                                                |
| -------------- | ---------------------------------------------------------- |
| `dev`          | Starts Express + Vite in middleware mode with SSR + HMR    |
| `build`        | Builds client + server outputs (calls the two sub-scripts) |
| `build:client` | Vite client build to `dist/client`                         |
| `build:server` | Server (SSR) entry build to `dist/server`                  |
| `preview`      | Runs production server using built artifacts               |
| `lint`         | Runs ESLint over the project                               |
| `type-check`   | Runs TypeScript compiler in noEmit mode                    |

Development Notes & Decisions

- Streaming SSR chosen for faster TTFB & progressive hydration.
- Wishlist intentionally ephemeral (in-memory) – persistence would require localStorage, IndexedDB or backend endpoint.
- Limited to first 10 movies per section for concise UI; can be extended with pagination or infinite scroll.
- SCSS uses partials grouped by concern (`BaseStyleConfig`, `FeaturesStyles`, `LayoutStyles`, `StyleUtils`).
- Path aliases reduce relative import noise and reinforce architecture boundaries.


### Quick Start (TL;DR)

```
git clone <repo>
cd capitole-movie-app
npm install
cp  .env   # (create and fill values if you add an example file)
npm run dev
```

Open http://localhost:3000
