<script setup lang="ts">
import { reactive } from 'vue';
import BnBtn from '../BnBtn/BnBtn.vue';
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
        <BnBtn @click="state.open = true">
          Open modal
        </BnBtn>
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
        <BnBtn @click="state.open = true">
          Open modal
        </BnBtn>
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
    <Variant
      title="With classes customization"
      auto-props-disabled
    >
      <template #default>
        <BnBtn @click="state.open = true">
          Open modal
        </BnBtn>
        <BnModal
          title="This is the header"
          description="This is the body"
          :open="state.open"
          :classes="{
            overlay: 'bg-yellow-500/30',
            content: 'border-2 border-yellow-500',
            'close-button': 'text-red-500',
            header: 'bg-yellow-200 text-purple-900',
            body: 'bg-yellow-50 text-black',
          }"
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
