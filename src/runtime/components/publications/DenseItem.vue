<template>
  <v-row
    v-ripple
    no-gutters
    class="cursor-pointer highlight-on-hover my-2"
    @click="
      $router.push(localePath('/activities/publications/' + item.slug[locale]))
    "
  >
    <v-col v-if="mdAndUp" align-self="center" cols="1">
      <MiscAtomsImageContainer
        cover
        :loading="$stores.people.loading"
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
        :name="item.lastname + ' ' + item.firstname"
        :slug="item.slug[locale]"
        link="activities-publications-slug"
        width="80px"
      />
    </v-col>
    <v-col align-self="center" class="text-h5 dense pl-2">
      <v-skeleton-loader v-if="rootStore.loading" type="heading" />
      <template v-else>
        {{ item.name }}
        <div class="text-body-2">
          {{ item.summary }}
        </div>
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
          {{ $t(eventCategory) }} </v-chip
        ><v-chip class="ma-2" style="background-color: white; color: black">
          {{ $t(eventType) }}
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
    console.log("props.item.category: ", props.item.category)
    return "list.filters.publications.category." + props.item.category
  } else {
    return "list.filters.publications.category.OTHERS"
  }
})
const eventType = computed(() => {
  if (props.item.type) {
    console.log("props.item.type: ", props.item.type)
    return "list.filters.publications.type." + props.item.type
  } else {
    return "list.filters.publications.type.OTHERS"
  }
})
</script>
