<script setup lang="ts">
import { reactive } from 'vue';
import BnInput from './BnInput.vue';

const state = reactive({
  value: 'Hello world!',
  emptyValue: undefined,
});

// eslint-disable-next-line max-len, vue/max-len
const letterIcon = 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z';
</script>

<template>
  <Story
    title="BnInput"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <Variant title="default">
      <template #default>
        <BnInput
          v-model="state.value"
          name="default"
        />
      </template>
    </Variant>
    <Variant title="placeholder">
      <template #default>
        <BnInput
          v-model="state.emptyValue"
          placeholder="Placeholder"
          name="placeholder"
        />
      </template>
    </Variant>
    <Variant title="color">
      <template #default>
        <BnInput
          v-model="state.value"
          color="orange"
          name="placeholder"
        />
      </template>
    </Variant>
    <Variant title="icons">
      <template #default>
        <BnInput
          v-model="state.value"
          name="icons"
        >
          <template #icon-left>
            <svg
              viewBox="0 0 24 24"
              class="w-4 h-4 text-gray-400"
            >
              <path
                fill="currentColor"
                :d="letterIcon"
              />
            </svg>
          </template>
          <template #icon-right>
            <svg
              viewBox="0 0 24 24"
              class="w-4 h-4 text-gray-400"
            >
              <path
                fill="currentColor"
                :d="letterIcon"
              />
            </svg>
          </template>
        </BnInput>
      </template>
    </Variant>
  </Story>
</template>

<style>
  .__histoire-sandbox {
    padding: 10px;
  }
  </style>
