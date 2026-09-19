## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

`.tool-versions` (asdf/mise) pins Node to the version the deploy workflow builds with; bump the file, `package.json`'s `engines` and `.github/workflows/deploy.yml` together.

`CLAUDE.md` is a symlink to `AGENTS.md` — editing either edits both. Don't replace it with a regular file.

## Language

Everything the visitor reads is in Catalan (`<html lang="ca">`): page copy, UI strings, image alt text and the content collections.

Everything technical is in English: CSS classes and custom properties, component names and props, variables, code comments, collection and field names, workflow files and commit messages.

Routes and entry ids are the exception — they are visible in URLs, so they stay Catalan and drop accents (`/qui-som/`, `comite-de-solidaritat-del-baix-llobregat`).

## Content

Two collections, defined in `src/content.config.ts`:

- `brands` — one `.md` per brand in `src/content/brands/`. Entries are sorted by the `order` field, not by filename, so a new brand needs its own `order`. The entry id doubles as the `#anchor` linked from the front page.
- `organizations` — entries in `src/content/organizations.json`, each requiring an `id`. `url` and `logo` are optional: many groups have neither, and the card renders as a plain box instead of a link. The `logo` path resolves relative to the JSON file (`../assets/logos/<slug>.png`).

`src/content/manifest.md` is not a collection; `manifest.astro` imports it directly.

`manifest.md` holds the Declaració de Terrassa (22 February 2026) verbatim, signatures included — don't reword it. The brands are still draft: they have `sources: []` and carry explicit "Esborrany" notices. Don't remove those notices or treat that data as verified. The organisations come from the Declaració de Terrassa (22 February 2026); their links were found one by one, so don't invent one for an entry that has none.

## Styles

Plain global CSS — no Tailwind, no scoped `<style>` blocks. `src/styles/base.css` is a reset only and holds no aesthetic decisions; the whole design system lives in `src/styles/label.css`, with colour and type tokens on `:root` (`--ink`, `--paper`, `--coral`, `--yellow`, `--grey`, `--border`, `--title`, `--text`). Use the tokens rather than literal values. Classes are BEM (`.header__logo`, `.brand__body`, `.action--quiet`). Indent with tabs.

Images go through `astro:assets` `<Image>` with explicit `widths` and `sizes`. Fonts are self-hosted via fontsource, not loaded from a CDN.

## Pages and metadata

Four pages plus `src/pages/404.astro`. `Base.astro` builds the canonical link and the Open Graph and Twitter tags from the `title` and `description` props, using `astro.config.mjs`'s `site` — so every new page needs both props, and `site` must stay in sync with `public/CNAME`. The social card image is the campaign poster.

`@astrojs/sitemap` writes `sitemap-index.xml` at build time; `public/robots.txt` points to it.

## Verification

There are no tests and no linter. Formatting is Prettier (`npm run format`, `npm run format:check`); a `PostToolUse` hook in `.claude/settings.json` formats files automatically after they're written. For correctness, `astro build` is the only gate — content schema errors surface at build time. (`astro check` would add type checking, but needs `npm i -D @astrojs/check typescript` first; it is not installed.)

## Documentation

Astro documentation: https://docs.astro.build
