<template>
  <v-row class="my-2 highlight-on-hover" no-gutters>
    <v-col cols="12" class="px-4">
      <v-skeleton-loader v-if="loading" type="heading, text@6" />
      <template v-else>
        <div class="text-h5">{{ item.name }}</div>
        <div v-if="!expanded && item.summary" class="text-body-1 mt-1">
          <MDC :value="item.summary" />
        </div>
        <div
          v-else-if="expanded && item.description && item.description.length"
          class="text-body-1 mt-1"
        >
          <MDC :value="item.description.slice(0, 600)" />
        </div>
        <div
          v-if="item.summary || (item.description && item.description.length)"
          class="d-flex align-center mt-1 gap-2"
          @click.stop
        >
          <v-btn
            variant="text"
            size="small"
            density="compact"
            @click="expanded = !expanded"
          >
            {{ expanded ? "Show less" : "Show more" }}
            <v-icon end>{{
              expanded ? "mdi-chevron-up" : "mdi-chevron-down"
            }}</v-icon>
          </v-btn>
          <v-btn
            v-if="link && expanded"
            variant="text"
            size="small"
            density="compact"
            :href="link"
            @click.stop
          >
            View more
            <v-icon end>mdi-open-in-new</v-icon>
          </v-btn>
        </div>
      </template>
    </v-col>
  </v-row>
  <v-divider />
</template>

<script setup>
import { ref } from "#imports"

const props = defineProps({
  item: { type: Object, required: true },
  loading: { type: Boolean, default: false },
  link: { type: [String, Boolean], default: false },
})

const expanded = ref(false)
</script>

<style></style>
