<script setup lang="ts">
import { useField } from 'vee-validate';
import { toRef, useAttrs } from 'vue';

interface Props {
  modelValue?: string | number
  name: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: undefined,
  color: 'base',
});

const emit = defineEmits<{(e: 'update:modelValue', value: number | string): void}>();

const name = toRef(props, 'name');

const {
  value: inputValue,
  handleBlur,
  handleChange,
} = useField(name, undefined, {
  initialValue: props.modelValue,
  valueProp: props.modelValue,
});

function onInput(event: Event) {
  inputValue.value = (event.target as HTMLInputElement).value;
  handleChange(event, true);
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}

const attrs = useAttrs();
const attrsWithoutClass = Object.fromEntries(Object.entries(attrs).filter(([key, _]) => key !== 'class'));
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div
    class="bn-input"
    :class="`bn-input--${props.color} ${attrs.class}`"
  >
    <input
      v-bind="attrsWithoutClass"
      :id="name"
      :value="inputValue"
      :name="name"
      class="bn-input__input"
      @input="onInput"
      @blur="handleBlur"
    >
  </div>
</template>

