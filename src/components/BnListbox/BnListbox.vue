<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate';
import { ref, ComponentPublicInstance, watch, computed, toRefs } from 'vue';
import { useElementBounding } from '@vueuse/core';
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue';
import { computePosition, flip, offset } from '@floating-ui/dom';
import isEmpty from 'lodash/isEmpty';
import { type ComponentClassType } from '../../types/class';

interface ClassesProp {
  button?: ComponentClassType,
  tag?: ComponentClassType,
  options?: ComponentClassType,
  option?: ComponentClassType,
}

export type InputValue = number | string | Record<string, unknown> | undefined;

interface Props {
  modelValue?: InputValue | InputValue[]
  options: string[] | Record<string, unknown>[]
  name: string
  color?: string
  rules?: RuleExpression<InputValue | InputValue[]>
  disabled?: boolean
  multiple?: boolean
  trackBy?: string
  optionLabel?: string
  keepObjectValue?: boolean
  placeholder?: string
  classes?: ClassesProp,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: undefined,
  color: 'banano-base',
  rules: undefined,
  disabled: false,
  multiple: false,
  trackBy: undefined,
  optionLabel: undefined,
  keepObjectValue: false,
  placeholder: undefined,
  classes: () => ({}),
});

const useObjectOptions = !!props.trackBy && !!props.optionLabel;

function isObjectValue(value: InputValue): value is Record<string, unknown> {
  return useObjectOptions;
}

function isObjectOptions(value: InputValue[]): value is Record<string, unknown>[] {
  return useObjectOptions;
}

function isMultipleValue(value: InputValue | InputValue[]): value is InputValue[] {
  return props.multiple;
}

const emit = defineEmits<{
  (e: 'focus', event: Event): void,
  (e: 'blur', event: Event): void,
  (e: 'update:modelValue', value: InputValue | InputValue[]): void,
}>();

const { name, rules } = toRefs(props);

function parseValue(value: InputValue | InputValue[]) {
  if (!value) {
    return undefined;
  }

  if (isMultipleValue(value)) {
    return value.map((val) => {
      if (isObjectValue(val) && isObjectOptions(props.options) && !props.keepObjectValue) {
        return props.options.find((option: Record<string, unknown>) => option[props.trackBy as string] === val);
      }

      return val;
    });
  }

  if (isObjectValue(value) && isObjectOptions(props.options) && !props.keepObjectValue) {
    return props.options.find((option: Record<string, unknown>) => option[props.trackBy as string] === value);
  }

  return value;
}

function unparseValue(value: InputValue | InputValue[]) {
  if (!value) {
    return undefined;
  }

  if (isMultipleValue(value)) {
    return value.map((val) => {
      if (isObjectValue(val) && !props.keepObjectValue) {
        const foundOption = (props.options as Record<string, unknown>[])
          .find((option) => option[props.trackBy as string] === val[props.trackBy as string]);

        return foundOption ? foundOption[props.trackBy as string] as string : undefined;
      }

      return val;
    }).filter((val) => val !== undefined);
  }

  if (isObjectValue(value) && !props.keepObjectValue) {
    return value[props.trackBy as string] as string;
  }

  return value;
}

const { handleChange, value, meta, setTouched, errorMessage } = useField<InputValue | InputValue[]>(name, rules, {
  initialValue: !props.modelValue && props.multiple ? [] : props.modelValue,
  validateOnMount: true,
  syncVModel: true,
});

const parsedValue = computed(() => parseValue(value.value));

const listboxButtonRef = ref<ComponentPublicInstance>();
const {
  width: listboxButtonWidth, top: listboxButtonTop, left: listboxButtonLeft,
} = useElementBounding(listboxButtonRef);

