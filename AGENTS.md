# Revolis.Мото

## Git workflow

Repository: https://github.com/8j722ntzch-wq/Revolis.Moto

- Work on `development` for all subsequent implementation changes.
- `master` is the release target. The initial import into both branches was explicitly authorized on 2026-10-21.
- Create a release Pull Request from `development` to `master` only when the user explicitly says the code is ready for release. Do not create release PRs or merge into `master` before that signal.
- Transfer releases through the Pull Request workflow; preserve history and do not force-push shared branches.
- The legacy `main` branch is not part of this workflow. Do not delete or rename it without a separate instruction.
- Publishing source code to GitHub does not authorize deploying the website.

## Start each task

- Read `docs/project-status.md`, then the brief and documentation for affected components. Inspect git status and remote branch/PR state before writing or pushing; preserve unrelated work.
- The Desktop homepage is already assembled. Do not restart the UI foundation or homepage migration based on historical paragraphs in the brief.
- Source precedence: current user instructions; fresh Figma context for visuals; verified product sources for commercial facts; current code/manifests; historical notes. Report conflicts instead of silently inventing a resolution.
- Synced ChatGPT project `sources/` files are read-only reference material. Edit the Git checkout, not the synced mirror.
- Read `docs/figma-handoff.md` before visual work. Historical notes do not certify current Figma sync, component dimensions, or product facts.

## Active scope

Contacts, privacy and custom 404 Desktop/Mobile are implemented (2026-10-21). Read docs/info-pages.md and design/info-pages.json. User-confirmed owner: ИП Бугаев Марк Александрович; address: Витебск, проспект Московский, 111. Use one privacy text on both devices. Organization map cards are pending; current Yandex widget searches the confirmed address.

Catalogue Desktop/Mobile assembly was authorized and implemented on 2026-10-21 at /models/. Read docs/catalogue.md and design/catalogue.json for fresh Figma targets, brand filtering, asset provenance and unresolved status differences. Model detail pages remain deferred.

Current milestone (2026-10-21): the user has explicitly authorized assembly of the Desktop homepage from `Main (Desktop)_1470 px` (1:13203). Reuse the reviewed styles and components from `/ui-kit/`. Desktop/Mobile consultation, bank and thank-you dialogs are implemented; read docs/popups.md and design/popups.json. The user deferred delivery integration and will supply the personal-data policy as a PDF. This authorization covers implementation and source updates in development, not website deployment.

Build the desktop homepage in Astro with CSS and small TypeScript modules. Mobile homepage assembly was also authorized and implemented on 2026-10-21; see docs/mobile-home.md. Model detail pages are a later milestone. Preserve the original design rather than applying previous UX suggestions automatically.

## Source of truth

`design/figma-source.json` stores the exact Figma target and capture status. Read `docs/implementation-brief.md` and `docs/figma-handoff.md` before implementation. Obtain fresh high-fidelity Figma context and a design screenshot through the Figma Design to Code workflow. Do not treat the old PDF, past dimensions or approximate recreations as current design data.

## Implementation

Keep model data in `src/data/catalog.ts`. Reuse the existing base layout, FAQ and lead components where appropriate. Place original graphic assets under `public/assets/` and record source node IDs and slots in `design/assets.json`. Use the asset transfer method returned by Figma. Temporary asset URLs must not remain in site code. Screenshot references are QA material, not page assets.

Use normal document flow, grid and flex for layout; reserve positioning for layers that actually overlap. Extract measured tokens only after reading the current design. Preserve SVG intrinsic geometry. Do not add an entire UI framework for this page.

## Content and behavior

Null model prices and unconfirmed availability are intentional, not missing values to invent. Read the brief for contact/address conflicts and other unresolved content. Keep test-drive and rental separate. The lead endpoint is not implemented; do not report real submission as working until delivery is verified with the selected backend. Never put integration secrets in client code.

## Coordination and documentation

- Use existing authorization for routine work; do not ask again for already requested changes. Creating a PR does not authorize merge or deployment. PR #1 was explicitly requested on 2026-10-21; check its live state and reuse it while open rather than creating duplicates.
- Never force-push shared branches. Refresh development before pushing and reconcile concurrent changes without overwriting them. Do not commit machine-specific runtime paths, credentials, logs or dependency folders.
- Use package-lock.json with `npm ci` for reproducible installs. Do not replace lockfiles or upgrade dependencies as a side effect of documentation or preview work.
- Update README and affected status/handoff docs with implementation changes. Keep historical decisions clearly dated; distinguish implemented, tested, content-approved and deployed.
- Start with existing components/tokens and review their callsites. Keep base price visible and financing visually distinct; historical UX preferences do not authorize unrequested redesign.

## Validation and handoff

`npm run design:status` reports available design inputs. The homepage manifests and originals are populated; run `npm run design:check` to detect regressions. Passing is not proof of visual fidelity. Run `npm run check` and `npm run build` after implementation changes. At the design width compare rendered sections, fonts, line wraps, layers and every asset with Figma; then inspect 1366 and 1920 px desktop widths. State any browser-verification limitation explicitly. Keep the project unpublished while it is preparation-only.

For documentation-only changes, check links, paths, commands and consistency; do not claim a new visual review or rerun unrelated UI tests. After code changes, also run relevant tests (`npm test` for phone-mask changes), and regenerate affected previews after a successful build. Record which checks ran now versus reports from earlier work.

## Mobile milestone — 2026-10-21

The user selected mobile styles/components before homepage assembly. Read docs/mobile-ui.md and design/mobile-ui.json. /ui-kit-mobile/ is implemented using fresh component contexts. The mobile homepage is now assembled on / (authorization followed the component review). Read docs/mobile-home.md and design/mobile-home.json. Mobile styles apply below 1288px; verify 390px and narrow widths as well as desktop. Preserve desktop styles and existing interactions.
