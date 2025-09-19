<template>
  <v-sheet :to="pathPrefix">
    <v-row>
      <v-col v-if="lgAndUp" cols="3">
        <MiscAtomsImageContainer
          cover
          :src="item.image"
          :loading="rootStore.loading"
          :ratio="1 / 1"
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

const rootStore = useRootStore()
const { lgAndUp } = useDisplay()

const props = defineProps({
  item: { type: Object, required: true },
  pathPrefix: {
    type: String,
    required: true,
  },
})
</script>
