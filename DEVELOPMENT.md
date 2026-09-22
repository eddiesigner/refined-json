# Development

Technical documentation for working on Refined JSON. For what the
extension does and how to use it, see [README.md](README.md).

## How it works

A content script runs on every page and bails out immediately unless
`document.contentType` looks like JSON (`application/json`,
`application/*+json`, or — only for the ambiguous types raw-file hosts like
GitHub, jsDelivr, and unpkg deliberately use to avoid content sniffing,
`text/plain`/`application/octet-stream` — a URL ending in `.json`). See
`detect.ts`'s `isJsonDocument`.

Once matched, it recovers the exact raw text: the common case is a single
`<pre>` holding the response body (how Chrome and Firefox render raw JSON
by default), but if the browser replaced that with its own JSON viewer,
it falls back to re-fetching the URL verbatim (`detect.ts`'s
`readRawJsonText`). The text is parsed, the page's `<body>` is cleared, and
a Vue app takes over from there.

The pretty view is a recursive tree (`JsonNode.vue`) that renders JSON
values directly — not by reformatting and re-highlighting text — so
collapsing/expanding is just component-local state, no re-parsing. It's
colored via CSS custom properties (`--sh-string`, `--sh-property`, ...) that
`App.vue` sets from the active palette — palette data structurally adapted
from [Sugar High](https://sugar-high.vercel.app/)'s bundled themes
(`themes.ts`), though the extension no longer depends on Sugar High itself.
The raw view (`RawView.vue`) renders the untouched original text with no
highlighting or reformatting, and the theme is ignored too: `App.vue`
overrides `--sh-background`/`--sh-foreground` to the `Canvas`/`CanvasText`
CSS system colors whenever `isRaw` is true (paired with `color-scheme:
light dark` in `style.css`), so it renders with the browser's own native
light/dark colors — the same mechanism real browsers use for the raw view
they'd show without this extension — rather than a hardcoded guess. It
tracks the OS setting live and reverts to the active palette the moment you
switch back to Pretty.

**Known limitations** (see the README for the user-facing summary):

- Detection is `Content-Type`-driven, with a `.json`-extension fallback
  only for known-ambiguous MIME types — a JSON API served under an
  unrelated content type and a non-`.json` URL won't be detected.
- Viewing local files needs the browser's own "allow file URLs" toggle
  enabled for this extension; that's a browser-level restriction no
  extension can bypass.

## Project structure

Built with [WXT](https://wxt.dev/) (Vite-based) + Vue 3 + TypeScript. WXT
generates the right manifest per browser target from one codebase.

```
wxt.config.ts                 Manifest fields, srcDir/outDir (name, permissions, ...)
src/
  entrypoints/
    background.ts              Opens external links via `chrome.tabs.create` (see below)
    content/
      index.ts                  Entry point: detects JSON docs, recovers raw text, mounts the Vue app
      App.vue                    Root component: raw/pretty toggle, theme CSS variables
      JsonTree.vue                Thin wrapper that kicks off the recursive tree
      JsonNode.vue                 Recursive collapsible object/array/primitive renderer
      KeyLabel.vue                 Shared `"key": ` prefix used by JsonNode
      RawView.vue                 Raw JSON text, unstyled, theme ignored
      Toolbar.vue                  Floating Pretty/Raw/Theme buttons
      ThemeMenu.vue                Theme mode (match system/fixed) + palette pickers + support link
      useThemeSettings.ts          Active palette, derived from settings + system color scheme
      useSystemScheme.ts           Tracks `prefers-color-scheme`
      themes.ts                   Palette catalog (data adapted from Sugar High's bundled themes)
      settings.ts                 Settings type + typed storage item (wxt/storage)
      detect.ts                    JSON detection + raw-text recovery
      jsonValue.ts                 Shared `JsonValue` type
      messages.ts                  Content↔background message types
      style.css                   All UI styles
public/icon/                  Toolbar icon (16/32/48/128px), copied as-is into every build (not
                               under src/ — WXT resolves publicDir from the project root by default)
docs/screenshots/            README screenshots
```

Theme choices persist via `wxt/storage`, which fires its `.watch()`
callback in every open tab whenever the value changes, regardless of which
tab changed it — so switching themes in one JSON tab updates every other
open one live.

The Theme popover's support link goes through `background.ts` via
`browser.runtime.sendMessage` rather than a plain `<a target="_blank">`
click. Some raw-JSON hosts (GitHub raw among them) send a `Content-Security-
Policy: ... sandbox` header with no `allow-popups`, which blocks a page's
own script-initiated new-tab/window opening outright — a restriction that
applies to the browsing context itself, regardless of what put the click
handler there. The background service worker isn't part of that browsing
context, so `chrome.tabs.create()` from there is unaffected; the anchor
still keeps its real `href`/`target` for hover preview, right-click, and
screen readers, with only the primary click routed through the background
script.

## Local development

```bash
npm install
npm run dev            # Chrome/Chromium-compatible dev build, auto-reloading
npm run dev:firefox    # Same, targeting Firefox
npm run compile        # Type-check only (vue-tsc), no build output
```

`npm run dev` doesn't auto-launch a browser (disabled in `wxt.config.ts`'s
`webExt.disabled` — see [WXT's browser startup
docs](https://wxt.dev/guide/essentials/config/browser-startup.html) to
re-enable and point it at a specific binary). Load the unpacked extension
manually instead, per the next section.

## Loading the extension

1. Open `chrome://extensions`.
2. Turn on **Developer Mode** (toggle, top right).
3. Click **Load unpacked**.
4. Select the `output/chrome-mv3` folder produced by `npm run build` (not
   the project root — that's the compiled extension WXT generates).
5. To view local `.json` files, click **Details** on the extension and
   enable **Allow access to file URLs**.

For active development, use `npm run dev` instead of `npm run build` — it
outputs to `output/chrome-mv3-dev` (a separate folder from the production
`chrome-mv3` build, so load that one in step 4 instead). Most code changes
auto-reload the extension from there; a manual reload is still
occasionally needed for changes the extension can't apply to itself, like
editing `wxt.config.ts`'s `permissions`.

For Firefox, see the [Firefox](#firefox) section below.

### Manual test checklist

- Visit an API endpoint or a raw `.json` file — it should render as a
  collapsible, syntax-highlighted tree automatically.
- Click a few `{`/`[` rows — they should collapse to a summary and expand
  back.
- Click **Raw** — it should show the exact, unformatted original text as a
  plain white/black page, ignoring whatever theme is active. Click
  **Pretty** to go back — the theme should reappear.
- Click **Theme**, switch between **Match system** and **Always use**, and
  change the light/dark or fixed palette — the page should recolor
  immediately.
- Toggle your OS's light/dark setting while **Match system** is active —
  open JSON pages should follow along.
- Reload the page — your theme choice should persist.

## Firefox

```bash
npm run build:firefox
npm run zip:firefox   # produces output/refined-json-<version>-firefox.zip
```

1. Go to `about:debugging#/runtime/this-firefox`.
2. Click **Load Temporary Add-on…**.
3. Select `manifest.json` inside `output/firefox-mv2`.

(Temporary add-ons are removed when Firefox restarts. For a persistent
install, submit the zip from `npm run zip:firefox` to
addons.mozilla.org — signed builds can then be installed permanently.)

## Preparing for the stores

```bash
npm run zip            # output/refined-json-<version>-chrome.zip, for the Chrome Web Store
npm run zip:firefox    # output/refined-json-<version>-firefox.zip, for addons.mozilla.org
```

Bump `version` in `package.json` before each release — WXT reads it
directly into the generated manifest.
