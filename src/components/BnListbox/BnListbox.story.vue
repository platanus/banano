<script setup lang="ts">
import { reactive } from 'vue';
import BnListbox from './BnListbox.vue';

const state = reactive({
  single: 'Super Long Text lorem ipsum dolor sit amet, consectetur adipiscing elit',
  multiple: ['Option 2', 'Option 3', 'Option 4'],
  object: { name: 'Label 1', id: 1 },
  objectMultiple: [{ name: 'Label 1', id: 1 }, { name: 'Label 2', id: 2 }],
});

const selectOptions = [
  'Super Long Text lorem ipsum dolor sit amet, consectetur adipiscing elit',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];

const objectOptions = [
  { name: 'Label 1', id: 1 },
  { name: 'Label 2', id: 2 },
  { name: 'Label 3', id: 3 },
  { name: 'Label 4', id: 4 },
  { name: 'Label 5', id: 5 },
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
    <Variant title="multiple">
      <template #default>
        <BnListbox
          v-model="state.multiple"
          name="multiple"
          multiple
          :options="selectOptions"
        />
      </template>
    </Variant>
    <Variant title="object">
      <template #default>
        <BnListbox
          v-model="state.object"
          track-by="id"
          option-label="name"
          name="object"
          :options="objectOptions"
        />
      </template>
    </Variant>
    <Variant title="object multiple">
      <template #default>
        <BnListbox
          v-model="state.objectMultiple"
          track-by="id"
          option-label="name"
          name="objectMultiple"
          multiple
          :options="objectOptions"
        />
      </template>
    </Variant>
    <Variant title="option template">
      <template #default>
        <BnListbox
          v-model="state.single"
          name="optionTemplate"
          :options="selectOptions"
        >
          <template #option-template="{option, selected}">
            <div class="flex overflow-hidden">
              <span class="mr-2">{{ selected ? '✔' : '❌' }}</span>
              <span class="truncate">{{ option }}</span>
            </div>
          </template>
        </BnListbox>
      </template>
    </Variant>
    <Variant title="selected template">
      <template #default>
        <BnListbox
          v-model="state.single"
          name="optionTemplate"
          :options="selectOptions"
        >
          <template #selected-template="{value}">
            <div class="flex overflow-hidden">
              <span>✔</span>
              <span class="mx-2 truncate">{{ value }}</span>
              <span>✔</span>
            </div>
          </template>
        </BnListbox>
      </template>
    </Variant>
    <Variant title="selected template multiple">
      <template #default>
        <BnListbox
          v-model="state.multiple"
          name="optionTemplate"
          :options="selectOptions"
          multiple
        >
          <template #selected-multiple-template="{value}">
            <div class="mr-1 inline-flex rounded border border-purple-800 bg-purple-300 px-1 text-purple-800">
              <span class="mr-1">📑</span>
              {{ value }}
            </div>
          </template>
        </BnListbox>
      </template>
    </Variant>
  </Story>
</template>

<style>
  .__histoire-sandbox {
    padding: 10px;
  }
  </style>
