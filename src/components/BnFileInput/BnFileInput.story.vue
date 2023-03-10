<script setup lang="ts">
import { reactive } from 'vue';
import BnFileInput from './BnFileInput.vue';

const state = reactive({
  single: undefined,
  multiple: undefined,
  avatar: undefined,
});
</script>

<template>
  <Story
    title="BnFileInput"
    :layout="{ type: 'grid', width: '300px' }"
  >
    <Variant title="default">
      <template #default>
        <BnFileInput
          v-model="state.single"
          name="default"
        />
      </template>
    </Variant>
    <Variant title="multiple">
      <template #default>
        <BnFileInput
          v-model="state.multiple"
          name="multiple"
          multiple
        />
      </template>
    </Variant>
    <Variant title="disabled">
      <template #default>
        <BnFileInput
          v-model="state.single"
          name="disabled"
          disabled
        />
      </template>
    </Variant>
    <Variant title="avatar">
      <template #default>
        <BnFileInput
          v-model="state.avatar"
          name="avatar"
          variant="avatar"
        />
      </template>
    </Variant>
    <Variant title="avatar circle">
      <template #default>
        <BnFileInput
          v-model="state.avatar"
          name="avatar-circle"
          variant="avatar"
          avatar-shape="circle"
        />
      </template>
    </Variant>
    <Variant title="avatar disabled">
      <template #default>
        <BnFileInput
          v-model="state.avatar"
          name="avatar"
          variant="avatar"
          disabled
        />
      </template>
    </Variant>
    <Variant title="avatar disabled circle">
      <template #default>
        <BnFileInput
          v-model="state.avatar"
          name="avatar-circle"
          variant="avatar"
          avatar-shape="circle"
          disabled
        />
      </template>
    </Variant>
  </Story>
</template>
