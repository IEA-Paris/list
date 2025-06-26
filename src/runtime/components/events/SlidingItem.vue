<template>
  <v-sheet class="d-flex sliding-item flex-md-row flex-column px-6">
    <MiscAtomsDateStamp
      :date-start="item.start"
      :date-stop="item.stop"
      :loading="loading"
      class="mr-4 mb-6 mb-md-0"
      style="min-width: 70px"
    />
    <div
      class="d-flex flex-column"
      :style="
        'min-width:' +
        [250, 300, 350, 380, 430, 460][
          ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
        ] +
        'px!important;'
      "
    >
      <MiscAtomsImageContainer
        cover
        :ratio="1"
        :src="item.image"
        link="activities-events-slug"
        :slug="item.id"
        :loading="loading"
        :to="
          localePath({
            name: 'activities-events-slug',
            params: { slug: item.slug[locale] },
          })
        "
        style="cursor: pointer"
      />
      <nuxt-link
        class="mt-6 pl-0 text-h6 text-md-h5 font-weight-medium sliding-item-title cursor-pointer"
        :to="
          localePath({
            name: 'activities-events-slug',
            params: { slug: item.slug[locale] },
          })
        "
      >
        <div class="text-overline text-uppercase">
          {{ $t(item.category) }}
        </div>
        {{ item.name }}
      </nuxt-link>
    </div>
  </v-sheet>
</template>
<script setup>
import { useDisplay } from "vuetify"
import { useLocalePath, useI18n } from "#imports"
const { locale } = useI18n()

const { name } = useDisplay()
const localePath = useLocalePath()

defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, required: true, default: false },
})
</script>
<style lang="scss"></style>
