<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { toRefs, ref } from 'vue';
import { type ComponentClassType } from '../../types/class';
import useAttrsWithoutClass from '../../composables/useAttrsWithoutClass';

interface ClassesProp {
  ball?: ComponentClassType,
  track?: ComponentClassType,
}

export type ValueTypes = undefined | boolean | string | number | Record<string, unknown>;

interface Props {
  modelValue?: ValueTypes | ValueTypes[],
  value?: ValueTypes,
  name: string,
  color?: string,
  rules?: RuleExpression<ValueTypes | ValueTypes[]>,
  disabled?: boolean,
  classes?: ClassesProp,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  value: true,
  color: 'banano-base',
  rules: undefined,
  disabled: false,
  classes: () => ({}),
});

const { attrClass, attrsWithoutClass } = useAttrsWithoutClass();
defineOptions({ inheritAttrs: false });

const { name, rules, value } = toRefs(props);

const { handleChange, checked, meta, setTouched, errorMessage } = useField(name, rules, {
  type: 'checkbox',
  checkedValue: value,
  initialValue: props.modelValue,
  validateOnMount: true,
  syncVModel: true,
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
    handleChange(newValue);
  } else {
    handleChange(checked?.value ? value : undefined);
  }
}

const isFocusedVisible = ref(false);
function setIsFocusedVisible(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.matches(':focus-visible')) {
    isFocusedVisible.value = true;
  } else {
    isFocusedVisible.value = false;
  }
}

</script>

<template>
  <div
    class="bn-toggle"
    :class="[`bn-toggle--${props.color}`, attrClass]"
  >
    <label
      class="bn-toggle__wrapper"
      :class="{ 'bn-toggle__wrapper--disabled': props.disabled }"
    >
      <div class="bn-toggle__toggle">
        <input
          :checked="checked"
          :value="value"
          type="checkbox"
          :name="name"
          class="bn-toggle__input"
          :class="{'bn-toggle__input--error': !meta.valid && meta.touched}"
          v-bind="attrsWithoutClass"
          :disabled="props.disabled"
          @change="onChange"
          @focusin="setIsFocusedVisible"
          @focusout="isFocusedVisible = false"
        >
        <div
          class="bn-toggle__track"
          :class="[
            {
              [`bn-toggle__track--checked bn-toggle__track--checked-${props.color}`]: checked,
              [`bn-toggle__track--focus-visible bn-toggle__track--focus-visible-${props.color}`]: isFocusedVisible,
            },
            props.classes.track,
          ]"
        />
        <div
          class="bn-toggle__ball"
          :class="[
            { 'bn-toggle__ball--checked': checked },
            props.classes.ball,
          ]"
        />
      </div>
      <slot />
    </label>
    <slot
      name="bottom"
      :error-message="errorMessage"
      :valid="meta.valid"
      :touched="meta.touched"
    >
      <p
        v-if="!meta.valid && meta.touched"
        :name="name"
        class="bn-toggle__error-message"
      >
        {{ errorMessage }}
      </p>
    </slot>
  </div>
</template>
