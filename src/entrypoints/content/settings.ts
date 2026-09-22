import { storage } from 'wxt/utils/storage';
import { DEFAULT_DARK_THEME_ID, DEFAULT_LIGHT_THEME_ID } from './themes';

export type ThemeMode = 'auto' | 'fixed';

export type ThemeSettings = {
  mode: ThemeMode;
  lightThemeId: string;
  darkThemeId: string;
  fixedThemeId: string;
};

const DEFAULT_SETTINGS: ThemeSettings = {
  mode: 'auto',
  lightThemeId: DEFAULT_LIGHT_THEME_ID,
  darkThemeId: DEFAULT_DARK_THEME_ID,
  fixedThemeId: DEFAULT_LIGHT_THEME_ID,
};

export const themeSettingsItem = storage.defineItem<ThemeSettings>('local:themeSettings', {
  fallback: DEFAULT_SETTINGS,
});
