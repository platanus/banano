<script setup lang="ts">
import { reactive } from 'vue';
import Btn from './Btn.vue';

const state = reactive({
  text: 'Click me!',
});

const sizeVariants = [
  { size: 'xs' },
  { size: 'sm' },
  { size: 'md' },
  { size: 'lg' },
];

const shapeVariants = [
  { shape: 'circle', size: 'lg', text: '👍' },
  { shape: 'pill' },
  { shape: 'rounded' },
];

const variantVariants = [
  { variant: 'default' },
  { variant: 'outline' },
  { variant: 'no-border' },
];

const colorVariants = [
  { color: 'lime' },
  { color: 'lime', variant: 'outline' },
];

const loadingVariants = [
  { loading: true, text: 'Loading...', title: 'Loading' },
  { loading: true, text: 'Loading...', size: 'sm', title: 'Loading sm' },
  { loading: true, text: 'Loading...', size: 'md', title: 'Loading md' },
  { loading: true, text: 'Loading...', size: 'lg', title: 'Loading lg' },
  { loading: true, text: 'Loading...', disabled: true, title: 'Loading disabled' },
  { loading: true, text: 'Loading...', loadingReplacesContent: true, title: 'Loading with content replaced' },
];

// eslint-disable-next-line max-len, vue/max-len
const letterIcon = 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z';

defineExpose({
  state,
});
</script>

<template>
  <Story
    title="Btn"
    :layout="{ type: 'grid', width: '300px' }"
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
    <Variant title="with href">
      <template #default>
        <Btn href="#">
          {{ state.text }}
        </Btn>
      </template>
    </Variant>
    <Variant
      v-for="(props, key) of sizeVariants"
      :key="key"
      :title="'Btn ' + props.size"
      class="bg-white"
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
        {{ props.text ? props.text : state.text }}
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
      <Btn v-bind="props">
        {{ state.text }}
      </Btn>
    </Variant>
    <Variant
      v-for="(props, key) of sizeVariants"
      :key="key"
      :title="`Btn with icons ${props.size}`"
    >
      <template #default>
        <Btn v-bind="props">
          <template #icon-left>
            <svg
              viewBox="0 0 24 24"
              class="h-4 w-4"
            >
              <path
                fill="currentColor"
                :d="letterIcon"
              />
            </svg>
          </template>
          {{ state.text }}
          <template #icon-right>
            <svg
              viewBox="0 0 24 24"
              class="h-4 w-4"
            >
              <path
                fill="currentColor"
                :d="letterIcon"
              />
            </svg>
          </template>
        </Btn>
      </template>
    </Variant>
    <Variant
      v-for="(props, key) of loadingVariants"
      :key="key"
      :title="props.title"
    >
      <template #default>
        <Btn v-bind="props">
          {{ props.text }}
        </Btn>
      </template>
    </Variant>
  </Story>
</template>

<style>
.__histoire-sandbox {
  padding: 10px;
}
</style>
