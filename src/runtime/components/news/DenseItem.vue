<template>
  <v-row
    v-ripple
    class="cursor-pointer highlight-on-hover"
    @click="$router.push(localePath('/news/' + item.slug[locale]))"
  >
    <v-col align-self="center" cols="7" class="text-h6 dense">
      <v-skeleton-loader
        v-if="rootStore.loading || $stores[type].loading"
        type="heading"
      />
      <template v-else>
        {{ item.name }}
      </template>
    </v-col>

    <v-col align-self="center" cols="5" class="dense">
      <v-skeleton-loader
        v-if="rootStore.loading || $stores[type].loading"
        :type="
          ['chip', 'chip@2', 'chip@3', 'chip@4', 'chip@4', 'chip@4'][
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
      />

      <template v-else>
        <v-chip class="ma-2" style="background-color: white; color: black">{{
          $t(eventCategory)
        }}</v-chip>
        <MiscMoleculesChipContainer :items="item.tags" size="small" />
      </template>
    </v-col>
  </v-row>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
const { $stores } = useNuxtApp()
const { name } = useDisplay()
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
