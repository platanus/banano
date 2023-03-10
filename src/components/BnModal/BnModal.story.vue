<script setup lang="ts">
import { reactive } from 'vue';
import Btn from '../Btn/Btn.vue';
import BnModal from './BnModal.vue';

const state = reactive({
  open: true,
});
</script>

<template>
  <Story title="BnModal">
    <template #controls>
      <HstCheckbox
        v-model="state.open"
        title="Open"
      />
    </template>
    <Variant
      title="default"
      auto-props-disabled
    >
      <template #default>
        <Btn @click="state.open = true">
          Open modal
        </Btn>
        <BnModal
          title="Modal title"
          :open="state.open"
          @close="state.open = false"
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod interdum orci eget ornare.</p>
          <p>
            Donec vel congue urna, sed euismod ante. Curabitur tempus viverra diam at egestas.
            Nunc auctor ipsum sit amet turpis sodales, id porta enim dignissim. Maecenas volutpat erat orci.
          </p>
        </BnModal>
      </template>
    </Variant>
    <Variant
      title="Full screen on mobile"
      auto-props-disabled
    >
      <template #default>
        <Btn @click="state.open = true">
          Open modal
        </Btn>
        <BnModal
          title="Modal title"
          :open="state.open"
          :full-screen-on-mobile="true"
          @close="state.open = false"
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod interdum orci eget ornare.</p>
          <p>
            Donec vel congue urna, sed euismod ante. Curabitur tempus viverra diam at egestas.
            Nunc auctor ipsum sit amet turpis sodales, id porta enim dignissim. Maecenas volutpat erat orci.
          </p>
        </BnModal>
      </template>
    </Variant>
  </Story>
</template>
