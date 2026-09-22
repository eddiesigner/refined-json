<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
  <pre class="rj-raw"><code>{{ text }}</code></pre>
</template>
