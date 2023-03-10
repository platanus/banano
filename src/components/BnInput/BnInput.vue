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
    class="bn-input flex"
    :class="`bn-input--${props.color} ${attrs.class ? attrs.class : ''}`"
  >
    <div
      v-if="$slots['prefix']"
      class="bn-input__prefix"
    >
      <slot name="prefix" />
    </div>
    <div class="relative">
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

