<script setup lang="ts">
import { computed, ref } from 'vue';
import KeyLabel from './KeyLabel.vue';
import type { JsonValue } from './jsonValue';

const props = defineProps<{
  value: JsonValue;
  keyLabel?: string;
  isLast: boolean;
}>();

const isContainer = computed(() => props.value !== null && typeof props.value === 'object');
const isArray = computed(() => Array.isArray(props.value));
const openBrace = computed(() => (isArray.value ? '[' : '{'));
const closeBrace = computed(() => (isArray.value ? ']' : '}'));

const entries = computed<[string | undefined, JsonValue][]>(() => {
  if (!isContainer.value) {
    return [];
  }
  const container = props.value as JsonValue[] | Record<string, JsonValue>;
  return Array.isArray(container) ? container.map((item) => [undefined, item]) : Object.entries(container);
});

const summary = computed(() => {
  const container = props.value as JsonValue[] | Record<string, JsonValue>;
  if (Array.isArray(container)) {
    return `${container.length} item${container.length === 1 ? '' : 's'}`;
  }
  const count = Object.keys(container).length;
  return `${count} key${count === 1 ? '' : 's'}`;
});

const primitiveClass = computed(() => {
  if (typeof props.value === 'string') {
    return 'rj-string';
  }
  return typeof props.value === 'number' ? 'rj-number' : 'rj-keyword';
});

const primitiveText = computed(() =>
  typeof props.value === 'string' ? JSON.stringify(props.value) : String(props.value),
);

const collapsed = ref(false);
</script>

<template>
  <div v-if="isContainer && entries.length === 0" class="rj-row">
    <KeyLabel :key-label="keyLabel" />
    <span class="rj-punct">{{ openBrace }}{{ closeBrace }}</span>
    <span v-if="!isLast" class="rj-punct">,</span>
  </div>

  <div v-else-if="isContainer" class="rj-node">
    <button type="button" class="rj-row rj-toggle" :aria-expanded="!collapsed" @click="collapsed = !collapsed">
      <span class="rj-chevron" :class="{ 'rj-chevron--collapsed': collapsed }" aria-hidden="true">▾</span>
      <KeyLabel :key-label="keyLabel" />
      <span class="rj-punct">{{ openBrace }}</span>
      <template v-if="collapsed">
        <span class="rj-summary">{{ summary }}</span>
        <span class="rj-punct">{{ closeBrace }}</span>
        <span v-if="!isLast" class="rj-punct">,</span>
      </template>
    </button>
    <template v-if="!collapsed">
      <div class="rj-children">
        <JsonNode
          v-for="([entryKey, entryValue], index) in entries"
          :key="entryKey ?? index"
          :value="entryValue"
          :key-label="entryKey"
          :is-last="index === entries.length - 1"
        />
      </div>
      <div class="rj-row">
        <span class="rj-punct">{{ closeBrace }}</span>
        <span v-if="!isLast" class="rj-punct">,</span>
      </div>
    </template>
  </div>

  <div v-else class="rj-row">
    <KeyLabel :key-label="keyLabel" />
    <span :class="primitiveClass">{{ primitiveText }}</span>
    <span v-if="!isLast" class="rj-punct">,</span>
  </div>
</template>
