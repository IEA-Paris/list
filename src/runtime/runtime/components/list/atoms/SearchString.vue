<template>
  <div class="mt-4 font-weight-light">
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
  </div>
</template>

<script setup>
import { useNuxtApp, ref } from "#imports"

const { $stores } = useNuxtApp()
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})
const feminine = ref(["news", "publications", "people"].includes(props.type))
</script>

<style lang="scss" scoped></style>
