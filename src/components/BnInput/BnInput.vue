<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { toRefs } from 'vue';
import { type ComponentClassType } from '../../types/class';
import useAttrsWithoutClass from '../../composables/useAttrsWithoutClass';

interface ClassesProp {
  input?: ComponentClassType,
  prefix?: ComponentClassType,
  suffix?: ComponentClassType,
}

interface Props {
  modelValue?: string | number
  name: string
  color?: string
  rules?: RuleExpression<string | number>,
  classes?: ClassesProp,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  color: 'banano-base',
  rules: undefined,
  classes: () => ({}),
});

const { attrClass, attrsWithoutClass } = useAttrsWithoutClass();
defineOptions({ inheritAttrs: false });

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

</script>

<template>
  <div
    class="bn-input"
    :class="attrClass"
  >
    <div class="bn-input__wrapper">
      <div
        v-if="$slots['prefix']"
        class="bn-input__prefix"
        :class="props.classes.prefix"
      >
        <slot name="prefix" />
      </div>
      <div class="bn-input__input-and-icons-wrapper">
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
          :class="[
            `bn-input__input--${props.color}`,
            {
              'bn-input__input--icon-left': $slots['icon-left'],
              'bn-input__input--icon-right': $slots['icon-right'],
              'bn-input__input--prefix': $slots['prefix'],
              'bn-input__input--suffix': $slots['suffix'],
              'bn-input__input--error': !meta.valid && meta.touched,
            },
            props.classes.input,
          ]"
          @input="handleChange"
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
        :class="props.classes.suffix"
      >
        <slot name="suffix" />
      </div>
    </div>
    <slot
      name="bottom"
      :error-message="errorMessage"
      :valid="meta.valid"
      :touched="meta.touched"
    >
      <p
        v-if="!meta.valid && meta.touched"
        :name="name"
        class="bn-input__error-message"
      >
        {{ errorMessage }}
      </p>
    </slot>
  </div>
</template>

