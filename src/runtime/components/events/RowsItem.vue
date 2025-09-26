<template>
  <v-divider v-if="index > 0" />

  <v-row class="py-8 px-6 highlight-on-hover" no-gutters>
    <v-col cols="12" md="1">
      <MiscAtomsDateStamp
        v-if="item.start"
        :loading="isLoading"
        :date-start="item.start"
        :date-stop="item.stop"
        class="pr-6 mt-md-2"
      />
    </v-col>
    <v-col cols="12" md="7" class="px-md-6 mt-6 mt-md-0">
      <v-row no-gutters>
        <v-col cols="12" class="pr-lg-6">
          <v-skeleton-loader
            v-if="isLoading"
            :type="
              [
                'heading, subtitle, text@6,subtitle, text,  ossein,  button, button',
                'heading, subtitle, text@6,subtitle, text,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
                'heading, subtitle, text@6,  ossein,  button, button',
              ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
            "
          />

          <div v-else>
            <div v-if="item.name" class="text-h4 text-black text-wrap mt-4">
              {{ item.name }}
            </div>
            <div class="mt-2 text-h6 text-overline font-weight-black">
              {{ $t("list.filters.events.category." + item.category) }}
            </div>

            <p
              class="text-wrap clamped-text"
              :style="
                '-webkit-line-clamp:' +
                [5, 5, 5, 10, 12, 14][
                  ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
                ]
              "
            >
              <MDC v-if="item.summary" :value="item.summary" />
            </p>

            <div v-if="lgAndUp" class="d-flex flex-row align-center flex-wrap">
              <EventsBadges :item />
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row
        v-if="mdAndDown"
        class="d-flex flex-row align-center flex-wrap"
        no-gutters
      >
        <v-col cols="12">
          <v-skeleton-loader
            v-if="isLoading"
            :type="
              ['article, heading, text, heading, text, button, button'][
                ['md'].indexOf(name || 'md')
              ]
            "
          />

          <div v-else>
            <EventsBadges :item="item" />
          </div>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="4">
      <MiscAtomsImageContainer
        cover
        :loading="isLoading"
        :src="item.image && item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify"
import { useRootStore } from "../../stores/root"
import { useNuxtApp, computed } from "#imports"

const { name, mdAndDown, lgAndUp } = useDisplay()

const rootStore = useRootStore()
const { $stores } = useNuxtApp()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  pathPrefix: {
    type: String,
    required: true,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
})

const isLoading = computed(() => rootStore.loading || props.loading)
</script>
