<script setup lang="ts">
import { computed, ref } from 'vue';
import JsonTree from './JsonTree.vue';
import type { JsonValue } from './jsonValue';
import RawView from './RawView.vue';
import Toolbar from './Toolbar.vue';
import { useThemeSettings } from './useThemeSettings';

const props = defineProps<{
  rawText: string;
  data: JsonValue;
}>();

const isRaw = ref(false);
const { settings, update, palette } = useThemeSettings();

// A plain browser tab showing raw JSON has no theme of its own — it just
// renders with the browser's native light/dark UI colors, which follow the
// OS setting live. `Canvas`/`CanvasText` are the CSS system-color keywords
// for exactly that (paired with `color-scheme: light dark` below), so raw
// mode matches the native view instead of a hardcoded white/black guess.
const NATIVE_BACKGROUND = 'Canvas';
const NATIVE_FOREGROUND = 'CanvasText';

const themeVars = computed(() => ({
  '--sh-background': isRaw.value ? NATIVE_BACKGROUND : palette.value.background,
  '--sh-foreground': isRaw.value ? NATIVE_FOREGROUND : palette.value.foreground,
  '--sh-sign': palette.value.sign ?? palette.value.foreground,
  '--sh-property': palette.value.property ?? palette.value.foreground,
  '--sh-string': palette.value.string ?? palette.value.foreground,
  '--sh-keyword': palette.value.keyword ?? palette.value.foreground,
  '--sh-class': palette.value.class ?? palette.value.foreground,
  '--sh-comment': palette.value.comment ?? palette.value.foreground,
}));
</script>

<template>
  <div class="rj-root" :style="themeVars">
    <main class="rj-content">
      <RawView v-if="isRaw" :text="props.rawText" />
      <JsonTree v-else :data="props.data" />
    </main>
    <Toolbar :is-raw="isRaw" :settings="settings" @select-view="isRaw = $event" @change-settings="update" />
  </div>
</template>
