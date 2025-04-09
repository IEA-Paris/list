<template>
  <div class="d-flex flex-grow-1 flex-column">
    <v-text-field
      v-model.trim="search"
      :placeholder="$t('list.search-type', [$t(type)])"
      prepend-inner-icon="mdi-magnify"
      single-line
      class="transition-swing"
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
          {{ $t("list.search-type", [$t(type)]) }}
        </div>
      </template>
    </v-text-field>
    <v-expand-transition v-if="type === 'all'">
      <v-list
        v-show="search.length"
        lines="three"
        item-props
        style="max-height: 300px"
        class="overflow-y-auto"
      >
        <div v-if="rootStore.loading" class="d-flex justify-center py-6">
          <v-progress-circular color="black" size="64" indeterminate />
        </div>
        <template v-for="(item, index) in results">
          <v-list-subheader
            v-if="item.type && item.type === 'subheader'"
            :key="'subheader-' + index"
          >
            {{ item.name }}
          </v-list-subheader>
          <div
            v-else-if="item.type && item.type === 'no-result'"
            :key="'no-result-' + index"
            class="mx-6"
          >
            {{ $t("no-result") }}
          </div>
          <v-divider
            v-else-if="item.type && item.type === 'divider'"
            :key="'divider-' + index"
            inset
          />
          <ListAtomsSearchItem
            v-else
            :key="'item- ' + index"
            :index
            :item
            :type="item.type"
          />
        </template>
      </v-list>
    </v-expand-transition>
  </div>
</template>

<script setup>
import { useDebounceFn } from "@vueuse/core";
import { useRootStore } from "../../../stores/root";
import { useNuxtApp, useI18n } from "#imports";

const { locale, t } = useI18n();
const rootStore = useRootStore();
const { $stores } = useNuxtApp();
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const results = computed(() => {
  const storeRst = rootStore.results;
  const rst =
    (Object.keys(storeRst).length &&
      Object.keys(storeRst)
        .sort((a, b) => {
          return storeRst[b]?.items?.length - storeRst[a]?.items?.length;
        })
        .reduce((acc, key, index) => {
          const items = storeRst[key]?.items;
          const total = storeRst[key]?.total;
          if (total === 0 && index === 0) {
            acc.push({ type: "no-result" });
            return acc;
          }
          if (items?.length) {
            acc.push({ type: "subheader", name: t("items." + key, 2) });
            acc.push(
              ...items.map((item) => ({
                prependAvatar: item?.image?.url || "mdi-square",
                title: item.name || item.firstname + " " + item.lastname,
                subtitle: item.summary || item.biography,
                id: item.id,
                type: key,
              }))
            );
          }
          acc.push({ type: "divider" });
          return acc;
        }, [])) ||
    {};

  return rst;
});
const search = computed({
  get() {
    return props.type === "all" ? rootStore.search : $stores[props.type].search;
  },
  set: await useDebounceFn(async function (v) {
    await rootStore.updateSearch({
      type: props.type,
      search: v || "",
      lang: locale.value,
    });
  }, 300),
});
</script>

<style lang="scss" scoped></style>
