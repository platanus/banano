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
const attrsWithoutClass = Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<template>
  <div
    class="bn-input"
    :class="`bn-input--${props.color} ${attrs.class ? attrs.class : ''}`"
  >
    <div
      v-if="$slots['prefix']"
      class="bn-input__prefix"
    >
      <slot name="prefix" />
    </div>
    <div class="relative w-full">
      <div
        v-if="$slots['icon-left']"
        class="bn-input__icon-left"
      >
        <slot name="icon-left" />
      </div>
      <input
        v-bind="attrsWithoutClass"
        :id="name"
        :value="inputValue"
        :name="name"
        class="bn-input__input"
        :class="{
          'bn-input__input--icon-left': $slots['icon-left'],
          'bn-input__input--icon-right': $slots['icon-right'],
          'bn-input__input--prefix': $slots['prefix'],
          'bn-input__input--suffix': $slots['suffix'],
          'bn-input__input--error': !meta.valid && meta.touched,
        }"
        @input="onInput"
        @blur="handleBlur"
      >
      <div
        v-if="$slots['icon-right']"
        class="bn-input__icon-right"
      >
        <slot name="icon-right" />
      </div>
    </div>
    <div
      v-if="$slots['suffix']"
      class="bn-input__suffix"
    >
      <slot name="suffix" />
    </div>
  </div>
</template>

