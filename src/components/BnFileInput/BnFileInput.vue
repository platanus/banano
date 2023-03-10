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
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  color: 'base',
  rules: undefined,
  multiple: false,
  disabled: false,
});

const fileInputRef = ref<HTMLInputElement>();

const emit = defineEmits<{(e: 'update:modelValue', value: File[]): void}>();

const name = toRef(props, 'name');

const {
  value: inputValue,
  handleBlur,
  handleChange,
} = useField<File[]>(props.name, props.rules, {
  initialValue: props.modelValue,
});

function setFile(e: Event) {
  handleChange(e);
  const files = Array.from((e.target as HTMLInputElement).files || []);
  inputValue.value = files;
  const fileInput = e.target as HTMLInputElement;
  if (fileInput.files && fileInput.files.length > 0) {
    emit('update:modelValue', Array.from(fileInput.files));
  }
}

watch(
  () => props.modelValue,
  (newModel) => {
    if (newModel === inputValue.value) {
      return;
    }
    inputValue.value = newModel;
  },
);

const fileList = computed(() => {
  if (inputValue.value) {
    return inputValue.value.map((file) => file.name).join(', ');
  }

  return 'No file selected';
});
</script>

<template>
  <label
    class="bn-file-input"
    :class="[`bn-file-input--${props.color}`, { 'bn-file-input--disabled': props.disabled }]"
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
    <BnBtn
      size="xs"
      class="bn-file-input__button"
      variant="outline"
      :disabled="props.disabled"
    >
      Browse
    </BnBtn>
    <span class="bn-file-input__label">
      {{ fileList }}
    </span>
  </label>
</template>
