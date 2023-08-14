<script setup>
import { ref, onMounted } from 'vue';
import { createApp } from 'whyframe:app';

const el = ref();

onMounted(() => {
  createApp(el.value);
  document.body.classList.add('vp-raw');
});
</script>

<template>
  <div
    ref="el"
    class="p-4"
  />
</template>
