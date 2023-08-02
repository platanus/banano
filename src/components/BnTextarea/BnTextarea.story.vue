<script setup lang="ts">
import { GenericValidateFunction } from 'vee-validate';
import { reactive } from 'vue';
import BnTextarea from './BnTextarea.vue';

const state = reactive({
  value: 'Hello world!',
  validate: undefined,
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
    title="BnTextarea"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <Variant title="default">
      <template #default>
        <BnTextarea
          v-model="state.value"
          name="default"
        />
      </template>
    </Variant>
    <Variant title="color">
      <template #default>
        <BnTextarea
          v-model="state.value"
          name="color"
          color="lime"
        />
      </template>
    </Variant>
    <Variant title="disabled">
      <template #default>
        <BnTextarea
          v-model="state.value"
          name="disabled"
          disabled
        />
      </template>
    </Variant>
    <Variant title="Validation">
      <template #default>
        <BnTextarea
          v-model="state.validate"
          name="validation"
          :rules="(isRequired as GenericValidateFunction)"
          placeholder="Once upon a time..."
        />
      </template>
    </Variant>
    <Variant title="Validation with custom bottom error text">
      <template #default>
        <BnTextarea
          v-model="state.validateCustom"
          name="validation"
          :rules="(isRequired as GenericValidateFunction)"
          placeholder="Once upon a time..."
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
        </BnTextarea>
      </template>
    </Variant>
    <Variant title="With classes customization">
      <template #default>
        <BnTextarea
          v-model="state.value"
          name="default"
          :classes="{
            textarea: [
              'border-4 border-purple-500',
              { 'border-green-500': !!state.value }
            ],
          }"
        />
      </template>
    </Variant>
  </Story>
</template>
