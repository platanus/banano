<script setup lang="ts">
import { Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/vue';

interface Props {
  open?: boolean,
  title?: string,
  description?: string,
  fullScreenOnMobile?: boolean,
  showCloseButton?: boolean,
  closeOnOverlayClick?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  title: undefined,
  description: undefined,
  fullScreenOnMobile: false,
  showCloseButton: true,
  closeOnOverlayClick: true,
});

const emit = defineEmits<{
  (e: 'close', value: boolean): void
}>();

</script>

<template>
  <Dialog
    class="bn-modal"
    :open="open"
    @close="props.closeOnOverlayClick && emit('close', $event)"
  >
    <div class="bn-modal__overlay" />
    <div class="bn-modal__wrapper">
      <DialogPanel
        class="bn-modal__content"
        :class="{
          'bn-modal__content--full-screen-on-mobile': fullScreenOnMobile,
        }"
      >
        <button
          v-if="showCloseButton"
          class="bn-modal__close-button"
          @click="emit('close', false)"
        >
          <svg
            class="bn-modal__close-button-icon"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
            />
          </svg>
        </button>
        <DialogTitle
          v-if="props.title"
          class="bn-modal__header"
        >
          {{ props.title }}
        </DialogTitle>
        <div class="bn-modal__body">
          <DialogDescription
            v-if="props.description"
            class="bn-modal__description"
          >
            {{ description }}
          </DialogDescription>
          <slot />
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
