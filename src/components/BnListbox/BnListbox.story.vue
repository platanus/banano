<script setup lang="ts">
import { reactive } from 'vue';
import BnListbox from './BnListbox.vue';

const state = reactive({
  single: 'Super Long Text lorem ipsum dolor sit amet, consectetur adipiscing elit',
});

const selectOptions = [
  'Super Long Text lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];
</script>

<template>
  <Story
    title="BnListbox"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <Variant title="default">
      <template #default>
        <BnListbox
          v-model="state.single"
          name="default"
          :options="selectOptions"
        />
      </template>
    </Variant>
    <Variant title="disabled">
      <template #default>
        <BnListbox
          v-model="state.single"
          name="disabled"
          disabled
          :options="selectOptions"
        />
      </template>
    </Variant>
    <Variant title="color">
      <template #default>
        <BnListbox
          v-model="state.single"
          name="color"
          :options="selectOptions"
          color="orange"
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
