<template>
  <v-sheet
    :to="
      localePath({
        name: 'activities-events-slug',
        params: { slug: item.name },
      })
    "
  >
    <v-row>
      <v-col v-if="lgAndUp" cols="3">
        <MiscAtomsImageContainer
          cover
          :src="item.image"
          :ratio="1 / 1"
          :link="item.name"
          :loading="rootStore.loading"
          name="activities-events-slug"
        />
      </v-col>
      <v-col cols="12" lg="9">
        <v-skeleton-loader v-if="rootStore.loading" type="heading, text@3" />
        <template v-else>
          <div class="text-h6">
            {{ item.name }}
          </div>
          <div class="text-body-1">
            {{ item.description }}
          </div>
        </template>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
import { useLocalePath } from "#imports"

const localePath = useLocalePath()
const rootStore = useRootStore()
const { lgAndUp } = useDisplay()

const props = defineProps({ item: { type: Object, required: true } })
</script>
