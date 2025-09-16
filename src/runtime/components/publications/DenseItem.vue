<template>
  <v-row
    v-ripple
    no-gutters
    class="cursor-pointer highlight-on-hover my-2"
    @click="
      $router.push(localePath('/activities/publications/' + item.slug[locale]))
    "
  >
    <v-col v-if="mdAndUp" cols="1" class="align-center">
      <MiscAtomsImageContainer
        cover
        :loading="$stores.people.loading"
        :src="
          item && item.image && item.image.url ? item.image.url : '/default.png'
        "
        :ratio="1 / 1"
        :name="item.lastname + ' ' + item.firstname"
        :slug="item.slug && item.slug[locale]"
        link="activities-publications-slug"
        width="80px"
      />
    </v-col>
    <v-col class="pl-2">
      <div class="inline-flex flex-row flex-wrap">
        <v-skeleton-loader
          v-if="rootStore.loading"
          :type="
            ['chip', 'chip@2', 'chip@3', 'chip@4', 'chip@4', 'chip@4'][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        />

        <template v-else>
          <v-chip
            v-if="eventCategory"
            class="ma-2"
            variant="outlined"
            size="small"
            style="background-color: white; color: black"
          >
            {{ $t(eventCategory) }} </v-chip
          ><v-chip
            v-if="eventType"
            variant="outlined"
            size="small"
            class="mx-2"
            style="background-color: white; color: black"
          >
            {{ $t(eventType) }}
          </v-chip>
          <MiscMoleculesChipContainer
            v-if="item.tags && item.tags.length"
            :items="item.tags"
            size="small"
          />
        </template>
        <v-skeleton-loader v-if="rootStore.loading" type="heading" />
        <span
          v-else
          class="text-h5 dense paragraph"
          v-html="
            rootStore.search.length
              ? highlightAndTruncate(
                  300,
                  item.name,
                  $rootStore.search.split(' '),
                )
              : item.name
          "
        />
        <MDC
          class="text-body-1 font-weight-light paragraph"
          :value="`${highlightAndTruncate(150, item.summary, rootStore.search.split(' '))}`"
        />
      </div> </v-col
  ></v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
import { computed, useNuxtApp, useI18n, useLocalePath } from "#imports"
const rootStore = useRootStore()

const { $stores } = useNuxtApp()
const { name, mdAndUp } = useDisplay()
const localePath = useLocalePath()
const { locale } = useI18n()
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
    console.log("props.item.category: ", props.item.category)
    return "list.filters.publications.category." + props.item.category
  } else {
    return false
  }
})
const eventType = computed(() => {
  if (props.item.type) {
    console.log("props.item.type: ", props.item.type)
    return "list.filters.publications.type." + props.item.type
  } else {
    return false
  }
})
</script>
