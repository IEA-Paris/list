<template>
  <v-card
    v-ripple
    class="event-sliding-item cursor-pointer"
    elevation="2"
    height="280"
    @click="$router.push(localePath('/activities/events/' + item.slug[locale]))"
  >
    <v-card-text class="pa-4 d-flex flex-column h-100">
      <!-- Date section -->
      <div class="text-overline font-weight-black mb-2 text-primary">
        {{
          new Date(item.start).toLocaleDateString(locale, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        }}
      </div>
      
      <!-- Category badge -->
      <v-chip
        v-if="item.category"
        size="small"
        variant="outlined"
        color="primary"
        class="mb-3 align-self-start"
      >
        {{ $t("list.filters.events.category." + item.category) }}
      </v-chip>
      
      <!-- Event title -->
      <h3 class="text-h6 font-weight-bold mb-3 line-clamp-3">
        {{ item.name }}
      </h3>
      
      <!-- Event description if available -->
      <p v-if="item.description" class="text-body-2 text-grey-darken-2 line-clamp-4 flex-grow-1">
        {{ item.description }}
      </p>
      
      <!-- Location if available -->
      <div v-if="item.location" class="mt-auto pt-2">
        <v-icon size="small" class="mr-1">mdi-map-marker</v-icon>
        <span class="text-caption text-grey-darken-1">{{ item.location }}</span>
      </div>
    </v-card-text>
    
    <!-- Hover overlay -->
    <v-overlay 
      v-model="isHovered"
      contained
      opacity="0.1"
      class="d-flex align-center justify-center"
    >
      <v-icon size="large" color="primary">mdi-eye</v-icon>
    </v-overlay>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useLocalePath, useI18n } from "#imports"

const { locale } = useI18n()
const localePath = useLocalePath()

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { item, index } = props

const isHovered = ref(false)
</script>

<style scoped>
.event-sliding-item {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 12px;
  overflow: hidden;
}

.event-sliding-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
