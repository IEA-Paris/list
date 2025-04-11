<template>
  <v-col v-ripple cols="12" sm="6" md="4" lg="3" xl="2">
    <MiscAtomsImageContainer
      contain
      :src="item.image.url ? item.image : '/default.png'"
      :loading="$stores.publications.loading"
      :ratio="1 / 1"
      :title="item.name"
      link="activities-publications-slug"
      :slug="item.slug[locale]"
    />
  </v-col>
  <v-col
    v-ripple
    cols="12"
    sm="6"
    md="8"
    lg="9"
    xl="10"
    class="px-6 cursor-pointer"
    @click="
      router.push(localePath('/activities/publications/' + item.slug[locale]))
    "
  >
    <div>
      <v-skeleton-loader
        v-if="$stores.publications.loading"
        type="heading,ossein,text@8,ossein,button,button"
      />

      <template v-else>
        <div class="text-h5 text-sm-h3 text-md-h4 text-md-h4 my-6">
          {{ item.name }}
        </div>
        <div
          v-if="item.summary"
          class="text-wrap clamped-text"
          :style="
            '-webkit-line-clamp:' +
            [5, 5, 5, 10, 12, 14][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        >
          <MDC :value="item.summary" />
        </div>
        <v-btn
          class="mt-4"
          variant="outlined"
          tile
          :to="
            localePath({
              name: 'publications-slug',
              params: { slug: item.slug[locale] },
            })
          "
          :size="
            ['small', 'small', 'small', 'default', 'default', 'large'][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        >
          {{ $t("read-more") }}
        </v-btn>
        <v-btn
          v-if="item.url"
          variant="outlined"
          tile
          target="_blank"
          :href="item.url"
          class="mt-4 ml-4"
          prepend-icon="mdi-web"
          :size="
            ['small', 'small', 'small', 'default', 'default', 'large'][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        >
          {{ $t("visit-the-publications-website") }}
        </v-btn>
      </template>
    </div>
  </v-col>
  <v-divider />
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useNuxtApp, useI18n, useLocalePath, useRouter } from "#imports";

const { name } = useDisplay();
const { locale } = useI18n();
const { $stores } = useNuxtApp();
const router = useRouter();
const localePath = useLocalePath();
const props = defineProps({
  item: {
    type: Object,
    default: () => {
      return {};
    },
    required: true,
  },
});
</script>

<style lang="scss"></style>
