<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  as?: string
  variant?: string
  size?: string
  shape?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  as: undefined,
  variant: 'default',
  size: 'md',
  shape: 'default',
  color: 'base',
});

const tag = computed(() => {
  if (props.as) {
    return props.as;
  }

  return 'button';
});
</script>

<template>
  <component
    :is="tag"
    class="bn-btn"
    :class="[
      `bn-btn--sizes-${props.size}`,
      `bn-btn--shapes-${props.shape}`,
      `bn-btn--variants-${props.variant}`,
      `bn-btn--variants-${props.variant}-${props.color}`,
    ]"
  >
    <slot />
  </component>
</template>
