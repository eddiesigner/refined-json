export type ThemeVariant = 'light' | 'dark';

export type ThemePalette = {
  background: string;
  foreground: string;
  class?: string;
  identifier?: string;
  sign?: string;
  property?: string;
  entity?: string;
  jsxliterals?: string;
  string?: string;
  keyword?: string;
  comment?: string;
};

export type PaletteOption = {
  id: string;
  label: string;
  variant: ThemeVariant;
  palette: ThemePalette;
};

// Palette data adapted from Sugar High's bundled themes
// (https://github.com/huozhi/sugar-high), inlined here so this extension has
// no dependency on the React-specific `@sugar-high/react` package.
const taffy = {
  light: {
    background: '#f6f6f6',
    foreground: '#354150',
    class: '#8d85ff',
    identifier: '#354150',
    sign: '#8996a3',
    property: '#4e8fdf',
    entity: '#665ac7',
    jsxliterals: '#bf7db6',
    string: '#00a99a',
    keyword: '#f47067',
    comment: '#a19595',
  },
  dark: {
    background: '#25272d',
    foreground: '#d4d4d4',
    class: '#7eb5ff',
    identifier: '#d4d4d4',
    sign: '#8b949e',
    property: '#79c0ff',
    entity: '#b7adff',
    jsxliterals: '#d2a8ff',
    string: '#88bbb6',
    keyword: '#ffada8',
    comment: '#8b8b8b',
  },
};

const vercel = {
  light: {
    background: '#fff',
    foreground: '#171717',
    class: '#107d32',
    identifier: '#171717',
    sign: '#171717',
    property: '#d60020',
    entity: '#107d32',
    jsxliterals: '#171717',
    string: '#107d32',
    keyword: '#c41562',
    comment: '#4d4d4d',
  },
  dark: {
    background: '#000',
    foreground: '#ededed',
    class: '#00ca52',
    identifier: '#ededed',
    sign: '#ededed',
    property: '#ff5e63',
    entity: '#00ca52',
    jsxliterals: '#ededed',
    string: '#00ca52',
    keyword: '#ff518d',
    comment: '#a0a0a0',
  },
};

const vscode = {
  light: {
    background: '#f6f8fa',
    foreground: '#24292f',
    class: '#6f42c1',
    identifier: '#24292f',
    sign: '#24292f',
    string: '#032f62',
    keyword: '#cf222e',
    comment: '#6e7781',
    jsxliterals: '#8250df',
    entity: '#953800',
    property: '#0550ae',
  },
  dark: {
    background: '#1e1e1e',
    foreground: '#9cdcfe',
    class: '#4ec9b0',
    identifier: '#9cdcfe',
    sign: '#d4d4d4',
    string: '#ce9178',
    keyword: '#569cd6',
    comment: '#6a9955',
    jsxliterals: '#ff8c42',
    entity: '#dcdcaa',
    property: '#9cdcfe',
  },
};

const oneDarkPro = {
  light: {
    background: '#fafafa',
    foreground: '#383a42',
    class: '#a626a4',
    identifier: '#383a42',
    sign: '#383a42',
    string: '#50a14f',
    keyword: '#a626a4',
    comment: '#a0a1a7',
    jsxliterals: '#c18401',
    entity: '#4078f2',
    property: '#0184bc',
  },
  dark: {
    background: '#282c34',
    foreground: '#abb2bf',
    class: '#e06c75',
    identifier: '#abb2bf',
    sign: '#abb2bf',
    string: '#98c379',
    keyword: '#c678dd',
    comment: '#5c6370',
    jsxliterals: '#e5c07b',
    entity: '#61afef',
    property: '#56b6c2',
  },
};

const monokai = {
  light: {
    background: '#f7f7f5',
    foreground: '#6b8e23',
    class: '#c72565',
    identifier: '#6b8e23',
    sign: '#3a7ca5',
    string: '#a68e39',
    keyword: '#c72565',
    comment: '#99998e',
    jsxliterals: '#7b5fc9',
    entity: '#cc7b18',
    property: '#6b8e23',
  },
  dark: {
    background: '#272822',
    foreground: '#a6e22e',
    class: '#f92672',
    identifier: '#a6e22e',
    sign: '#66d9ef',
    string: '#e6db74',
    keyword: '#f92672',
    comment: '#75715e',
    jsxliterals: '#ae81ff',
    entity: '#fd971f',
    property: '#a6e22e',
  },
};

const minimal = {
  light: {
    background: '#f6f6f6',
    foreground: '#404040',
    class: '#404040',
    identifier: '#404040',
    sign: '#404040',
    string: '#808080',
    keyword: '#606060',
    comment: '#999999',
    jsxliterals: '#404040',
    entity: '#404040',
    property: '#404040',
  },
  dark: {
    background: '#252525',
    foreground: '#909090',
    class: '#909090',
    identifier: '#909090',
    sign: '#909090',
    string: '#808080',
    keyword: '#b0b0b0',
    comment: '#a0a0a0',
    jsxliterals: '#909090',
    entity: '#909090',
    property: '#909090',
  },
};

