<script setup lang="ts">
import { GenericValidateFunction } from 'vee-validate';
import { reactive } from 'vue';
import BnToggle from './BnToggle.vue';

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
  single: true,
  array: ['Item 1', 'Item 2'],
  object: [],
  disabled: undefined,
  validateCustom: undefined,
});

/* eslint-disable max-len, vue/max-len */
const warningIcon = 'M11.9998 9.00006V12.7501M2.69653 16.1257C1.83114 17.6257 2.91371 19.5001 4.64544 19.5001H19.3541C21.0858 19.5001 22.1684 17.6257 21.303 16.1257L13.9487 3.37819C13.0828 1.87736 10.9167 1.87736 10.0509 3.37819L2.69653 16.1257ZM11.9998 15.7501H12.0073V15.7576H11.9998V15.7501Z';
/* eslint-enable max-len, vue/max-len */

function isRequired(val: string) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}
</script>

<template>
  <Story
    title="BnToggle"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <Variant title="default">
      <template #default>
        <BnToggle
          v-model="state.single"
          name="single"
          :value="true"
        >
          This is a toggle
        </BnToggle>
      </template>
    </Variant>
    <Variant title="disabled">
      <template #default>
        <BnToggle
          v-model="state.disabled"
          name="single"
          value="Checked"
          disabled
        >
          This is a toggle
        </BnToggle>
      </template>
    </Variant>
    <Variant title="array">
      <template #default>
        <template
          v-for="value in checkboxArrayValues"
          :key="value"
        >
          <BnToggle
            v-model="state.array"
            name="array"
            :value="value"
          >
            {{ value }}
          </BnToggle>
        </template>
      </template>
    </Variant>
    <Variant title="object">
      <template #default>
        <template
          v-for="value in checkboxObjectValues"
          :key="value.id"
        >
          <BnToggle
            v-model="state.object"
            name="object"
            :value="value"
          >
            {{ value.name }}
          </BnToggle>
        </template>
      </template>
    </Variant>
    <Variant title="color">
      <template #default>
        <BnToggle
          v-model="state.single"
          name="color"
          value="Checked"
          color="lime"
        >
          This is a toggle
        </BnToggle>
      </template>
    </Variant>
    <Variant title="validation">
      <template #default>
        <BnToggle
          v-model="state.single"
          :rules="(isRequired as GenericValidateFunction)"
          name="color"
          value="Checked"
          color="lime"
        >
          This is a toggle
        </BnToggle>
      </template>
    </Variant>
    <Variant title="Validation with custom bottom error text">
      <template #default>
        <BnToggle
          v-model="state.validateCustom"
          :rules="(isRequired as GenericValidateFunction)"
          name="color"
          value="Checked"
          color="lime"
        >
          This is a toggle
          <template #bottom="{ errorMessage, valid, touched }">
            <div
              v-if="!valid && touched"
              class="mt-1 flex items-center text-rose-700"
            >
              <svg
                viewBox="0 0 24 24"
                class="fill-none mr-1 h-4 w-4 stroke-current stroke-2"
              >
                <path
                  :d="warningIcon"
                />
              </svg>
              <span class="mr-1">
                {{ errorMessage }}
              </span>
              <svg
                viewBox="0 0 24 24"
                class="fill-none mr-1 h-4 w-4 stroke-current stroke-2"
              >
                <path
                  :d="warningIcon"
                />
              </svg>
            </div>
          </template>
        </BnToggle>
      </template>
    </Variant>
  </Story>
</template>

<style>
.__histoire-sandbox {
  padding: 10px;
}
</style>