const listboxOptionsRef = ref<ComponentPublicInstance>();
const LISTBOX_OFFSET = 4;
const buttonPositionAndOptionsPresenceForWatchDependencies = computed(() => ([
  listboxButtonTop.value,
  listboxButtonLeft.value,
  listboxOptionsRef.value?.$el,
]));
watch(buttonPositionAndOptionsPresenceForWatchDependencies, () => {
  if (listboxOptionsRef.value && listboxOptionsRef.value.$el && listboxButtonRef.value) {
    computePosition(
      listboxButtonRef.value.$el,
      listboxOptionsRef.value.$el,
      {
        strategy: 'fixed',
        placement: 'bottom-start',
        middleware: [flip(), offset(LISTBOX_OFFSET)],
      })
      .then((val) => {
        if (listboxOptionsRef.value && listboxOptionsRef.value.$el) {
          listboxOptionsRef.value.$el.style.top = `${val.y}px`;
          listboxOptionsRef.value.$el.style.left = `${val.x}px`;
        }
      });
  }
}, { flush: 'post' });

function onUpdate(val: InputValue | InputValue[]) {
  const unparsedValue = unparseValue(val);
  handleChange(unparsedValue);
}

const formValue = computed({
  get() {
    return parsedValue.value;
  },
  set(val: InputValue | InputValue[]) {
    onUpdate(val);
  },
});

function blur(e: Event) {
  setTouched(true);
  emit('blur', e);
}
</script>
<template>
  <div class="bn-listbox">
    <template v-if="!props.keepObjectValue">
      <template v-if="props.multiple">
        <input
          v-for="(val, idx) in value"
          :key="idx"
          :value="val"
          type="hidden"
          :name="`${name}[]`"
        >
      </template>
      <input
        v-else
        :value="value"
        type="hidden"
        :name="name"
      >
    </template>
    <Listbox
      v-model="formValue"
      :multiple="props.multiple"
      :disabled="props.disabled"
      as="div"
      class="bn-listbox__listbox"
      :by="props.trackBy"
    >
      <ListboxButton
        ref="listboxButtonRef"
        class="bn-listbox__button"
        :class="[
          `bn-listbox__button--${props.color}`,
          {
            'bn-listbox__button--error': !meta.valid && meta.touched,
            'bn-listbox__button--disabled': props.disabled
          },
          props.classes.button
        ]"
        @blur="blur"
        @focus="emit('focus', $event)"
      >
        <span
          v-if="placeholder && isEmpty(parsedValue)"
          class="bn-listbox__placeholder"
        >
          {{ placeholder }}
        </span>
        <div
          v-else-if="isMultipleValue(parsedValue) && !isEmpty(parsedValue)"
          class="bn-listbox__tags"
        >
          <template
            v-for="option in parsedValue"
            :key="isObjectValue(option) ? option[props.trackBy] : (option as string)"
          >
            <slot
              name="selected-multiple-template"
              :value="option"
            >
              <span
                class="bn-listbox__tag"
                :class="[
                  `bn-listbox__tag--${props.color}`, props.classes.tag
                ]"
              >
                {{ isObjectValue(option) ? option[props.optionLabel as string] : option }}
              </span>
            </slot>
          </template>
        </div>
        <slot
          v-else-if="!isEmpty(parsedValue)"
          name="selected-template"
          :value="parsedValue"
        >
          <span class="bn-listbox__selected-value">
            {{ isObjectValue(value as string | Record<string, unknown>) ?
              (parsedValue as Record<string, unknown>)[props.optionLabel as string] : parsedValue
            }}
          </span>
        </slot>
        <svg
          class="bn-listbox__icon"
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
          :class="[
            `bn-listbox-options--${props.color}`,
            props.classes.options
          ]"
          :style="`width: ${listboxButtonWidth}px`"
        >
          <ListboxOption
            v-for="option in props.options"
            v-slot="{ selected }"
            :key="isObjectValue(option) ? (option[props.trackBy as string] as string) : option"
            :value="option"
            class="bn-listbox-options__option"
            :class="[
              `bn-listbox-options__option--${props.color}`,
              props.classes.option
            ]"
          >
            <slot
              name="option-template"
              :option="option"
              :selected="selected"
            >
              <span class="bn-listbox-options__option-text">
                <template v-if="isObjectValue(option)">
                  {{ option[props.trackBy as string] ? option[props.optionLabel as string] : placeholder }}
                </template>
                <template v-else>
                  {{ option ? option : placeholder }}
                </template>
              </span>
              <svg
                v-if="selected"
                class="bn-listbox-options__selected-option-icon"
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
