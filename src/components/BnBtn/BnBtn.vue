<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { type ComponentClassType } from '../../types/class';

interface ClassesProp {
  loading?: ComponentClassType
}

interface Props {
  as?: string
  variant?: string
  size?: string
  shape?: string
  color?: string
  loading?: boolean
  loadingReplacesContent?: boolean
  classes?: ClassesProp
}

const props = withDefaults(defineProps<Props>(), {
  as: undefined,
  variant: 'default',
  size: 'md',
  shape: 'default',
  color: 'banano-base',
  loading: false,
  loadingReplacesContent: false,
  classes: () => ({}),
});

const attrs = useAttrs();

const tag = computed(() => {
  if (props.as) {
    return props.as;
  }

  return attrs.href ? 'a' : 'button';
});
</script>

<template>
  <component
    :is="tag"
    class="bn-btn"
    :class="[
      `bn-btn--sizes-${props.size}`,
      `bn-btn--shapes-${props.shape}`,
      `bn-btn--shapes-${props.shape}-${props.size}`,
      `bn-btn--variants-${props.variant}`,
      `bn-btn--variants-${props.variant}-${props.color}`,
      `bn-btn--${props.color}`,
    ]"
  >
    <template v-if="!loading || loading && !loadingReplacesContent">
      <div
        v-if="$slots['icon-left']"
        class="bn-btn__icon-left"
      >
        <slot name="icon-left" />
      </div>
      <span class="bn-btn__content-and-loading-wrapper">
        <svg
          v-if="loading"
          class="bn-btn__loading"
          :class="[
            `bn-btn__loading--sizes-${props.size}`,
            props.classes.loading
          ]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="bn-btn__loading-circle"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="bn-btn__loading-arc"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135
              5.824 3 7.938l3-2.647z"
          />
        </svg>
        <slot />
      </span>
      <div
        v-if="$slots['icon-right']"
        class="bn-btn__icon-right"
      >
        <slot name="icon-right" />
      </div>
    </template>
    <template v-else>
      <svg
        class="bn-btn__loading bn-btn__loading--no-content"
        :class="[
          `bn-btn__loading--sizes-${props.size}`,
          props.classes.loading
        ]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="bn-btn__loading-circle"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        />
        <path
          class="bn-btn__loading-arc"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135
              5.824 3 7.938l3-2.647z"
        />
      </svg>
    </template>
  </component>
</template>
