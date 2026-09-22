import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { ThemeVariant } from './themes';

const DARK_QUERY = '(prefers-color-scheme: dark)';

export function useSystemScheme() {
  const media = window.matchMedia(DARK_QUERY);
  const scheme = ref<ThemeVariant>(media.matches ? 'dark' : 'light');

  const onChange = (event: MediaQueryListEvent) => {
    scheme.value = event.matches ? 'dark' : 'light';
  };

  onMounted(() => media.addEventListener('change', onChange));
  onBeforeUnmount(() => media.removeEventListener('change', onChange));

  return scheme;
}
