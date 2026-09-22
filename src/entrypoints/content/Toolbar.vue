<script setup lang="ts">
import { Braces, ListTree, SwatchBook } from '@lucide/vue';
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ThemeMenu from './ThemeMenu.vue';
import type { ThemeSettings } from './settings';

defineProps<{
  isRaw: boolean;
  settings: ThemeSettings;
}>();

const emit = defineEmits<{
  selectView: [isRaw: boolean];
  changeSettings: [patch: Partial<ThemeSettings>];
}>();

const ICON_SIZE = 15;
const menuOpen = ref(false);
const rootRef = ref<HTMLDivElement | null>(null);

function onPointerDown(event: PointerEvent) {
  if (!rootRef.value?.contains(event.target as Node)) {
    menuOpen.value = false;
  }
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown));
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown));
</script>

<template>
  <div class="rj-toolbar" ref="rootRef">
    <ThemeMenu v-if="menuOpen" :settings="settings" @change="emit('changeSettings', $event)" />
    <div class="rj-toolbar-buttons">
      <button
        type="button"
        :class="['rj-fab', { 'rj-fab--active': !isRaw }]"
        title="Show pretty JSON"
        @click="emit('selectView', false)"
      >
        <ListTree :size="ICON_SIZE" />
        Pretty
      </button>
      <button
        type="button"
        :class="['rj-fab', { 'rj-fab--active': isRaw }]"
        title="Show raw JSON"
        @click="emit('selectView', true)"
      >
        <Braces :size="ICON_SIZE" />
        Raw
      </button>
      <button
        type="button"
        class="rj-fab"
        title="Theme settings"
        :aria-expanded="menuOpen"
        @click="menuOpen = !menuOpen"
      >
        <SwatchBook :size="ICON_SIZE" />
        Theme
      </button>
    </div>
  </div>
</template>
