<template>
  <v-card class="mx-auto" variant="flat">
    <v-row>
      <v-col cols="12" md="2">
        <MiscAtomsImageContainer
          cover
          :loading="rootStore.loading"
          :src="item.image"
          :ratio="1 / 1"
        />
      </v-col>
      <v-col cols="12" md="10">
        <div class="text-body-1">{{ item.name }}</div>
        <div>
          <span class="text-primary text-body-2"> {{ item.name }}</span> &mdash;
          <span class="text-body-2"> {{ item.subtitle }}</span>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { useRootStore } from "../../../stores/root"
const rootStore = useRootStore()
</script>
