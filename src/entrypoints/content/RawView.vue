<script setup lang="ts">
import { highlight } from 'sugar-high';
import { computed } from 'vue';

const props = defineProps<{ text: string }>();

// The ambient --sh-* variables set on .rj-root (see App.vue) already theme
// this markup, since Sugar High's tokens reference them via inline styles.
const html = computed(() => highlight(props.text, { lang: 'json' }));
</script>

<template>
  <pre class="rj-raw"><code v-html="html"></code></pre>
</template>
