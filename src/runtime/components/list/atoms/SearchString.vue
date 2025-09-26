<template>
  <div class="mt-4 font-weight-light">
    <ClientOnly v-if="showSkeleton">
      <v-skeleton-loader :type="isSmAndDown ? 'text@2' : 'text'" />
    </ClientOnly>
    <template v-else>
      <template
        v-if="
          (!$stores[type].search || $stores[type].search.length === 0) &&
          $stores[type].filtersCount === 0
        "
      >
        {{
          feminine
            ? $t(
                "list.0-items-found-f",
                [
                  $stores[type].total,
                  $t("items." + props.type, $stores[type].total),
                ],
                $stores[type].total,
              )
            : $t(
                "list.0-items-found",
                [
                  $stores[type].total,
                  $t("items." + props.type, $stores[type].total),
                ],
                $stores[type].total,
              )
        }}
      </template>
      <!--  searching for "XXX" -->
      <template
        v-else-if="
          !(!$stores[type].search || $stores[type].search.length === 0) &&
          $stores[type].filtersCount === 0
        "
      >
        {{
          feminine
            ? $t(
                "list.0-items-found-searching-for-f",
                [
                  $stores[type].total,
                  $t(
                    "items." + props.type,
                    $stores[type].total,
                    $stores[type].total,
                  ),
                  $stores[type].search,
                ],
                $stores[type].total,
              )
            : $t(
                "list.0-items-found-searching-for",
                [
                  $stores[type].total,
                  $t(
                    "items." + props.type,
                    $stores[type].total,
                    $stores[type].total,
                  ),
                  $stores[type].search,
                ],
                $stores[type].total,
              )
        }}
      </template>
      <!--  with X filters -->
      <template
        v-else-if="
          (!$stores[type].search || $stores[type].search.length === 0) &&
          $stores[type].filtersCount > 0
        "
      >
        {{
          feminine
            ? $t(
                "list.0-items-found-with-1-filter-f",
                [
                  $stores[type].total,
                  $t(
                    "items." + props.type,
                    $stores[type].total,
                    $stores[type].total,
                  ),
                  $stores[type].filtersCount,
                  $t("filters", $stores[type].filtersCount),
                ],
                $stores[type].total,
              )
            : $t(
                "list.0-items-found-with-1-filter",
                [
                  $stores[type].total,
                  $t("items." + type, $stores[type].total, $stores[type].total),
                  $stores[type].filtersCount,
                  $t("filters", $stores[type].filtersCount),
                ],
                $stores[type].total,
              )
        }}
      </template>
      <!--  searching for "XXX" with Y filters  -->
      <template
        v-else-if="
          $stores[type].search &&
          $stores[type].search.length &&
          $stores[type].filtersCount > 0
        "
      >
        {{
          feminine
            ? $t(
                "list.0-items-found-searching-for-with-1-filter-f",
                [
                  $stores[type].total,
                  $t("items." + type, $stores[type].total),
                  $stores[type].search,
                  $stores[type].filtersCount,
                  $t("filters", $stores[type].filtersCount),
                ],
                $stores[type].total,
              )
            : $t(
                "list.0-items-found-searching-for-with-1-filter",
                [
                  $stores[type].total,
                  $t("items." + type, $stores[type].total),
                  $stores[type].search,
                  $stores[type].filtersCount,
                  $t("filters", $stores[type].filtersCount),
                ],
                $stores[type].total,
              )
        }}
      </template>
      <template v-if="$stores[type].numberOfPages > 1">
        <!--   // Page X of Y -->
        {{
          $t("list.page-0-of-1", [
            $stores[type].page || 1,
            $stores[type].numberOfPages || 1,
          ])
        }}
      </template>
      <!--  X items per page -->
      <!-- displayed by X -->
      <!--  and sorted by X -->
    </template>
  </div>
</template>

<script setup>
import { useNuxtApp, ref, computed } from "#imports"
import { useDisplay } from "vuetify"
import { useRootStore } from "../../../stores/root"

const { $stores } = useNuxtApp()
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})
const feminine = ref(["news", "publications", "people"].includes(props.type))
const { smAndDown: isSmAndDown } = useDisplay()
const rootStore = useRootStore()

const isLoading = computed(() =>
  Boolean($stores[props.type] && $stores[props.type].loading),
)
const isTypeSearchActive = computed(() => {
  const s = $stores[props.type]?.search
  return Boolean(s && s.length)
})
const isGlobalSearchActive = computed(
  () => typeof rootStore.search === "string" && rootStore.search.length > 0,
)
const isAnySearchActive = computed(
  () => isTypeSearchActive.value || isGlobalSearchActive.value,
)
const isZeroTotal = computed(
  () => Number($stores[props.type]?.total || 0) === 0,
)
const itemsCount = computed(() =>
  Array.isArray($stores[props.type]?.items)
    ? $stores[props.type]?.items?.length || 0
    : 0,
)
const showSkeleton = computed(
  () =>
    isLoading.value ||
    (isZeroTotal.value && (isAnySearchActive.value || itemsCount.value > 0)),
)
</script>

<style lang="scss" scoped></style>
