<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { toRefs, useAttrs } from 'vue';
import { type ComponentClassType } from '../../types/class';

interface ClassesProp {
  textarea?: ComponentClassType,
}

interface Props {
  modelValue?: string | number
  name: string
  color?: string
  rules?: RuleExpression<string | number>,
  classes?: ClassesProp,
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: undefined,
  color: 'banano-base',
  rules: undefined,
  classes: () => ({}),
});

const { name, rules } = toRefs(props);

const {
  value: inputValue,
  handleBlur,
  handleChange,
  meta,
  errorMessage,
} = useField(name, rules, {
  initialValue: props.modelValue,
  validateOnMount: true,
  syncVModel: true,
});

const attrs = useAttrs();
const attrsWithoutClass = Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
defineOptions({
  inheritAttrs: false,
});
</script>

<template>
  <div
    class="bn-textarea"
    :class="{
      [attrs.class as string]: attrs.class
    }"
  >
    <textarea
      v-bind="attrsWithoutClass"
      class="bn-textarea__textarea"
      :class="[
        `bn-textarea__textarea--${props.color}`,
        { 'bn-textarea__textarea--error': !meta.valid && meta.touched },
        props.classes.textarea,
      ]"
      :value="(inputValue as string)"
      :name="name"
      @input="handleChange"
      @blur="handleBlur"
    />
    <slot
      name="bottom"
      :error-message="errorMessage"
      :valid="meta.valid"
      :touched="meta.touched"
    >
      <p
        v-if="!meta.valid && meta.touched"
        :name="name"
        class="bn-textarea__error-message"
      >
        {{ errorMessage }}
      </p>
    </slot>
  </div>
</template>
