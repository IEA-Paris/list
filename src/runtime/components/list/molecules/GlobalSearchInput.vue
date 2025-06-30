<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="d-flex align-center">
      <v-text-field
        v-model.trim="search"
        :placeholder="$t('list.search-type', [$t('items.' + type, 2)])"
        prepend-inner-icon="mdi-magnify"
        single-line
        class="transition-swing flex-grow-1"
        variant="outlined"
        hide-details
        clearable
        tile
        type="search"
        :loading="rootStore.loading"
      >
        <!--    :loading="$nuxt.loading || $store.state.loading" :class="{ 'mt-3':
        $store.state.scrolled }" -->
        <template v-if="!search" #label>
          <div class="searchLabel">
            {{
              type === "all"
                ? $t("search")
                : $t("list.search-type", [$t("items." + type, 2)])
            }}
          </div>
        </template>
      </v-text-field>

      <v-menu
        v-model="filterMenuOpen"
        :close-on-content-click="false"
        location="bottom end"
        offset="4"
      >
        <template #activator="{ props: menuProps }">
          <v-btn
            v-bind="menuProps"
            :rounded="0"
            variant="outlined"
            size="large"
            height="56"
          >
            <v-icon>mdi-filter</v-icon>
            <v-icon class="ml-1" size="small">
              {{ filterMenuOpen ? "mdi-chevron-up" : "mdi-chevron-down" }}
            </v-icon>
          </v-btn>
        </template>

        <v-card min-width="200">
          <v-list density="compact">
            <v-list-item
              v-for="(option, index) in filterOptions"
              :key="option.value"
              @click="toggleFilter(option)"
            >
              <template #prepend>
                <v-checkbox
                  hide-details
                  :model-value="categories.includes(index)"
                  @update:model-value="toggleFilter(option)"
                />
              </template>
              <v-list-item-title>{{ option.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core"
import { useRootStore } from "../../../stores/root"
import { computed, useI18n, ref } from "#imports"
const { locale, t } = useI18n()
const rootStore = useRootStore()

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
})

// Filter dropdown state
const filterMenuOpen = ref(false)

// Filter options
const filterOptions = [
  { value: "people", label: capitalize(t("items.people", 2)) },
  { value: "events", label: capitalize(t("items.events", 2)) },
  { value: "news", label: capitalize(t("items.news", 2)) },
  { value: "publications", label: capitalize(t("items.publications", 2)) },
  { value: "fellowships", label: capitalize(t("items.fellowships", 2)) },
  { value: "projects", label: capitalize(t("items.projects", 2)) },
]

// Toggle filter selection
const toggleFilter = (option) => {
  const index = props.categories.indexOf(option.value)
  if (index > -1) {
    props.categories.splice(index, 1)
  } else {
    props.categories.push(option.value)
  }

  emit("filter-change", {
    name: option.value,
    value: props.categories.includes(option.value),
  })
}

const search = computed({
  get() {
    return rootStore.search
  },
  set: await useDebounceFn(async function (v) {
    await rootStore.updateSearch({
      type: props.type,
      search: v || "",
      lang: locale.value,
    })
  }, 300),
})
</script>

<style lang="scss" scoped></style>
