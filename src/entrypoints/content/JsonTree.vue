<script setup lang="ts">
import JsonNode from './JsonNode.vue';
import type { JsonValue } from './jsonValue';

defineProps<{ data: JsonValue }>();
</script>

<template>
  <div class="rj-tree">
    <JsonNode :value="data" :is-last="true" />
  </div>
</template>
