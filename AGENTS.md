## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

`CLAUDE.md` is a symlink to `AGENTS.md` — editing either edits both. Don't replace it with a regular file.

## Language

The site is in Catalan (`<html lang="ca">`). Write content, UI strings, file names, CSS classes, component props, code comments and commit messages in Catalan. Slugs drop accents (`comite-de-solidaritat-del-baix-llobregat`).

## Content

Two collections, defined in `src/content.config.ts`:

- `marques` — one `.md` per brand in `src/content/marques/`. Entries are sorted by the `ordre` field, not by filename, so a new brand needs its own `ordre`. The entry id doubles as the `#anchor` linked from the front page.
- `organitzacions` — entries in `src/content/organitzacions.json`, each requiring an `id`. The `logo` path resolves relative to the JSON file (`../assets/logos/<slug>.png`).

`src/content/manifest.md` is not a collection; `manifest.astro` imports it directly.

The current content is unpublished draft: every brand has `fonts: []`, `teva.md` and `manifest.md` carry explicit "Esborrany" notices, and all organisation URLs are `https://example.org/` placeholders. Don't remove those notices or treat the data as verified.

## Styles

Plain global CSS — no Tailwind, no scoped `<style>` blocks. `src/styles/base.css` is a reset only and holds no aesthetic decisions; the whole design system lives in `src/styles/etiqueta.css`, with colour and type tokens on `:root` (`--tinta`, `--paper`, `--coral`, `--groc`, `--gris`, `--vora`, `--titol`, `--text`). Use the tokens rather than literal values. Classes are BEM with Catalan names (`.capcalera__logo`, `.marca__cos`, `.accio--discreta`). Indent with tabs.

Images go through `astro:assets` `<Image>` with explicit `widths` and `sizes`. Fonts are self-hosted via fontsource, not loaded from a CDN.

## Verification

There are no tests and no linter. Formatting is Prettier (`npm run format`, `npm run format:check`); a `PostToolUse` hook in `.claude/settings.json` formats files automatically after they're written. For correctness, `astro build` is the only gate — content schema errors surface at build time. (`astro check` would add type checking, but needs `npm i -D @astrojs/check typescript` first; it is not installed.)

## Documentation

Astro documentation: https://docs.astro.build
