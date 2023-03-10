<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef } from 'vue';

const props = defineProps<{
  modelValue?: unknown | unknown[],
  value: unknown,
  name: string,
  color?: string,
}>();

const emit = defineEmits<{(e: 'update:modelValue', value: unknown): void}>();

const name = toRef(props, 'name');

const { handleChange, checked } = useField(props.name, undefined, {
  type: 'checkbox',
  checkedValue: props.value,
  initialValue: props.modelValue,
});

function onChange(e: Event) {
  const input = e.target as HTMLInputElement;

  if (Array.isArray(props.modelValue)) {
    const newValue = [...props.modelValue];
    if (input.checked) {
      newValue.push(props.value);
    } else {
      newValue.splice(newValue.indexOf(props.value), 1);
    }
    emit('update:modelValue', newValue);
  } else {
    emit('update:modelValue', input.checked ? props.value : undefined);
  }
  handleChange(e);
}
</script>

<template>
  <label
    class="bn-checkbox"
    :class="`bn-checkbox--${props.color}`"
  >
    <input
      :checked="checked"
      :value="value"
      type="checkbox"
      :name="name"
      class="bn-checkbox__input"
      @change="onChange"
    >
    <slot />
  </label>
</template>
