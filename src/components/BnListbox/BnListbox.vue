<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { toRef, watch, ref, ComponentPublicInstance, watchEffect } from 'vue';
import { useElementBounding } from '@vueuse/core';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { computePosition, flip, offset } from '@floating-ui/dom';

interface Props {
  modelValue?: string | string[]
  options: string[]
  name: string
  color?: string
  rules?: RuleExpression<unknown>
  disabled?: boolean
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  color: 'base',
  rules: undefined,
  disabled: false,
  multiple: false,
});

const emit = defineEmits<{(e: 'update:modelValue', value: string | string[]): void}>();

const name = toRef(props, 'name');

const { value } = useField<string|string[]>(name, props.rules, {
  initialValue: props.modelValue,
});

const listboxButtonRef = ref<ComponentPublicInstance>();
const { width: listboxButtonWidth } = useElementBounding(listboxButtonRef);

const listboxOptionsRef = ref<ComponentPublicInstance>();
const LISTBOX_OFFSET = 4;
watchEffect(() => {
  if (listboxOptionsRef.value && listboxOptionsRef.value.$el && listboxButtonRef.value) {
    computePosition(
      listboxButtonRef.value.$el,
      listboxOptionsRef.value.$el,
      {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [flip(), offset(LISTBOX_OFFSET)],
      }).then((val) => {
      if (listboxOptionsRef.value && listboxOptionsRef.value.$el) {
        listboxOptionsRef.value.$el.style.top = `${val.y}px`;
        listboxOptionsRef.value.$el.style.left = `${val.x}px`;
      }
    });
  }
}, { flush: 'post' });

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
    :multiple="props.multiple"
    :disabled="props.disabled"
    as="div"
    class="bn-listbox"
    :class="[`bn-listbox--${props.color}`, { 'bn-listbox--disabled': props.disabled }]"
  >
    <ListboxButton
      ref="listboxButtonRef"
      class="bn-listbox__button"
    >
      <template v-if="multiple">
        <div class="overflow-hidden">
          <span
            v-for="option in props.modelValue"
            :key="option"
            class="bn-listbox__tag"
          >
            {{ option }}
          </span>
        </div>
      </template>
      <template v-else>
        <span class="truncate">
          {{ value }}
        </span>
      </template>
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
    <Teleport to="body">
      <ListboxOptions
        ref="listboxOptionsRef"
        class="bn-listbox-options"
        :class="[`bn-listbox-options--${props.color}`]"
        :style="`width: ${listboxButtonWidth}px`"
      >
        <ListboxOption
          v-for="option in props.options"
          v-slot="{ selected }"
          :key="option"
          class="bn-listbox-options__option"
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
    </Teleport>
  </Listbox>
</template>
