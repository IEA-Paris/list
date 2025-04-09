<template>
  <v-divider v-if="index > 0" />
  <v-row class="py-8 px-6 highlight-on-hover" no-gutters>
    <v-col cols="12" md="1">
      <MiscAtomsDateStamp
        v-if="item.start"
        :loading="$stores['events'].loading"
        :date-start="item.start"
        :date-stop="item.stop"
        class="pr-6 mt-md-2"
      />
    </v-col>
    <v-col cols="12" md="7" class="px-md-6 mt-6 mt-md-0">
      <v-row no-gutters>
        <v-col cols="12" class="pr-lg-6">
          <v-skeleton-loader
            v-if="rootStore.loading || $stores['events'].loading"
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
            <nuxt-link
              v-if="item.name"
              :to="
                localePath({
                  name: 'activities-events-slug',
                  params: { slug: item.slug[locale] },
                })
              "
              class="text-h4 text-black text-wrap mt-4"
            >
              {{ item.name }}
            </nuxt-link>
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
            v-if="rootStore.loading || $stores['events'].loading"
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
        :slug="item.slug[locale]"
        link="activities-events-slug"
        :loading="$stores['events'].loading"
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
      />
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useRootStore } from "../../stores/root";
import { useNuxtApp, useI18n, useLocalePath } from "#imports";

const { locale } = useI18n();
const { name, mdAndDown, lgAndUp } = useDisplay();
const localePath = useLocalePath();
const rootStore = useRootStore();
const { $stores } = useNuxtApp();
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});
</script>
