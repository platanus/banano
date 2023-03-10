<script setup lang="ts">
import { GenericValidateFunction } from 'vee-validate';
import { reactive } from 'vue';
import BnCheckbox from './BnCheckbox.vue';

const checkboxArrayValues = ['Item 1', 'Item 2', 'Item 3'];

const checkboxObjectValues = [
  {
    id: 1,
    name: 'Item 1',
  },
  {
    id: 2,
    name: 'Item 2',
  },
  {
    id: 3,
    name: 'Item 3',
  },
];

const state = reactive({
  single: 'Checked',
  array: ['Item 1', 'Item 2'],
  object: [],
  disabled: undefined,
});

function isRequired(val: string) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}
</script>

<template>
  <Story
    title="BnCheckbox"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <Variant title="default">
      <template #default>
        <BnCheckbox
          v-model="state.single"
          name="single"
          value="Checked"
        >
          This is a checkbox
        </BnCheckbox>
      </template>
    </Variant>
    <Variant title="disabled">
      <template #default>
        <BnCheckbox
          v-model="state.disabled"
          name="single"
          value="Checked"
          disabled
        >
          This is a checkbox
        </BnCheckbox>
      </template>
    </Variant>
    <Variant title="array">
      <template #default>
        <template
          v-for="value in checkboxArrayValues"
          :key="value"
        >
          <BnCheckbox
            v-model="state.array"
            name="array"
            :value="value"
          >
            {{ value }}
          </BnCheckbox>
        </template>
      </template>
    </Variant>
    <Variant title="object">
      <template #default>
        <template
          v-for="value in checkboxObjectValues"
          :key="value.id"
        >
          <BnCheckbox
            v-model="state.object"
            name="object"
            :value="value"
          >
            {{ value.name }}
          </BnCheckbox>
        </template>
      </template>
    </Variant>
    <Variant title="color">
      <template #default>
        <BnCheckbox
          v-model="state.single"
          name="color"
          value="Checked"
          color="orange"
        >
          This is a checkbox
        </BnCheckbox>
      </template>
    </Variant>
    <Variant title="validation">
      <template #default>
        <BnCheckbox
          v-model="state.single"
          :rules="(isRequired as GenericValidateFunction)"
          name="color"
          value="Checked"
          color="orange"
        >
          This is a checkbox
        </BnCheckbox>
      </template>
    </Variant>
  </Story>
</template>

<style>
.__histoire-sandbox {
  padding: 10px;
}
</style>
