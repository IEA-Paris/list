<template>
  <v-row
    v-ripple
    no-gutters
    class="cursor-pointer highlight-on-hover"
    @click="
      $router.push(
        localePath({
          name: 'activities-projects-slug',
          params: { slug: item.slug[locale] },
        }),
      )
    "
  >
    <v-col v-if="mdAndUp" align-self="center" cols="1">
      <MiscAtomsImageContainer
        cover
        :loading="$stores.projects.loading"
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
        :name="item.name"
        :slug="item.slug[locale]"
        link="activities-projects-slug"
        width="50"
      />
    </v-col>
    <v-col align-self="center" class="text-h5 dense pl-2">
      <v-skeleton-loader v-if="rootStore.loading" type="heading" />
      <span
        v-else
        v-html="
          rootStore.search.length
            ? highlightAndTruncate(300, item.name, $rootStore.search.split(' '))
            : item.name
        "
      />
      <v-skeleton-loader
        v-if="rootStore.loading"
        :type="
          ['chip', 'chip@2', 'chip@3', 'chip@4', 'chip@4', 'chip@4'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      />
      <MiscMoleculesChipContainer :items="item.tags" size="small" />

      <MDC
        class="text-caption font-weight-light paragraph"
        :value="`${highlightAndTruncate(150, item.summary, rootStore.search.split(' '))}`"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
import { computed, useNuxtApp, useI18n, useLocalePath } from "#imports"

const { $stores } = useNuxtApp()
const { name, mdAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale } = useI18n()

const rootStore = useRootStore()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
const eventCategory = computed(() => {
  if (props.item.category) {
    return "list.filters.news.category." + props.item.category
  } else {
    return "list.filters.news.category.others"
  }
})
</script>
