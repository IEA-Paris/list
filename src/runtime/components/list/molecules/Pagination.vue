<template>
  <v-btn-toggle
    value="currentPage"
    role="navigation"
    aria-label="Pagination Navigation"
  >
    <!--  TODO: switch to page as route param -->
    <v-btn
      v-if="!(hidePrevNext && firstPageSelected())"
      :disabled="firstPageSelected()"
      min-width="35"
      height="35"
      width="35"
      :tabindex="!hidePrevNext && firstPageSelected() ? -1 : 0"
      aria-label="Previous Page"
      nuxt
      @click="updatePage(currentPage - 1)"
      @keyup.enter="updatePage(currentPage - 1)"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>

    <template v-for="(page, index) in renderPages" :key="page.key">
      <v-btn
        v-if="page.isGap"
        min-width="35"
        height="35"
        width="35"
        icon
        nuxt
        @keyup.enter="updatePage(getGapPage(index))"
        @click="updatePage(getGapPage(index))"
      >
        ...
      </v-btn>
      <template v-else>
        <!-- <v-btn
          :class="{ 'active-page': !!page.current }"
          tabindex="0"
          outlined
          min-width="35"
          height="35"
          tile
          nuxt
          :active="!!page.current"
          :color="!!page.current ? 'white' : 'black'"
          text
          width="35"
          :aria-current="!!page.current ? 'true' : 'false'"
          :aria-label="
            page.current
              ? `Current page, Page ${page.value}`
              : `Goto Page ${page.value}`
          "
          @click="updatePage(page.value)"
          @keyup.enter="updatePage(page.value)"
        >
          {{ page.value }}
        </v-btn> -->

        <v-btn
          :class="['page-button', { 'active-page': page.current }]"
          tabindex="0"
          min-width="35"
          height="35"
          tile
          width="35"
          aria-current="page"
          :aria-label="
            page.current
              ? `Current page, Page ${page.value}`
              : `Goto Page ${page.value}`
          "
          @click="updatePage(page.value)"
          @keyup.enter="updatePage(page.value)"
        >
          {{ page.value }}
        </v-btn>
      </template>
    </template>

    <v-btn
      v-if="!(hidePrevNext && lastPageSelected())"
      :tabindex="!hidePrevNext && lastPageSelected() ? -1 : 0"
      :disabled="lastPageSelected()"
      aria-label="Next Page"
      min-width="35"
      height="35"
      width="35"
      nuxt
      @click="updatePage(currentPage + 1)"
      @keyup.enter="updatePage(currentPage + 1)"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-btn-toggle>
</template>

<script setup>
import { useRootStore } from "../../../stores/root";
import { useRoute, computed, useI18n } from "#imports";
const { locale } = useI18n();
const route = useRoute();
const rootStore = useRootStore();

// THIS COMPONENT IS INITIALLY BASED ON https://github.com/ashwinkshenoy/vue-simple/tree/master/packages/vs-pagination
// AND MODIFIED TO FIT INTO OUR NEEDS (Vuetify + nuxt 3)
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  pagePadding: {
    type: Number,
    default: 1,
    validator: (value) => {
      return value > 0;
    },
  },
  pageGap: {
    type: Number,
    default: 2,
    validator: (value) => {
      return value > 0;
    },
  },
  hidePrevNext: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "",
    required: true,
  },
});

const renderPages = computed(() => {
  const pages = [];
  for (let pageIndex = 1; pageIndex <= props.totalPages; pageIndex++) {
    if (
      pageIndex === props.currentPage ||
      pageIndex < props.pageGap ||
      pageIndex > props.totalPages - props.pageGap + 1
    ) {
      pages.push(createPage(pageIndex));
      continue;
    }

    let minimum;
    let maximum;

    if (props.currentPage <= props.pageGap + props.pagePadding) {
      minimum = props.pageGap + 1;
      maximum = minimum + props.pagePadding * 2;
    } else if (
      props.currentPage >=
      props.totalPages - props.pageGap - props.pagePadding
    ) {
      maximum = props.totalPages - props.pageGap;
      minimum = maximum - props.pagePadding * 2;
    } else {
      minimum = props.currentPage - props.pagePadding;
      maximum = props.currentPage + props.pagePadding;
    }

    if (
      (pageIndex >= minimum && pageIndex <= props.currentPage) ||
      (pageIndex >= props.currentPage && pageIndex <= maximum)
    ) {
      pages.push(createPage(pageIndex));
      continue;
    }

    if (pageIndex === props.pageGap) {
      if (
        minimum > props.pageGap + 1 &&
        props.currentPage > props.pageGap + props.pagePadding + 1
      ) {
        pages.push(createGap(pageIndex));
      } else {
        pages.push(createPage(pageIndex));
      }

      continue;
    }

    if (pageIndex === props.totalPages - props.pageGap + 1) {
      if (
        maximum < props.totalPages - props.pageGap &&
        props.currentPage < props.totalPages - props.pageGap - props.pagePadding
      ) {
        pages.push(createGap(pageIndex));
      } else {
        pages.push(createPage(pageIndex));
      }

      continue;
    }
  }

  return pages;
});

const createPage = (pageIndex) => {
  return {
    key: pageIndex,
    current: props.currentPage === pageIndex,
    value: pageIndex,
  };
};

const firstPageSelected = () => {
  return props.currentPage === 1;
};

const lastPageSelected = () => {
  return props.currentPage === props.totalPages || props.totalPages === 0;
};

const createGap = (pageIndex) => {
  return {
    key: pageIndex,
    isGap: true,
  };
};

const emit = defineEmits(["update"]);

const updatePage = (page) => {
  rootStore.updatePage({ page, type: props.type, lang: locale.value });
  emit("update", page);
};

const getGapPage = (index) => {
  return Math.floor(
    renderPages.value[index - 1].key +
      ((renderPages.value[index + 1].key || props.totalPages) -
        renderPages.value[index - 1].key) /
        2
  );
};
</script>

<style>
/* .active-page {
  background-color: #000 !important;
  color: #f5f5f5 !important;
} */
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
