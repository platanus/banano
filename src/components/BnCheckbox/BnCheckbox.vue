<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { toRef, useAttrs } from 'vue';

type valueTypes = undefined | boolean | string | number | Record<string, unknown>;

interface Props {
  modelValue?: valueTypes | valueTypes[],
  value: valueTypes,
  name: string,
  color?: string,
  rules?: RuleExpression<unknown>,
  disabled?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  value: undefined,
  color: 'base',
  rules: undefined,
  disabled: false,
});

const emit = defineEmits<{(e: 'update:modelValue', value: valueTypes | valueTypes[]): void}>();

const name = toRef(props, 'name');

const { handleChange, checked, meta, setTouched } = useField(props.name, props.rules, {
  type: 'checkbox',
  checkedValue: props.value,
  initialValue: props.modelValue,
});

function onChange(e: Event) {
  const input = e.target as HTMLInputElement;
  setTouched(true);

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

const attrs = useAttrs();
const attrsWithoutClass = Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
</script>

<template>
  <label
    class="bn-checkbox"
    :class="[
      `bn-checkbox--${props.color}`,
      {'bn-checkbox--error': !meta.valid && meta.touched},
      {'bn-checkbox--disabled': props.disabled},
    ]"
  >
    <input
      :checked="checked"
      :value="value"
      type="checkbox"
      :name="name"
      class="bn-checkbox__input"
      v-bind="attrsWithoutClass"
      @change="onChange"
    >
    <slot />
  </label>
</template>
