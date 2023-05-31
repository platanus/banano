<script setup lang="ts">
import { GenericValidateFunction } from 'vee-validate';
import { reactive } from 'vue';
import BnInput from './BnInput.vue';

const state = reactive({
  value: 'Hello world!',
  emptyValue: undefined,
  validate: undefined,
  validateCustom: undefined,
});

/* eslint-disable max-len, vue/max-len */
const letterIcon = 'M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z';
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
          color="lime"
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
              class="h-4 w-4 text-gray-400"
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
              class="h-4 w-4 text-gray-400"
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
    <Variant title="prefix">
      <template #default>
        <BnInput
          v-model="state.value"
          name="prefix"
        >
          <template #prefix>
            +56 9
          </template>
        </BnInput>
      </template>
    </Variant>
    <Variant title="suffix">
      <template #default>
        <BnInput
          v-model="state.value"
          name="suffix"
        >
          <template #suffix>
            @gmail.com
          </template>
        </BnInput>
      </template>
    </Variant>
    <Variant title="prefix + suffix + icons">
      <template #default>
        <BnInput
          v-model="state.value"
          name="prefix + suffix + icons"
        >
          <template #prefix>
            USD
          </template>
          <template #icon-left>
            <svg
              viewBox="0 0 24 24"
              class="h-4 w-4 text-gray-400"
            >
              <path
                fill="currentColor"
                :d="letterIcon"
              />
            </svg>
          </template>
          <template #suffix>
            .00
          </template>
        </BnInput>
      </template>
    </Variant>
    <Variant title="Validation">
      <template #default>
        <BnInput
          v-model="state.validate"
          name="validation"
          :rules="(isRequired as GenericValidateFunction)"
        />
      </template>
    </Variant>
    <Variant title="Validation with custom bottom error text">
      <template #default>
        <BnInput
          v-model="state.validateCustom"
          name="validation"
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