const gruvbox = {
  light: {
    background: '#fbf1c7',
    foreground: '#3c3836',
    class: '#b57614',
    identifier: '#3c3836',
    sign: '#3c3836',
    string: '#79740e',
    keyword: '#9d0006',
    comment: '#928374',
    jsxliterals: '#af3a03',
    entity: '#427b58',
    property: '#076678',
  },
  dark: {
    background: '#282828',
    foreground: '#ebdbb2',
    class: '#fabd2f',
    identifier: '#ebdbb2',
    sign: '#ebdbb2',
    string: '#b8bb26',
    keyword: '#fb4934',
    comment: '#928374',
    jsxliterals: '#fe8019',
    entity: '#8ec07c',
    property: '#83a598',
  },
};

const tokyoNight = {
  light: {
    background: '#f5f5f7',
    foreground: '#565a6e',
    class: '#5a4a78',
    identifier: '#565a6e',
    sign: '#565a6e',
    string: '#485e30',
    keyword: '#8c4351',
    comment: '#848cb5',
    jsxliterals: '#8f5e15',
    entity: '#0f4b6e',
    property: '#166775',
  },
  dark: {
    background: '#1a1b26',
    foreground: '#c0caf5',
    class: '#bb9af7',
    identifier: '#c0caf5',
    sign: '#c0caf5',
    string: '#9ece6a',
    keyword: '#f7768e',
    comment: '#565f89',
    jsxliterals: '#e0af68',
    entity: '#7dcfff',
    property: '#73daca',
  },
};

const nordLight: ThemePalette = {
  background: '#f6f6f6',
  foreground: '#364152',
  class: '#8f6f9f',
  identifier: '#364152',
  sign: '#7d8795',
  string: '#66835e',
  keyword: '#58769d',
  comment: '#9099a8',
  jsxliterals: '#a07855',
  entity: '#92705f',
  property: '#4f7f8c',
};

const softMinimal: ThemePalette = {
  background: '#f5f3ed',
  foreground: '#404040',
  class: '#404040',
  identifier: '#404040',
  sign: '#77746d',
  string: '#78756e',
  keyword: '#55524c',
  comment: '#99968f',
  jsxliterals: '#404040',
  entity: '#66635d',
  property: '#62605a',
};

const PAIRED_FAMILIES = [
  { id: 'vercel', label: 'Vercel', theme: vercel },
  { id: 'vscode', label: 'VS Code', theme: vscode },
  { id: 'onedarkpro', label: 'One Dark Pro', theme: oneDarkPro },
  { id: 'taffy', label: 'Taffy', theme: taffy },
  { id: 'monokai', label: 'Monokai', theme: monokai },
  { id: 'gruvbox', label: 'Gruvbox', theme: gruvbox },
  { id: 'tokyonight', label: 'Tokyo Night', theme: tokyoNight },
  { id: 'minimal', label: 'Minimal', theme: minimal },
] as const;

const LIGHT_ONLY_FAMILIES = [
  { id: 'nordlight', label: 'Nord Light', palette: nordLight },
  { id: 'softminimal', label: 'Soft Minimal', palette: softMinimal },
] as const;

// Flattened list of every selectable palette, used by both the auto (light/dark)
// and fixed (single) theme pickers.
export const PALETTE_OPTIONS: PaletteOption[] = [
  ...PAIRED_FAMILIES.flatMap((family) => [
    { id: `${family.id}-light`, label: `${family.label} Light`, variant: 'light' as const, palette: family.theme.light },
    { id: `${family.id}-dark`, label: `${family.label} Dark`, variant: 'dark' as const, palette: family.theme.dark },
  ]),
  ...LIGHT_ONLY_FAMILIES.map((family) => ({
    id: family.id,
    label: family.label,
    variant: 'light' as const,
    palette: family.palette,
  })),
];

export const LIGHT_PALETTE_OPTIONS = PALETTE_OPTIONS.filter((option) => option.variant === 'light');
export const DARK_PALETTE_OPTIONS = PALETTE_OPTIONS.filter((option) => option.variant === 'dark');

export const DEFAULT_LIGHT_THEME_ID = 'taffy-light';
export const DEFAULT_DARK_THEME_ID = 'taffy-dark';

export function getPaletteOption(id: string): PaletteOption | undefined {
  return PALETTE_OPTIONS.find((option) => option.id === id);
}

export function getPalette(id: string, fallbackId: string): ThemePalette {
  const option = getPaletteOption(id) ?? getPaletteOption(fallbackId);
  return option!.palette;
}
