<template>
  <v-row class="highlight-on-hover pa-3">
    <v-col v-ripple cols="12" sm="6" md="4" lg="3" xl="2">
      <MiscAtomsImageContainer
        contain
        :src="item.image"
        :loading="$stores.projects.loading"
        :ratio="1 / 1"
        :title="item.name"
        link="activities-projects-slug"
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
        router.push(localePath('/activities/projects/' + item.slug[locale]))
      "
    >
      <v-skeleton-loader
        v-if="rootStore.loading"
        type="heading,ossein,text@8,ossein,button,button"
      />

      <template v-else>
        <div class="text-h5 text-sm-h3 text-md-h4 text-md-h4 my-6">
          {{ item.name }}
        </div>
        <div
          v-if="item.summary"
          class="mt-n3 text-wrap clamped-text"
          :style="
            '-webkit-line-clamp:' +
            [5, 5, 4, 8, 10][
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
              name: 'project-slug',
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
          variant="outlined"
          tile
          class="mt-4 ml-4"
          prepend-icon="mdi-web"
          :size="
            ['small', 'small', 'small', 'default', 'default', 'large'][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        >
          {{ $t("visit-the-project-website") }}
        </v-btn>
      </template>
    </v-col>
  </v-row>
  <v-divider />
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useRootStore } from "../../stores/root";
import { useRouter, useLocalePath, useI18n } from "#imports";

const { locale } = useI18n();

const { name } = useDisplay();

const rootStore = useRootStore();
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
