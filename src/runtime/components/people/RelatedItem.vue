<template>
  <v-sheet>
    <v-row>
      <v-col v-if="lgAndUp" cols="3">
        <MiscAtomsImageContainer
          cover
          :loading="rootStore.loading"
          :src="item.image"
          :ratio="1 / 1"
        />
      </v-col>
      <v-col cols="12" lg="9">
        <v-skeleton-loader v-if="rootStore.loading" type="heading" />
        <template v-else>
          <div class="text-h6">
            {{ item.firstname + " " + item.lastname }}
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
})
</script>
