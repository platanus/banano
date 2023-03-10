<script setup lang="ts">
import { reactive } from 'vue';
import BnPagination from './BnPagination.vue';

const pages = 50;

const state = reactive({
  currentPage: 25,
});
</script>

<template>
  <Story title="BnPagination">
    <Variant title="default">
      <template #default>
        <BnPagination
          :total-pages="pages"
          :current-page="state.currentPage"
          @page-changed="state.currentPage = $event"
        />
      </template>
    </Variant>
  </Story>
</template>

<style>
  .__histoire-sandbox {
    display: flex;
    justify-content: center;
  }
  </style>
