<script setup lang="ts">
import { GenericValidateFunction } from 'vee-validate';
import { reactive, Ref } from 'vue';
import BnFileInput from './BnFileInput.vue';

const icons = [
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#000"
      d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,
        2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z"
    />
  </svg>`,
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#000"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135
        5.824 3 7.938l3-2.647z"
    />
  </svg>`,
];

function createSVGFile(name: string, fileContent: string) {
  const file = new File([fileContent], name, { type: 'image/svg+xml' });

  return file;
}

/* eslint-disable max-len, vue/max-len */
const warningIcon = 'M11.9998 9.00006V12.7501M2.69653 16.1257C1.83114 17.6257 2.91371 19.5001 4.64544 19.5001H19.3541C21.0858 19.5001 22.1684 17.6257 21.303 16.1257L13.9487 3.37819C13.0828 1.87736 10.9167 1.87736 10.0509 3.37819L2.69653 16.1257ZM11.9998 15.7501H12.0073V15.7576H11.9998V15.7501Z';
/* eslint-enable max-len, vue/max-len */

const state = reactive({
  single: undefined,
  multiple: undefined,
  avatar: undefined,
  custom: [
    createSVGFile('icon1.svg', icons[0]),
    createSVGFile('icon2.svg', icons[1]),
  ],
  validateCustom: undefined,
});

function isRequired(val: File[]) {
  if (val.length === 0) {
    return 'This field is required';
  }

  return true;
}
</script>

<template>
  <Story
    title="BnFileInput"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <Variant title="default">
      <template #default>
        <BnFileInput
          v-model="state.single"
          name="default"
        />
      </template>
    </Variant>
    <Variant title="multiple">
      <template #default>
        <BnFileInput
          v-model="state.multiple"
          name="multiple"
          multiple
        />
      </template>
    </Variant>
    <Variant title="disabled">
      <template #default>
        <BnFileInput
          v-model="state.single"
          name="disabled"
          disabled
        />
      </template>
    </Variant>
    <Variant title="avatar">
      <template #default>
        <BnFileInput
          v-model="state.avatar"
          name="avatar"
          variant="avatar"
        />
      </template>
    </Variant>
    <Variant title="avatar circle">
      <template #default>
        <BnFileInput
          v-model="state.avatar"
          name="avatar-circle"
          variant="avatar"
          avatar-shape="circle"
        />
      </template>
    </Variant>
    <Variant title="avatar disabled">
      <template #default>
        <BnFileInput
          v-model="state.avatar"
          name="avatar-disabled"
          variant="avatar"
          disabled
        />
      </template>
    </Variant>
    <Variant title="avatar disabled circle">
      <template #default>
        <BnFileInput
          v-model="state.avatar"
          name="avatar-circle"
          variant="avatar"
          avatar-shape="circle"
          disabled
        />
      </template>
    </Variant>
    <Variant title="custom template">
      <template #default>
        <BnFileInput
          v-model="state.custom"
          name="custom-template"
          multiple
        >
          <template #default="{ imagePreviewPath, openFileDialog, files, addFile, removeFile }">
            <div class="w-full">
              <button
                v-if="files.length > 0"
                class="mb-2 rounded border border-gray-300 py-1 px-2 text-sm shadow"
                @click="addFile()"
              >
                Add File
              </button>
              <button
                v-else
                class="mb-2 rounded border border-gray-300 py-1 px-2 text-sm shadow"
                @click="openFileDialog()"
              >
                Browse
              </button>
              <ul class="w-full">
                <li
                  v-for="file in files"
                  :key="file.name"
                  class="flex w-full items-center border border-t-0 p-1 text-sm first:border-t"
                >
                  <img
                    :src="imagePreviewPath(file)"
                    class="mr-2 h-6 w-6 rounded-full"
                  >
                  <span class="truncate">{{ file.name }}</span> ({{ file.size / 1000 }} KB)
                  <button
                    class="ml-auto"
                    @click="removeFile(file)"
                  >
                    🗑
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </BnFileInput>
      </template>
    </Variant>
    <Variant title="validation">
      <template #default>
        <BnFileInput
          v-model="state.single"
          name="required"
          :rules="(isRequired as GenericValidateFunction)"
        />
      </template>
    </Variant>
    <Variant title="Validation with custom bottom error text">
      <template #default>
        <BnFileInput
          v-model="state.validateCustom"
          name="required"
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
        </BnFileInput>
      </template>
    </Variant>
  </Story>
</template>
