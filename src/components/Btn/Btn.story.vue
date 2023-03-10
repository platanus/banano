<script setup lang="ts">
import { reactive } from 'vue';
import Btn from './Btn.vue';

const state = reactive({
  text: 'Click me!',
});

const sizeVariants = [
  { size: 'sm' },
  { size: 'md' },
  { size: 'lg' },
];

const shapeVariants = [
  { shape: 'circle', size: 'lg' },
  { shape: 'pill' },
  { shape: 'rounded' },
];

const variantVariants = [
  { variant: 'default' },
  { variant: 'outline' },
  { variant: 'no-border' },
];

const colorVariants = [
  { color: 'orange' },
  { color: 'orange', variant: 'outline' },
];

defineExpose({
  state,
});
</script>

<template>
  <Story
    title="Btn"
    :layout="{ type: 'grid', width: '200px' }"
  >
    <Variant title="default">
      <template #default>
        <Btn>
          {{ state.text }}
        </Btn>
      </template>
    </Variant>
    <Variant title="disabled">
      <template #default>
        <Btn disabled>
          {{ state.text }}
        </Btn>
      </template>
    </Variant>
    <Variant
      v-for="(props, key) of sizeVariants"
      :key="key"
      :title="'Btn ' + props.size"
    >
      <Btn v-bind="props">
        {{ state.text }}
      </Btn>
    </Variant>
    <Variant
      v-for="(props, key) of shapeVariants"
      :key="key"
      :title="'Btn ' + props.shape"
    >
      <Btn v-bind="props">
        {{ state.text }}
      </Btn>
    </Variant>
    <Variant
      v-for="(props, key) of variantVariants"
      :key="key"
      :title="'Btn ' + props.variant"
    >
      <Btn v-bind="props">
        {{ state.text }}
      </Btn>
    </Variant>
    <Variant
      v-for="(props, key) of colorVariants"
      :key="key"
      :title="'Btn ' + Object.keys(props).join(' ')"
    >
      <Btn
        v-bind="props"
      >
        {{ state.text }}
      </Btn>
    </Variant>
  </Story>
</template>

<style>
.__histoire-sandbox {
  padding: 10px;
}
</style>
