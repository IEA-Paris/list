<template>
  <div class="d-flex align-center">
    <v-text-field
      :id="`global-search-input-${type}`"
      v-model.trim="search"
      :placeholder="
        type === 'all'
          ? t('search')
          : $t('list.search-type', [$t('items.' + type, 2)])
      "
      single-line
      class="transition-swing flex-grow-1"
      variant="outlined"
      hide-details
      clearable
      tile
      type="search"
      :loading="rootStore.loading"
      @keyup.enter="navigateToSearch"
      @click:append="navigateToSearch"
    >
      <template v-if="!search" #label>
        <div class="searchLabel">
          {{ $t("search") }}
        </div>
      </template>
    </v-text-field>

    <v-menu
      v-if="filter"
      v-model="filterMenuOpen"
      :close-on-content-click="false"
      location="bottom end"
      offset="4"
    >
      <template #activator="{ props: menuProps }">
        <v-btn
          v-bind="menuProps"
          :rounded="0"
          variant="text"
          size="large"
          height="56"
        >
          <v-icon>mdi-filter</v-icon>
          <v-icon class="ml-1" size="small">
            {{ filterMenuOpen ? "mdi-chevron-up" : "mdi-chevron-down" }}
          </v-icon>
          <v-tooltip activator="parent" location="start">
            {{ $t("filter-by-type") }}
          </v-tooltip>
        </v-btn>
      </template>

      <v-card min-width="200">
        <v-list density="compact">
          <v-list-item
            v-for="option in filterOptions"
            :key="option.value"
            @click="toggleFilter(option)"
          >
            <template #prepend>
              <v-checkbox
                hide-details
                :model-value="categories.includes(option.value)"
                @update:model-value="toggleFilter(option)"
              />
            </template>
            <v-list-item-title>{{ option.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
    <v-btn
      :rounded="0"
      variant="outlined"
      size="large"
      height="56"
      @keyup.enter="navigateToSearch"
      @click="navigateToSearch"
    >
      <v-icon size="large">mdi-magnify</v-icon>
      <v-tooltip activator="parent" location="start">{{
        $t("click-here-to-search")
      }}</v-tooltip>
    </v-btn>
  </div>
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core"
import { useRootStore } from "../../../stores/root"
import { computed, useI18n, ref, useLocalePath, useRouter } from "#imports"
const localePath = useLocalePath()
const { locale, t } = useI18n()
const rootStore = useRootStore()

// Utility function to capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1)
const emit = defineEmits(["filter-change"])
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  filter: {
    type: Boolean,
    default: false,
  },
})

// Filter dropdown state
const filterMenuOpen = ref(false)

// Filter options
const filterOptions = computed(() => [
  { value: "people", label: capitalize(t("items.people", 2)) },
  { value: "events", label: capitalize(t("items.events", 2)) },
  { value: "news", label: capitalize(t("items.news", 2)) },
  { value: "publications", label: capitalize(t("items.publications", 2)) },
  { value: "fellowships", label: capitalize(t("items.fellowships", 2)) },
  { value: "projects", label: capitalize(t("items.projects", 2)) },
])

// Toggle filter selection
const toggleFilter = (option) => {
  const currentCategories = [...props.categories]
  const index = currentCategories.indexOf(option.value)

  if (index > -1) {
    currentCategories.splice(index, 1)
  } else {
    currentCategories.push(option.value)
  }

  emit("filter-change", {
    name: option.value,
    value: currentCategories.includes(option.value),
    categories: currentCategories,
  })
}

const navigateToSearch = () => {
  navigateTo({
    path: localePath("/search"),
    query: rootStore.search ? { search: rootStore.search } : {},
  })
}

const search = computed({
  get() {
    return rootStore.search
  },
  set: useDebounceFn(function (v) {
    const value = v || ""
    if (!value && !rootStore.search) return

    if (props.type === "all") {
      rootStore.search = value
    } else {
      rootStore.updateSearch({
        type: props.type,
        search: value,
        lang: locale.value,
      })
    }
  }, 300),
})
</script>

<style lang="scss" scoped></style>
