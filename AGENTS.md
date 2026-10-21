# Revolis.Мото

## Git workflow

Repository: https://github.com/8j722ntzch-wq/Revolis.Moto

- Work on `development` for all subsequent implementation changes.
- `master` is the release target. The initial import into both branches was explicitly authorized on 2026-10-21.
- Create a release Pull Request from `development` to `master` only when the user explicitly says the code is ready for release. Do not create release PRs or merge into `master` before that signal.
- Transfer releases through the Pull Request workflow; preserve history and do not force-push shared branches.
- The legacy `main` branch is not part of this workflow. Do not delete or rename it without a separate instruction.
- Publishing source code to GitHub does not authorize deploying the website.

## Active scope

Current milestone (2026-10-21): implement and review Desktop styles and reusable components first, then composite cards, then homepage sections. The active showcase is `/ui-kit/`; `design/ui-foundation.json` and `design/ui-assets.json` record its source mapping. Do not interpret this milestone as authorization to publish or complete the homepage immediately.

Build the desktop homepage in Astro with CSS and small TypeScript modules. The user is designing mobile separately. Model detail pages are a later milestone. Preserve the original design rather than applying previous UX suggestions automatically.

## Source of truth

`design/figma-source.json` stores the exact Figma target and capture status. Read `docs/implementation-brief.md` and `docs/figma-handoff.md` before implementation. Obtain fresh high-fidelity Figma context and a design screenshot through the Figma Design to Code workflow. Do not treat the old PDF, past dimensions or approximate recreations as current design data.

## Implementation

Keep model data in `src/data/catalog.ts`. Reuse the existing base layout, FAQ and lead components where appropriate. Place original graphic assets under `public/assets/` and record source node IDs and slots in `design/assets.json`. Use the asset transfer method returned by Figma. Temporary asset URLs must not remain in site code. Screenshot references are QA material, not page assets.

Use normal document flow, grid and flex for layout; reserve positioning for layers that actually overlap. Extract measured tokens only after reading the current design. Preserve SVG intrinsic geometry. Do not add an entire UI framework for this page.

## Content and behavior

Null model prices and unconfirmed availability are intentional, not missing values to invent. Read the brief for contact/address conflicts and other unresolved content. Keep test-drive and rental separate. The lead endpoint is not implemented; do not report real submission as working until delivery is verified with the selected backend. Never put integration secrets in client code.

## Validation and handoff

`npm run design:status` reports available design inputs. `npm run design:check` fails until the manifests and originals are populated; it is not proof of visual fidelity. Run `npm run check` and `npm run build` after implementation changes. At the design width compare rendered sections, fonts, line wraps, layers and every asset with Figma; then inspect 1366 and 1920 px desktop widths. State any browser-verification limitation explicitly. Keep the project unpublished while it is preparation-only.
