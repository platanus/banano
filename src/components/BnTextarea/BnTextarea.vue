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
  color: 'base',
  rules: undefined,
});

const emit = defineEmits<{(e: 'update:modelValue', value: number | string): void}>();

const name = toRef(props, 'name');

const {
  value: inputValue,
  handleBlur,
  handleChange,
  meta,
  errorMessage,
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
const attrsWithoutClass = Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
</script>

<template>
  <div
    class="bn-textarea"
    :class="`bn-textarea--${props.color} ${attrs.class ? attrs.class : ''}`"
  >
    <textarea
      v-bind="attrsWithoutClass"
      :id="name"
      :value="(inputValue as string)"
      :name="name"
      class="bn-textarea__input"
      :class="{'bn-textarea__input--error': !meta.valid && meta.touched}"
      @input="onInput"
      @blur="handleBlur"
    />
    <p
      v-if="errorMessage && meta.touched"
      class="bn-textarea__error-message"
    >
      {{ errorMessage }}
    </p>
  </div>
</template>
