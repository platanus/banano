<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { toRef, useAttrs } from 'vue';

interface Props {
  modelValue?: string | number
  name: string
  color?: string
  rules?: RuleExpression<unknown>,
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: undefined,
  color: 'banano-base',
  rules: undefined,
});

const emit = defineEmits<{(e: 'update:modelValue', value: number | string): void}>();

const name = toRef(props, 'name');

const {
  value: inputValue,
  handleBlur,
  handleChange,
  meta,
} = useField(name, props.rules, {
  initialValue: props.modelValue,
  valueProp: props.modelValue,
});

function onInput(event: Event) {
  inputValue.value = (event.target as HTMLInputElement).value;
  handleChange(event, true);
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}

const attrs = useAttrs();
</script>

<template>
  <textarea
    class="bn-textarea"
    :class="[
      `bn-textarea--${props.color} ${attrs.class ? attrs.class : ''}`,
      {'bn-textarea--error': !meta.valid && meta.touched},
    ]"
    :value="(inputValue as string)"
    :name="name"
    @input="onInput"
    @blur="handleBlur"
  />
</template>
