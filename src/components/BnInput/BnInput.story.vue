<script setup lang="ts">
import { reactive } from 'vue';
import BnInput from './BnInput.vue';

const state = reactive({
  value: 'Hello world!',
  emptyValue: undefined,
});
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
  </Story>
</template>

<style>
  .__histoire-sandbox {
    padding: 10px;
  }
  </style>
