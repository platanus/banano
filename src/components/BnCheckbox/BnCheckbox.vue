<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { toRef, useAttrs, computed } from 'vue';

export type ValueType = undefined | boolean | string | number | Record<string, unknown>;

interface Props {
  modelValue?: ValueType | ValueType[],
  value?: ValueType,
  name: string,
  color?: string,
  rules?: RuleExpression<ValueType | ValueType[]>,
  disabled?: boolean,
  uncheckedValue?: ValueType,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  value: true,
  color: 'banano-base',
  rules: undefined,
  disabled: false,
  uncheckedValue: undefined,
});

const emit = defineEmits<{ (e: 'update:modelValue', value: ValueType | ValueType[]): void }>();

const name = toRef(props, 'name');

const { handleChange, checked, meta, setTouched } = useField(props.name, props.rules, {
  type: 'checkbox',
  checkedValue: props.value,
  initialValue: props.modelValue,
  uncheckedValue: props.uncheckedValue,
});
const hasError = computed(() => !meta.valid && meta.touched);

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
      {'bn-checkbox--error': hasError},
      {'bn-checkbox--disabled': props.disabled},
    ]"
  >
    <input
      :checked="checked"
      :value="value"
      type="checkbox"
      :name="name"
      class="bn-checkbox__input"
      :class="[
        `bn-checkbox__input--${props.color}`,
        {'bn-checkbox__input--error': hasError}
      ]"
      v-bind="attrsWithoutClass"
      :disabled="props.disabled"
      @change="onChange"
    >
    <slot />
  </label>
</template>
