<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { toRefs, computed } from 'vue';
import { type ComponentClassType } from '../../types/class';
import useAttrsWithoutClass from '../../composables/useAttrsWithoutClass';

interface ClassesProp {
  input?: ComponentClassType,
}

export type ValueType = undefined | boolean | string | number | Record<string, unknown>;

interface Props {
  modelValue?: ValueType | ValueType[],
  value?: ValueType,
  name: string,
  color?: string,
  rules?: RuleExpression<ValueType | ValueType[]>,
  disabled?: boolean,
  uncheckedValue?: ValueType,
  classes?: ClassesProp,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  value: true,
  color: 'banano-base',
  rules: undefined,
  disabled: false,
  uncheckedValue: undefined,
  classes: () => ({}),
});

const { attrClass, attrsWithoutClass } = useAttrsWithoutClass();
defineOptions({ inheritAttrs: false });

const { name, uncheckedValue, rules, value } = toRefs(props);

const { handleChange, checked, meta, setTouched } = useField(name, rules, {
  type: 'checkbox',
  checkedValue: value,
  initialValue: props.modelValue,
  uncheckedValue,
  syncVModel: true,
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
    handleChange(newValue);
  } else {
    handleChange(checked?.value ? value : undefined);
  }
}

</script>

<template>
  <label
    class="bn-checkbox"
    :class="[
      {'bn-checkbox--error': hasError},
      {'bn-checkbox--disabled': props.disabled},
      attrClass,
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
        {'bn-checkbox__input--error': hasError},
        props.classes.input,
      ]"
      v-bind="attrsWithoutClass"
      :disabled="props.disabled"
      @change="onChange"
    >
    <slot />
  </label>
</template>
