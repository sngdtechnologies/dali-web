# Dali Web

Unified Next.js app: the public marketing vitrine (this spec) plus a future backoffice.
Linxo-inspired structure in Dali's own brand palette (ivoire / forêt / gold), bilingual FR (default) / EN.

## Develop

```
npm install
cp .env.example .env.local
npm run dev
```

FR default at `/fr`, English at `/en`.

## Quality gates

- `npm test` — Vitest unit/component tests
- `npm run e2e` — Playwright end-to-end + axe accessibility (requires `npx playwright install`)
- `npm run lint` / `npm run typecheck`

## Build & run

```
npm run build && npm start
```

## Docker

```
docker build -t dali-web .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=... dali-web
```

## Notes

- Design tokens are ported from `dali-mobile/lib/theme/dali_theme.dart` (kept visually identical to the app).
- Motion via Framer Motion + Lenis; every animation honors `prefers-reduced-motion`.
- Fonts (Instrument Serif + Inter) are self-hosted at build time via `next/font` (no runtime font CDN).
- The backoffice (NestJS-native admin auth + admin CRUD) is a separate spec; the API/auth seams live in `src/lib/api` and `src/lib/auth`.
- Placeholder assets to swap later: store badges (official App Store / Google Play badges), the device-mockup screenshot, and `public/og.png`.
