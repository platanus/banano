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
    <div
      v-if="$slots['icon-left']"
      class="pr-2"
    >
      <slot name="icon-left" />
    </div>
    <span class="flex-shrink-0">
      <slot />
    </span>
    <div
      v-if="$slots['icon-right']"
      class="pl-2"
    >
      <slot name="icon-right" />
    </div>
  </component>
</template>
