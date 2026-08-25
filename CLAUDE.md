# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

InviteVibe (package name `invite-vibe`) is a single-page marketing site for a custom invitation-design studio, built with Angular 22 (standalone components, zoneless-style signals, no NgModules). There is no backend — the "Contact" section submits directly to WhatsApp via a `wa.me` deep link, and all catalog content (categories, portfolio items, pricing tiers) is static data in `src/app/data/`.

## Commands

```bash
npm start          # ng serve — dev server at http://localhost:4200/, live reload
npm run build       # ng build — production bundle to dist/
npm run watch       # ng build --watch --configuration development
npm test            # ng test — runs the Vitest-based Angular unit-test builder
```

- There is no lint script configured (no ESLint/TSLint setup in `package.json`).
- To run a single test file, use Vitest's underlying CLI filtering through the Angular test builder, e.g. `npm test -- --project=InviteVibe src/app/app.spec.ts`, or open `src/app/app.spec.ts` as a reference for the existing `TestBed` + Vitest pattern used across the codebase (currently the only spec file).
- Formatting: Prettier is configured via `.prettierrc` (100-char width, single quotes, Angular parser for `.html`). Run via `npx prettier --write .`.

## Architecture

**Standalone components, no modules.** Every component (`src/app/components/*/`) is a standalone `@Component` with its own `.ts`/`.html`/`.scss` triplet, imported directly by whichever component uses it — there is no `AppModule`. The app bootstraps in [src/main.ts](src/main.ts) via `bootstrapApplication(App, appConfig)`. `swiper/element/bundle` is registered as a custom element there too, before bootstrap.

**Page composition.** [src/app/app.ts](src/app/app.ts) / [app.html](src/app/app.html) is the entire page: it lays out `<app-nav>`, then a `<main>` containing `<app-hero>`, `<app-categories>`, `<app-portfolio>`, `<app-how-it-works>`, `<app-pricing>`, `<app-contact>`, then `<app-footer>`. Each of those is a self-contained top-level section component under `src/app/components/`. Some sections have their own presentational sub-components (`category-card`, `pricing-card`, `floral-flourish`, `logo`).

**In-page navigation, not routing.** There is no `@angular/router` usage despite the dependency being present — the nav ([nav.ts](src/app/components/nav/nav.ts)) and hero scroll to section anchors by element id (`document.getElementById(id)?.scrollIntoView(...)`) rather than routing between views. Section components carry matching `id` attributes for this to work.

**Static data layer.** `src/app/data/` holds typed constant arrays (`CATEGORIES`, `PORTFOLIO_ITEMS`, `PRICING_TIERS`) that section components import directly and render — there is no HTTP client, store, or service layer for content. When adding catalog items, edit these files rather than adding component-local data.

**Shared animation service.** [src/app/services/gsap-animation.ts](src/app/services/gsap-animation.ts) (`GsapAnimation`) centralizes GSAP + ScrollTrigger setup and exposes reusable helpers (`revealOnScroll`, `revealGroupOnScroll`, `addCardInteraction`) plus `prefersReducedMotion` / `isMobileViewport` getters. Components that animate on scroll or interaction should go through this service rather than calling `gsap` directly, so reduced-motion and mobile behavior stay consistent site-wide. Note this project's DI class decorator is `@Service()` (not Angular's traditional `@Injectable()`) — follow that convention for any new injectable class.

**Animation pattern in components.** Components with entrance/scroll animations (e.g. [hero.ts](src/app/components/hero/hero.ts), [portfolio.ts](src/app/components/portfolio/portfolio.ts), [contact.ts](src/app/components/contact/contact.ts)) implement `AfterViewInit`, grab template refs via `viewChild.required<ElementRef<...>>(...)`, and drive GSAP timelines in `ngAfterViewInit`. Any component that builds its own persistent timeline or event listeners (not just calling `GsapAnimation` helpers) implements `OnDestroy` to `.kill()` timelines and remove listeners — see the hero's cursor-following flower orbit for the fullest example of manual cleanup.

**Swiper for carousels.** The portfolio section ([portfolio.ts](src/app/components/portfolio/portfolio.ts)) uses the `swiper` web component (`<swiper-container>`), configured imperatively via `Object.assign(el, {...}); el.initialize()` in `ngAfterViewInit`, and requires `schemas: [CUSTOM_ELEMENTS_SCHEMA]` on the component since Swiper's custom elements aren't known Angular elements.

**Forms.** The contact form ([contact.ts](src/app/components/contact/contact.ts)) uses `ReactiveFormsModule` with `FormBuilder`/`Validators`, and on submit builds a formatted message and opens a `wa.me` link — there's no backend submission endpoint to wire up.

**Design tokens live in global CSS.** [src/styles.scss](src/styles.scss) defines the entire color/typography/spacing system as CSS custom properties on `:root` (`--color-*`, `--font-*`, `--shadow-*`, `--radius-*`, `--section-pad-y`, etc.), plus shared layout classes (`.container`, `.section`, `.section-heading`, `.eyebrow`, `.btn`/`.btn-primary`/`.btn-outline`/`.btn-ghost-light`). Component `.scss` files should reuse these tokens/classes rather than hardcoding colors or re-deriving button styles. Reduced-motion handling (`prefers-reduced-motion`) is applied globally here in addition to being checked per-component via `GsapAnimation.prefersReducedMotion`.

**Content is a placeholder.** Several files carry explicit TODO-style comments marking stand-in content the studio must replace before launch: the WhatsApp number in [contact.ts](src/app/components/contact/contact.ts) (`WHATSAPP_NUMBER = '10000000000'`), pricing amounts (`"Starting from ___"` in [pricing.ts](src/app/data/pricing.ts)), and portfolio reel imagery ([portfolio-items.ts](src/app/data/portfolio-items.ts) `image?` field — reels render a designed placeholder face until real video/photo assets exist). Preserve these markers rather than inventing real values.
