import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  // Default is ".output" — macOS's native folder picker hides dotfiles by
  // default, which makes "Load unpacked" in Chrome annoying to point at
  // it. A plain, visible folder name avoids that friction.
  outDir: 'output',
  // Keeps all source code (entrypoints/) together under src/, separate from
  // config files at the root. public/icon/ stays at the project root, since
  // WXT resolves publicDir from there by default regardless of srcDir.
  srcDir: 'src',
  modules: ['@wxt-dev/module-vue'],
  webExt: {
    disabled: true,
  },
  manifest: {
    name: 'Refined JSON',
    description: 'Pretty-prints raw JSON pages with syntax highlighting, collapsible nodes, and light/dark themes.',
    permissions: ['storage'],
  },
});
