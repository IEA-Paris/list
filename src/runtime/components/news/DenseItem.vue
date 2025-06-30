<template>
  <v-row
    v-ripple
    no-gutters
    class="cursor-pointer highlight-on-hover"
    @click="$router.push(localePath('/activities/news/' + item.slug[locale]))"
  >
    <v-col v-if="mdAndUp" align-self="center" cols="1">
      <MiscAtomsImageContainer
        cover
        :loading="$stores.people.loading"
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
        :name="item.lastname + ' ' + item.firstname"
        :slug="item.slug"
        link="people-slug"
        width="80px"
      />
    </v-col>
    <v-col align-self="center" class="text-h5 dense pl-2">
      <v-skeleton-loader v-if="rootStore.loading" type="heading" />
      <template v-else>
        {{ item.name }}
      </template>
    </v-col>

    <v-col align-self="center">
      <v-skeleton-loader
        v-if="rootStore.loading"
        :type="
          ['chip', 'chip@2', 'chip@3', 'chip@4', 'chip@4', 'chip@4'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      />

      <template v-else>
        <v-chip class="ma-2" style="background-color: white; color: black">
          {{ $t(eventCategory) }}
        </v-chip>
        <MiscMoleculesChipContainer :items="item.tags" size="small" />
      </template>
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
