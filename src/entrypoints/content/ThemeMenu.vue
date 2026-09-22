<script setup lang="ts">
import { DARK_PALETTE_OPTIONS, LIGHT_PALETTE_OPTIONS, PALETTE_OPTIONS } from './themes';
import type { ThemeSettings } from './settings';

defineProps<{ settings: ThemeSettings }>();
const emit = defineEmits<{ change: [patch: Partial<ThemeSettings>] }>();

function selectValue(event: Event): string {
  return (event.target as HTMLSelectElement).value;
}
</script>

<template>
  <div class="rj-menu" role="dialog" aria-label="Theme settings">
    <div class="rj-menu-segment">
      <button
        type="button"
        :class="['rj-segment', { 'rj-segment--active': settings.mode === 'auto' }]"
        :aria-pressed="settings.mode === 'auto'"
        @click="emit('change', { mode: 'auto' })"
      >
        Match system
      </button>
      <button
        type="button"
        :class="['rj-segment', { 'rj-segment--active': settings.mode === 'fixed' }]"
        :aria-pressed="settings.mode === 'fixed'"
        @click="emit('change', { mode: 'fixed' })"
      >
        Always use
      </button>
    </div>

    <template v-if="settings.mode === 'auto'">
      <label class="rj-menu-field">
        <span>Light theme</span>
        <select :value="settings.lightThemeId" @change="emit('change', { lightThemeId: selectValue($event) })">
          <option v-for="option in LIGHT_PALETTE_OPTIONS" :key="option.id" :value="option.id">
            {{ option.label }}
          </option>
        </select>
      </label>
      <label class="rj-menu-field">
        <span>Dark theme</span>
        <select :value="settings.darkThemeId" @change="emit('change', { darkThemeId: selectValue($event) })">
          <option v-for="option in DARK_PALETTE_OPTIONS" :key="option.id" :value="option.id">
            {{ option.label }}
          </option>
        </select>
      </label>
    </template>
    <label v-else class="rj-menu-field">
      <span>Theme</span>
      <select :value="settings.fixedThemeId" @change="emit('change', { fixedThemeId: selectValue($event) })">
        <option v-for="option in PALETTE_OPTIONS" :key="option.id" :value="option.id">
          {{ option.label }}
        </option>
      </select>
    </label>
  </div>
</template>
