<script setup lang="ts">
defineProps<{ keyLabel?: string }>();
</script>

<template>
  <template v-if="keyLabel !== undefined">
    <span class="rj-key">"{{ keyLabel }}"</span><span class="rj-punct">: </span>
  </template>
</template>
