<script setup lang="ts">
import { GenericValidateFunction } from 'vee-validate';
import { reactive } from 'vue';
import BnTextarea from './BnTextarea.vue';

const state = reactive({
  value: 'Hello world!',
  validate: undefined,
});

function isRequired(val: string) {
  if (!val) {
    return 'This field is required';
  }

  return true;
}
</script>

<template>
  <Story
    title="BnTextarea"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <Variant title="default">
      <template #default>
        <BnTextarea
          v-model="state.value"
          name="default"
        />
      </template>
    </Variant>
    <Variant title="color">
      <template #default>
        <BnTextarea
          v-model="state.value"
          name="color"
          color="orange"
        />
      </template>
    </Variant>
    <Variant title="disabled">
      <template #default>
        <BnTextarea
          v-model="state.value"
          name="disabled"
          disabled
        />
      </template>
    </Variant>
    <Variant title="Validation">
      <template #default>
        <BnTextarea
          v-model="state.validate"
          name="validation"
          :rules="(isRequired as GenericValidateFunction)"
          placeholder="Once upon a time..."
        />
      </template>
    </Variant>
  </Story>
</template>
