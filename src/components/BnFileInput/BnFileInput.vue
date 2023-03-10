<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { computed, ref, toRef, watch } from 'vue';
import BnBtn from '../Btn/Btn.vue';

interface Props {
  modelValue?: File[]
  name: string
  color?: string
  rules?: RuleExpression<unknown>
  multiple?: boolean
  disabled?: boolean
  placeholder?: string
  variant?: string
  avatarShape?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  color: 'base',
  rules: undefined,
  multiple: false,
  disabled: false,
  placeholder: 'No file selected',
  variant: 'default',
  avatarShape: 'default',
});

const fileInputRef = ref<HTMLInputElement>();

const emit = defineEmits<{(e: 'update:modelValue', value: File[]): void}>();

const name = toRef(props, 'name');

const addingFile = ref(false);

const {
  value: inputValue,
  handleBlur,
  handleChange,
  setTouched,
  errorMessage,
  meta,
} = useField<File[]>(props.name, props.rules, {
  initialValue: props.modelValue,
});

function updateInputFiles() {
  const dataTransfer = new DataTransfer();

  inputValue.value.forEach((file) => {
    dataTransfer.items.add(file);
  });
  if (fileInputRef.value) {
    fileInputRef.value.files = dataTransfer.files;
  }
}

function setFile(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files || []);
  if (addingFile.value) {
    inputValue.value = [...inputValue.value, ...files];
    addingFile.value = false;
  } else {
    inputValue.value = files;
  }
  updateInputFiles();
  handleChange(files);
  setTouched(true);
  emit('update:modelValue', inputValue.value);
}

watch(
  () => props.modelValue,
  (newModel) => {
    if (newModel === inputValue.value) {
      return;
    }
    inputValue.value = newModel;
    updateInputFiles();
  },
);

const fileList = computed(() => {
  if (inputValue.value) {
    return inputValue.value.map((file) => file.name).join(', ');
  }

  return '';
});

function imagePreviewPath(file: File) {
  try {
    return URL.createObjectURL(file);
  } catch (e) {
    return undefined;
  }
}

function openFileDialog() {
  if (fileInputRef.value) {
    fileInputRef.value.click();
  }
}

function addFile() {
  addingFile.value = true;
  openFileDialog();
}

function removeFile(file: File) {
  const index = inputValue.value.indexOf(file);
  if (index > -1) {
    inputValue.value.splice(index, 1);
  }
  updateInputFiles();
}
</script>

<template>
  <div
    class="bn-file-input"
    :class="[
      `bn-file-input--${props.color}`,
      `bn-file-input--variants-${props.variant}`,
      {
        'bn-file-input--disabled': props.disabled,
        'bn-file-input--custom': $slots['default'],
        'bn-file-input--error': meta.touched && errorMessage,
      }
    ]"
  >
    <component
      :is="$slots['default'] ? 'div' : 'label'"
      class="bn-file-input__wrapper"
    >
      <input
        ref="fileInputRef"
        type="file"
        :name="name"
        class="bn-file-input__input"
        :multiple="props.multiple"
        :disabled="props.disabled"
        @change="setFile"
        @blur="handleBlur"
      >
      <slot
        :open-file-dialog="openFileDialog"
        :disabled="disabled"
        :image-preview-path="imagePreviewPath"
        :remove-file="removeFile"
        :add-file="addFile"
        :files="inputValue"
      >
        <template v-if="variant === 'default'">
          <BnBtn
            size="xs"
            class="bn-file-input__button"
            variant="outline"
            :disabled="props.disabled"
            @click="openFileDialog"
          >
            Browse
          </BnBtn>
        </template>
        <template v-if="variant === 'avatar'">
          <button
            class="bn-file-input__avatar"
            :class="`bn-file-input__avatar--${props.avatarShape}`"
            :disabled="props.disabled"
            @click="openFileDialog"
          >
            <img
              v-if="inputValue && inputValue[0] && imagePreviewPath(inputValue[0])"
              :src="imagePreviewPath(inputValue[0])"
              class="h-full w-full object-cover"
            >
            <template v-else>
              +
            </template>
          </button>
        </template>
        <div
          v-if="variant !== 'avatar'"
          class="bn-file-input__label"
        >
          <div
            v-if="fileList"
            class="flex w-full items-center"
          >
            <span class="truncate">
              {{ fileList }}
            </span>
            <button
              class="ml-auto shrink-0 text-gray-500"
              @click="inputValue = []"
            >
              <svg
                class="h-5 w-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19M8.46,11.88L9.87,10.47L12,12.59L14.12,10.47L15.53,11.88L13.41,14L15.53,16.12L14.12,17.53L12,15.41L9.88,17.53L8.47,16.12L10.59,14L8.46,11.88M15.5,4L14.5,3H9.5L8.5,4H5V6H19V4H15.5Z"
                />
              </svg>
            </button>
          </div>
          <span
            v-else
            class="bn-file-input__placeholder"
          >
            {{ props.placeholder }}
          </span>
        </div>
      </slot>
    </component>
    <p
      v-if="errorMessage && meta.touched && !$slots['default']"
      class="bn-input__error-message"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
