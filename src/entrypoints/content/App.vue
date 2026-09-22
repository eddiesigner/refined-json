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

const themeVars = computed(() => ({
  '--sh-background': palette.value.background,
  '--sh-foreground': palette.value.foreground,
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
