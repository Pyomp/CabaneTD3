# Developer Profile

Source: codebase analysis, July 2026. Primary author: Nicolas Gayet
(`nga@outsight.tech`, ~95% of commits as `nga` / `Nicolas Gayet`).
Domain: LiDAR / perception / OSEF streaming, calibration, zones, record
playback — industrial tooling, not a CRUD app.

## One-liner

Intermediate software engineer with a graphics specialization. Builds complex real-time 3D tooling (Vue 3 + Three.js front-to-back) with production hygiene — types, tests, CI, design docs — but optimizes for his own workflow more than for easy handoff to others.

## Technical skills

- Full-stack: Vue 3, TypeScript, FastAPI, Python, Docker, Helm, GitLab CI
- Real-time 3D / WebGL: Three.js, GLSL shaders, GPU picking, instanced
  rendering, camera controls
- Frontend architecture: Composition API, Pinia, feature-based modules,
  composable abstractions
- Type safety: OpenAPI / JSON Schema codegen, strict TS interfaces,
  `vue-tsc`, `mypy`
- Streaming and performance: WebSockets, Web Workers, IndexedDB, binary
  parsing, async queues
- Test engineering: Vitest, Vue Test Utils, colocated tests, mock
  infrastructure
- API design: typed clients, contract-driven development, schema
  versioning
- Technical writing: design docs with goals, non-goals, rejected
  alternatives

## Signature patterns

- Stores with explicit TypeScript interfaces (`useGltfViewerStore.ts`)
- Feature folders: row components + viewer stores + 3D controllers
- Design docs with goals, non-goals, rejected alternatives
- Blunt, practical `AGENTS.md` conventions (no fluff)

## Strengths

- Ships real, hard software — full-stack ownership of a complex platform
- Typed contracts, lint/type-check gates, tests colocated with features
- Clear layering (`features/`, `composables/`, `services/`, `libs/three/`)
- Iterates: ~150 refactor commits, actively pays down debt
- Invests in DX — custom dev tools, test utilities, root Makefile

## Weaknesses

- High bus factor — tribal knowledge, conventions hard for newcomers
- Test pyramid skew — heavy global mocks, stale E2E, API lightly tested
- Over-engineers then corrects (e.g. old 230-line analytics tree factory,
  redundant filtering, aliases like `hasContent` = `isFiltered`)
- UI migrations left incomplete in places (old patterns still present)
- Architecture knowledge lives mostly in code, not docs

## Proof points

- ~183 test files for ~626 source files, kept in sync with refactors
- ~150 refactor commits in ongoing solo maintenance
- Full ownership: Vue 3 + Three.js frontend, FastAPI backend, Python
  shared lib, WebSocket proxy, Helm/CI pipeline

## Improvement plan

Personal habits:

- Ship less, polish more on the first pass — avoid abstractions a junior
  can't read without you
- Document why conventions exist, not just what they are
- Fewer mocked unit tests, more high-value integration/E2E tests
- Match backend test discipline to frontend
- Smaller MRs, ADRs — less solo ownership of every commit

Project actions, in priority order:

1. Fix or replace the E2E smoke test — currently useless, should catch
   real regressions
2. Add `docs/architecture.md` and `docs/testing.md` — reduces bus factor
3. Finish context-menu to inline-button migration — one UI language
4. Add 3-5 API integration tests on critical endpoints
5. Trim global mocks incrementally
6. Clean up redundant filters / dead aliases opportunistically during
   refactors, not as a dedicated sprint

Concrete items:

- Testing: replace `app/e2e/vue.test.ts` with real smoke flows (app
  loads, menu visible, toggle a layer); add a `test:integration` Vitest
  project with fewer mocks for 3D controllers; mock at boundaries
  (`ThreeContext`) instead of all of `three`
- UI consistency: migrate remaining context-menu rows (e.g.
  `RowGmmBackground.vue`) to inline `ButtonRow*` actions; delete
  `useContextMenuStore` once unused
- Docs: `docs/architecture.md` (folder structure, 3D pipeline — OSEF to
  buffers to controllers to GPU interaction); `docs/testing.md` (when to
  use `mountComponent`, `shallow: false`, how mocks work)
- Code quality: remove duplicate template filters in
  `AccordionPerceptionArea.vue`; remove redundant computed aliases;
  delete dead code after migrations
- CI: add a minimal Playwright smoke job; ensure contract generation
  check runs in CI
