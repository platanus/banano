<script setup lang="ts">
import { computed } from 'vue';
import Btn from '../Btn/Btn.vue';

interface Props {
  as?: string,
  templateUrl?: string,
  totalPages: number,
  currentPage: number,
  delta?: number,
  color?: string,
}

const props = withDefaults(defineProps<Props>(), {
  as: 'nav',
  templateUrl: undefined,
  delta: 1,
  color: undefined,
});

const emit = defineEmits<{
  (e: 'page-changed', value: number): void,
}>();

const computedPages = computed(() => {
  function addSeparator(a: number, b: number) {
    const difference = b - a;
    if (difference > 1) {
      return [a, '...', b];
    } else if (difference === 0) {
      return [b];
    }

    return [a, b];
  }
  // eslint-disable-next-line no-magic-numbers
  const length = props.delta * 2;
  const pages = Array(length + 1)
    .fill(undefined)
    .reduce((acc: (number|string)[], _, index) => {
      const page: number = props.currentPage - props.delta + index;
      if (page > 0 && page <= props.totalPages) {
        if (index === 0) {
          return [...acc, ...addSeparator(1, page)];
        } else if (index === length) {
          return [...acc, ...addSeparator(page, props.totalPages)];
        }
        acc.push(page);
      }

      return acc;
    }, []);

  return pages;
});

const pageItems = computed(() => {
  const nextPage = props.currentPage + 1;
  const prevPage = props.currentPage - 1;

  return {
    prev: prevPage > 0 ? prevPage : undefined,
    next: nextPage <= props.totalPages ? nextPage : undefined,
  };
});

function parseUrl(urlTemplate: string, page: number) {
  return urlTemplate.replace(/(\{page\})/g, page.toString());
}
</script>

<template>
  <component
    :is="props.as"
    class="bn-pagination"
  >
    <ul class="bn-pagination__list">
      <li v-if="pageItems.prev">
        <Btn
          :color="props.color"
          variant="no-border"
          :href="props.templateUrl ? parseUrl(props.templateUrl, pageItems.prev) : undefined"
          @click="emit('page-changed', pageItems.prev as number)"
        >
          &laquo;
        </Btn>
      </li>
      <li
        v-for="page in computedPages"
        :key="page"
      >
        <Btn
          v-if="page !== '...'"
          :color="props.color"
          variant="no-border"
          :href="props.templateUrl ? parseUrl(props.templateUrl, page as number) : undefined"
          @click="emit('page-changed', page as number)"
        >
          {{ page }}
        </Btn>
        <Btn
          v-else
          :color="props.color"
          variant="no-border"
        >
          {{ page }}
        </Btn>
      </li>
      <li v-if="pageItems.next">
        <Btn
          :color="props.color"
          variant="no-border"
          :href="props.templateUrl ? parseUrl(props.templateUrl, pageItems.next as number) : undefined"
          @click="emit('page-changed', pageItems.next as number)"
        >
          &raquo;
        </Btn>
      </li>
    </ul>
  </component>
</template>
