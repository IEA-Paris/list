<template>
  <v-btn-toggle
    value="currentPage"
    role="navigation"
    aria-label="Pagination Navigation"
    class="d-inline-flex"
  >
    <!-- Previous button -->
    <v-btn
      v-if="!(hidePrevNext && isFirstPage)"
      :disabled="isFirstPage"
      min-width="35"
      height="35"
      width="35"
      :tabindex="isFirstPage && hidePrevNext ? -1 : 0"
      aria-label="Previous Page"
      @click="onChange(currentPage - 1)"
      @keyup.enter="onChange(currentPage - 1)"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <!-- Page buttons and gaps -->
    <template v-for="(page, index) in renderPages" :key="page.key">
      <!-- Ellipsis gap -->
      <v-btn
        v-if="page.isGap"
        icon
        min-width="35"
        height="35"
        width="35"
        @click="onChange(getGapPage(index))"
        @keyup.enter="onChange(getGapPage(index))"
      >
        ...
      </v-btn>

      <!-- Page number -->
      <v-btn
        v-else
        :class="['page-button', { 'active-page': page.current }]"
        tabindex="0"
        min-width="35"
        height="35"
        tile
        width="35"
        :aria-current="page.current ? 'page' : undefined"
        :aria-label="
          page.current
            ? `Current page, Page ${page.value}`
            : `Go to Page ${page.value}`
        "
        @click="onChange(page.value)"
        @keyup.enter="onChange(page.value)"
      >
        {{ page.value }}
      </v-btn>
    </template>

    <!-- Next button -->
    <v-btn
      v-if="!(hidePrevNext && isLastPage)"
      :disabled="isLastPage"
      :tabindex="isLastPage && hidePrevNext ? -1 : 0"
      aria-label="Next Page"
      min-width="35"
      height="35"
      width="35"
      @click="onChange(currentPage + 1)"
      @keyup.enter="onChange(currentPage + 1)"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  pagePadding: { type: Number, default: 1, validator: (v) => v > 0 },
  pageGap: { type: Number, default: 2, validator: (v) => v > 0 },
  hidePrevNext: { type: Boolean, default: false },
});

const emit = defineEmits(["update"]);

// Computed state for prev/next disabled
const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(
  () => props.currentPage === props.totalPages || props.totalPages === 0
);

// Generate pages and gap positions
const renderPages = computed(() => {
  const createPage = (pageIndex) => ({
    key: `page-${pageIndex}`,
    value: pageIndex,
    current: pageIndex === props.currentPage,
  });
  const createGap = (pageIndex) => ({ key: `gap-${pageIndex}`, isGap: true });

  const pages = [];
  for (let i = 1; i <= props.totalPages; i++) {
    if (
      i === props.currentPage ||
      i < props.pageGap ||
      i > props.totalPages - props.pageGap + 1
    ) {
      pages.push(createPage(i));
      continue;
    }

    let min, max;
    if (props.currentPage <= props.pageGap + props.pagePadding) {
      min = props.pageGap + 1;
      max = min + props.pagePadding * 2;
    } else if (
      props.currentPage >=
      props.totalPages - props.pageGap - props.pagePadding
    ) {
      max = props.totalPages - props.pageGap;
      min = max - props.pagePadding * 2;
    } else {
      min = props.currentPage - props.pagePadding;
      max = props.currentPage + props.pagePadding;
    }

    if (
      (i >= min && i <= props.currentPage) ||
      (i <= max && i >= props.currentPage)
    ) {
      pages.push(createPage(i));
      continue;
    }

    if (i === props.pageGap) {
      if (
        min > props.pageGap + 1 &&
        props.currentPage > props.pageGap + props.pagePadding + 1
      ) {
        pages.push(createGap(i));
      } else {
        pages.push(createPage(i));
      }
      continue;
    }

    if (i === props.totalPages - props.pageGap + 1) {
      if (
        max < props.totalPages - props.pageGap &&
        props.currentPage < props.totalPages - props.pageGap - props.pagePadding
      ) {
        pages.push(createGap(i));
      } else {
        pages.push(createPage(i));
      }
      continue;
    }
  }
  return pages;
});

// Calculate page to jump when clicking gap
const getGapPage = (index) => {
  const before = renderPages.value[index - 1];
  const after = renderPages.value[index + 1] || { value: props.totalPages };
  return Math.floor((before.value + after.value) / 2);
};

function onChange(page) {
  emit("update", page);
}
</script>

<style scoped>
.page-button {
  background-color: transparent;
  color: black;
  border: 1px solid rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
}
.page-button:hover {
  background-color: #f0f0f0;
}
.page-button.active-page {
  background-color: black !important;
  color: white !important;
  transform: scale(1.05);
}
.page-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
}
</style>
