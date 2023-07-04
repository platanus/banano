<script setup lang="ts">
import { GenericValidateFunction } from 'vee-validate';
import { reactive } from 'vue';
import BnListbox from './BnListbox.vue';

const state = reactive({
  single: 'Super Long Text lorem ipsum dolor sit amet, consectetur adipiscing elit',
  multiple: ['Option 2', 'Option 3', 'Option 4'],
  object: 1,
  // eslint-disable-next-line no-magic-numbers
  objectMultiple: [1, 2],
  objectWithObjectValue: { name: 'Label 1', id: 1 },
  objectMultipleWithObjectValue: [{ name: 'Label 1', id: 1 }, { name: 'Label 2', id: 2 }],
  empty: undefined,
  validate: undefined,
  validateCustom: undefined,
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

const selectOptionsWithEmpty = [
  '',
  ...selectOptions,
];

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
    <Variant title="placeholder">
      <template #default>
        <BnListbox
          v-model="state.empty"
          name="placeholder"
          :options="selectOptions"
          placeholder="Please select an option"
        />
      </template>
    </Variant>
    <Variant title="placeholder with empty choice">
      <template #default>
        <BnListbox
          v-model="state.single"
          name="placeholder"
          :options="selectOptionsWithEmpty"
          placeholder="Please select an option"
        />
      </template>
    </Variant>
    <Variant title="color">
      <template #default>
        <BnListbox
          v-model="state.single"
          name="color"
          :options="selectOptions"
          color="lime"
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
          placeholder="Please select an option"
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
    <Variant title="object with object value">
      <template #default>
        <BnListbox
          v-model="state.objectWithObjectValue"
          track-by="id"
          option-label="name"
          name="objectWithObjectValue"
          :options="objectOptions"
          keep-object-value
        />
      </template>
    </Variant>
    <Variant title="object multiple with object value">
      <template #default>
        <BnListbox
          v-model="state.objectMultipleWithObjectValue"
          track-by="id"
          option-label="name"
          name="objectMultipleWithObjectValue"
          multiple
          :options="objectOptions"
          keep-object-value
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
          <template #option-template="{ option, selected }">
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
          <template #selected-template="{ value }">
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
          <template #selected-multiple-template="{ value }">
            <div class="mr-1 inline-flex rounded border border-purple-800 bg-purple-300 px-1 text-purple-800">
              <span class="mr-1">📑</span>
              {{ value }}
            </div>
          </template>
        </BnListbox>
      </template>
    </Variant>
    <Variant title="Validation">
      <template #default>
        <BnListbox
          v-model="state.validate"
          :options="selectOptionsWithEmpty"
          name="validation"
          placeholder="Please select an option"
          :rules="(isRequired as GenericValidateFunction)"
        />
      </template>
    </Variant>
    <Variant title="Validation with custom bottom error text">
      <template #default>
        <BnListbox
          v-model="state.validateCustom"
          :options="selectOptionsWithEmpty"
          name="validation"
          placeholder="Please select an option"
          :rules="(isRequired as GenericValidateFunction)"
        >
          <template #bottom="{ errorMessage, valid, touched }">
            <div
              v-if="!valid && touched"
              class="mt-1 flex items-center text-rose-700"
            >
              <svg
                viewBox="0 0 24 24"
                class="fill-none mr-1 h-4 w-4 stroke-current stroke-2"
              >
                <path :d="warningIcon" />
              </svg>
              <span class="mr-1">
                {{ errorMessage }}
              </span>
              <svg
                viewBox="0 0 24 24"
                class="fill-none mr-1 h-4 w-4 stroke-current stroke-2"
              >
                <path :d="warningIcon" />
              </svg>
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
