<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { computed, ref, toRef, useSlots } from 'vue';
import { type ComponentClassType } from '../../types/class';
import useAttrsWithoutClass from '../../composables/useAttrsWithoutClass';
import BnBtn from '../BnBtn/BnBtn.vue';

interface ClassesProp {
  wrapper?: ComponentClassType,
  button?: ComponentClassType,
  avatar?: ComponentClassType,
  label?: ComponentClassType,
  placeholder?: ComponentClassType,
  'clear-button'?: ComponentClassType,
}

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
  variant?: 'default' | 'avatar'
  avatarShape?: string
  classes?: ClassesProp
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
  classes: () => ({}),
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: FileType): void
  (e: 'focus', event: Event): void
  (e: 'blur', event: Event): void
}>();

const { attrClass, attrsWithoutClass } = useAttrsWithoutClass();
defineOptions({ inheritAttrs: false });

const fileInputRef = ref<HTMLInputElement>();

const name = toRef(props, 'name');
const rules = toRef(props, 'rules');

const addingFile = ref(false);
const isAvatar = computed(() => props.variant === 'avatar');
const hasDefaultSlot = useSlots().default !== undefined;

function isFileList(object: FileType): object is File[] {
  return props.multiple;
}

const {
  value: inputValue,
  handleChange,
  handleBlur,
  meta,
  errorMessage,
} = useField<FileType >(name, rules, {
  initialValue: props.modelValue,
  validateOnMount: true,
  syncVModel: true,
});

const inputValueList = computed(() => {
  if (isFileList(inputValue.value)) {
    return inputValue.value;
  }

  return inputValue.value ? [inputValue.value] : undefined;
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
  let newValue: FileType;
  if (isFileList(inputValue.value) && addingFile.value) {
    newValue = [...inputValue.value, ...files];
    addingFile.value = false;
  } else if (isFileList(inputValue.value)) {
    newValue = files;
  } else {
    newValue = files[0];
  }
  handleChange(newValue);
  updateInputFiles();
}

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
      handleChange([...inputValue.value.slice(0, index), ...inputValue.value.slice(index + 1)]);
    }
  } else {
    handleChange(undefined);
  }

  updateInputFiles();
}

function blur(event: Event) {
  handleBlur();
  emit('blur', event);
}
</script>

<template>
  <div
    class="bn-file-input"
    :class="[
      `bn-file-input--${props.color}`,
      attrClass
    ]"
  >
    <component
      :is="hasDefaultSlot ? 'div' : 'label'"
      class="bn-file-input__wrapper"
      :class="[
        `bn-file-input__wrapper--variants-${props.variant}`,
        {
          'bn-file-input__wrapper--disabled': props.disabled,
          'bn-file-input__wrapper--custom': $slots['default'],
          'bn-file-input__wrapper--error': meta.touched && !meta.valid,
        },
        props.classes.wrapper,
      ]"
      :tabindex="props.disabled || hasDefaultSlot || isAvatar ? '-1' : '0'"
      @blur="blur"
      @focus="$emit('focus', $event)"
      @keyup.enter="openFileDialog"
    >
      <input
        ref="fileInputRef"
        type="file"
        :name="name"
        class="bn-file-input__input"
        :multiple="props.multiple"
        :disabled="props.disabled"
        :model-value="inputValueList"
        v-bind="attrsWithoutClass"
        @change="setFile"
      >
      <slot
        :open-file-dialog="openFileDialog"
        :disabled="props.disabled"
        :image-preview-path="imagePreviewPath"
        :remove-file="removeFile"
        :add-file="addFile"
        :value="inputValue"
      >
        <template v-if="isAvatar">
          <button
            type="button"
            class="bn-file-input__avatar"
            :class="[
              `bn-file-input__avatar--${props.avatarShape}`,
              props.classes.avatar,
            ]"
            :disabled="props.disabled"
            @click="openFileDialog"
            @blur="blur"
            @focus="$emit('focus', $event)"
          >
            <img
              v-if="inputValue && !isFileList(inputValue) && imagePreviewPath(inputValue)"
              :src="imagePreviewPath(inputValue)"
              class="bn-file-input__avatar-preview"
            >
            <template v-else>
              +
            </template>
          </button>
        </template>
        <div
          v-else
          class="bn-file-input__label"
          :class="props.classes.label"
        >
          <div
            v-if="fileNames"
            class="bn-file-input__file-list"
          >
            <span class="bn-file-input__file-names">
              {{ fileNames }}
            </span>
            <button
              type="button"
              class="bn-file-input__clear-button"
              :class="props.classes['clear-button']"
              :disabled="props.disabled"
              @click.prevent="inputValue = undefined"
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
            :class="props.classes.placeholder"
          >
            {{ props.placeholder }}
          </span>
        </div>
        <template v-if="variant === 'default'">
          <BnBtn
            size="xs"
            type="button"
            shape="rounded"
            class="bn-file-input__button"
            :class="props.classes.button"
            variant="outline"
            :disabled="props.disabled"
            tabindex="-1"
            @click="openFileDialog"
          >
            {{ props.buttonText }}
          </BnBtn>
        </template>
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

