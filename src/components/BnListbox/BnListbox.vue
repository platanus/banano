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
import isEmpty from 'lodash/isEmpty';

type inputValue = string|string[]|Record<string, unknown>|Record<string, unknown>[];

interface Props {
  modelValue?: string | string[] | Record<string, unknown> | Record<string, unknown>[]
  options: string[] | Record<string, unknown>[]
  name: string
  color?: string
  rules?: RuleExpression<unknown>
  disabled?: boolean
  multiple?: boolean
  trackBy?: string
  optionLabel?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  color: 'banano-base',
  rules: undefined,
  disabled: false,
  multiple: false,
  trackBy: undefined,
  optionLabel: undefined,
  placeholder: undefined,
});

const useObjectOptions = !!props.trackBy && !!props.optionLabel;

function isObjectValue(value: string | Record<string, unknown>): value is Record<string, unknown> {
  return useObjectOptions;
}

const emit = defineEmits<{(
  e: 'update:modelValue',
  value: string | string[] | Record<string, unknown> | Record<string, unknown>[]
): void}>();

const name = toRef(props, 'name');

const { value, meta, setTouched, errorMessage } = useField<inputValue>(name, props.rules, {
  initialValue: props.modelValue,
  validateOnMount: true,
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
  <div
    class="bn-listbox"
    :class="[`bn-listbox--${props.color}`, { 'bn-listbox--disabled': props.disabled }]"
  >
    <Listbox
      v-model="value"
      :multiple="props.multiple"
      :disabled="props.disabled"
      as="div"
      class="bn-listbox__listbox"
      :by="props.trackBy"
    >
      <ListboxButton
        ref="listboxButtonRef"
        class="bn-listbox__button"
        :class="{'bn-listbox__button--error': !meta.valid && meta.touched}"
        @blur="setTouched(true)"
      >
        <span
          v-if="placeholder && isEmpty(value)"
          class="bn-listbox__placeholder"
        >
          {{ placeholder }}
        </span>
        <template v-else-if="multiple && !isEmpty(value)">
          <div class="overflow-hidden">
            <template
              v-for="option in (value as string[] | Record<string, unknown>[])"
              :key="isObjectValue(option) ?
                option[props.trackBy] as string : option as string"
            >
              <slot
                name="selected-multiple-template"
                :value="option"
              >
                <span class="bn-listbox__tag">
                  {{ isObjectValue(option) ? option[props.optionLabel] : option }}
                </span>
              </slot>
            </template>
          </div>
        </template>
        <slot
          v-else-if="!isEmpty(value)"
          name="selected-template"
          :value="value"
        >
          <span class="truncate">
            {{ isObjectValue(value as string | Record<string, unknown>) ?
              (value as Record<string, unknown>)[props.optionLabel] : value
            }}
          </span>
        </slot>
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
            v-for="option in options"
            v-slot="{ selected }"
            :key="isObjectValue(option) ? option[props.trackBy] as string : option as string"
            :value="option"
            class="bn-listbox-options__option"
          >
            <slot
              name="option-template"
              :option="option"
              :selected="selected"
            >
              <span class="truncate">
                <template v-if="isObjectValue(option)">
                  {{ option[props.trackBy] ? option[props.optionLabel] : placeholder }}
                </template>
                <template v-else>
                  {{ option ? option : placeholder }}
                </template>
              </span>
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
            </slot>
          </ListboxOption>
        </ListboxOptions>
      </Teleport>
    </Listbox>
    <slot
      name="bottom"
      :error-message="errorMessage"
      :valid="meta.valid"
      :touched="meta.touched"
    >
      <p
        v-if="!meta.valid && meta.touched"
        :name="name"
        class="bn-listbox__error-message"
      >
        {{ errorMessage }}
      </p>
    </slot>
  </div>
</template>
