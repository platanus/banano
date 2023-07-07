<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { computed, ref, toRef, watch } from 'vue';
import BnBtn from '../Btn/Btn.vue';

export type FileType = File[] | File | undefined;

interface Props {
  modelValue?: FileType
  name: string
  color?: string
  rules?: RuleExpression<FileType>
  multiple?: boolean
  disabled?: boolean
  buttonText?: string
  placeholder?: string
  variant?: string
  avatarShape?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'banano-base',
  modelValue: undefined,
  rules: undefined,
  multiple: false,
  disabled: false,
  placeholder: 'No file selected',
  buttonText: 'Browse',
  variant: 'default',
  avatarShape: 'default',
});

const emit = defineEmits<{(e: 'update:modelValue', value: FileType): void}>();

const fileInputRef = ref<HTMLInputElement>();

const name = toRef(props, 'name');
const rules = toRef(props, 'rules');

const addingFile = ref(false);

function isFileList(object: FileType): object is File[] {
  return props.multiple;
}

const {
  value: inputValue,
  handleBlur,
  setTouched,
  meta,
  errorMessage,
} = useField<FileType >(name, rules, {
  initialValue: props.modelValue,
  validateOnMount: true,
});

function updateInputFiles() {
  const dataTransfer = new DataTransfer();

  if (inputValue.value) {
    const files = isFileList(inputValue.value) ? inputValue.value : [inputValue.value];
    files.forEach((file) => {
      dataTransfer.items.add(file);
    });
  }

  if (fileInputRef.value) {
    fileInputRef.value.files = dataTransfer.files;
  }
}

function setFile(e: Event) {
  const files = Array.from((e.target as HTMLInputElement).files || []);

  if (isFileList(inputValue.value) && addingFile.value) {
    inputValue.value = [...inputValue.value, ...files];
    addingFile.value = false;
  } else if (isFileList(inputValue.value)) {
    inputValue.value = files;
  } else {
    inputValue.value = files[0];
  }
  emit('update:modelValue', inputValue.value);
  updateInputFiles();
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

const fileNames = computed(() => {
  if (!inputValue.value) {
    return '';
  }
  const files = isFileList(inputValue.value) ? inputValue.value : [inputValue.value];

  return files.map((file) => file.name).join(', ');
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
    setTouched(true);
  }
}

function addFile() {
  addingFile.value = true;
  openFileDialog();
}

function removeFile(file: File) {
  if (isFileList(inputValue.value)) {
    const index = inputValue.value.indexOf(file);
    if (index > -1) {
      inputValue.value.splice(index, 1);
    }
  } else {
    inputValue.value = undefined;
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
        'bn-file-input--error': meta.touched && !meta.valid,
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
        :value="inputValue"
      >
        <template v-if="variant === 'default'">
          <BnBtn
            size="xs"
            class="bn-file-input__button"
            variant="outline"
            :disabled="props.disabled"
            @click="openFileDialog"
          >
            {{ props.buttonText }}
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
              v-if="inputValue && !isFileList(inputValue) && inputValue && imagePreviewPath(inputValue)"
              :src="imagePreviewPath(inputValue)"
              class="bn-file-input__avatar-preview"
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
            v-if="fileNames"
            class="bn-file-input__file-list"
          >
            <span class="bn-file-input__file-names">
              {{ fileNames }}
            </span>
            <button
              class="bn-file-input__clear-button"
              @click="inputValue = undefined"
            >
              <svg
                class="bn-file-input__clear-button-icon"
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
    <slot
      name="bottom"
      :error-message="errorMessage"
      :valid="meta.valid"
      :touched="meta.touched"
    >
      <p
        v-if="!meta.valid && meta.touched"
        :name="name"
        class="bn-file-input__error-message"
      >
        {{ errorMessage }}
      </p>
    </slot>
  </div>
</template>

