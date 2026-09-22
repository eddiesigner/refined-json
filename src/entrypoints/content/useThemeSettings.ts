import { computed, onBeforeUnmount, ref } from 'vue';
import { themeSettingsItem, type ThemeSettings } from './settings';
import { getPalette } from './themes';
import { useSystemScheme } from './useSystemScheme';

export function useThemeSettings() {
  const settings = ref<ThemeSettings>(themeSettingsItem.fallback);
  const systemScheme = useSystemScheme();

  themeSettingsItem.getValue().then((value) => {
    settings.value = value;
  });
  const unwatch = themeSettingsItem.watch((value) => {
    settings.value = value;
  });
  onBeforeUnmount(unwatch);

  function update(patch: Partial<ThemeSettings>) {
    const next = { ...settings.value, ...patch };
    settings.value = next;
    themeSettingsItem.setValue(next);
  }

  const palette = computed(() => {
    const activeThemeId =
      settings.value.mode === 'auto'
        ? systemScheme.value === 'dark'
          ? settings.value.darkThemeId
          : settings.value.lightThemeId
        : settings.value.fixedThemeId;
    return getPalette(activeThemeId, settings.value.lightThemeId);
  });

  return { settings, update, palette };
}
