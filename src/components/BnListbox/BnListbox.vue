<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { toRef, watch } from 'vue';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';

interface Props {
  modelValue?: string
  options: string[]
  name: string
  color?: string
  rules?: RuleExpression<unknown>
  disabled: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  color: 'base',
  rules: undefined,
  disabled: false,
});

const emit = defineEmits<{(e: 'update:modelValue', value: number | string): void}>();

const name = toRef(props, 'name');

const { value } = useField<string>(name, props.rules, {
  initialValue: props.modelValue,
});

watch(value, (newValue) => {
  if (newValue !== props.modelValue) {
    emit('update:modelValue', newValue);
  }
});

watch(
  () => props.modelValue,
  (newModel) => {
    if (newModel !== value.value) {
      value.value = newModel;
    }
  },
);
</script>

<template>
  <Listbox
    v-model="value"
    :disabled="props.disabled"
    as="div"
    class="bn-listbox"
    :class="[`bn-listbox--${props.color}`, { 'bn-listbox--disabled': props.disabled }]"
  >
    <ListboxButton class="bn-listbox__button">
      <span class="truncate">
        {{ value }}
      </span>
      <svg
        class="ml-auto h-6 w-6 shrink-0 text-gray-500"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
        />
      </svg>
    </ListboxButton>
    <ListboxOptions class="bn-listbox__options">
      <ListboxOption
        v-for="option in props.options"
        v-slot="{ selected }"
        :key="option"
        class="bn-listbox__option"
        :value="option"
      >
        <span class="truncate">{{ option }}</span>
        <svg
          v-if="selected"
          class="ml-auto h-[14px] w-[18px] shrink-0"
          viewBox="0 0 18 14"
          fill="none"
        >
          <path
            d="M6 11.17L1.83 7.00003L0.410004 8.41003L6 14L18 2.00003L16.59 0.590027L6 11.17Z"
            fill="currentColor"
          />
        </svg>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>
