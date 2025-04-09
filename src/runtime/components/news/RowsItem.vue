<template>
  <v-divider v-if="index > 0" />
  <v-row class="my-4 mx-2 mx-md-0 highlight-on-hover">
    <v-col v-if="mdAndUp" cols="12" md="4" lg="3" class="pr-md-0">
      <MiscAtomsImageContainer
        cover
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
        :loading="$stores.news.loading"
        link="news-slug"
        :slug="item._path && item._path.split('/').pop()"
      >
        <v-chip class="ma-2" style="background-color: white; color: black">
          {{ $t(eventCategory) }}
        </v-chip>
      </MiscAtomsImageContainer>
    </v-col>
    <v-col cols="12" md="8" lg="4" class="pl-md-6">
      <v-skeleton-loader
        v-if="rootStore.loading || $stores.news.loading"
        :type="
          [
            'heading, subtitle, text@5, ossein, button',
            'heading, subtitle, text@5, ossein, button',
            'heading, subtitle, text@3, ossein, button',
            'heading@2, subtitle',
            'heading@2, subtitle',
            'heading@2, subtitle',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      />

      <template v-else>
        <template v-if="smAndDown && item.category">
          <v-chip class="mb-4">
            {{ $t("list.filters.news.category." + item.category) }}
          </v-chip>
          <br />
        </template>

        <NuxtLink
          :to="
            localePath({
              name: 'news-slug',
              params: { slug: item.slug[locale] },
            })
          "
          class="text-wrap text-h5 text-md-h4 text-black"
        >
          {{ item.name }}
        </NuxtLink>
        <div class="tex-overline mt-3">
          {{ formatDateValue(item.date, locale) }}
        </div>
        <MiscMoleculesChipContainer
          v-if="item.tags && item.tags.length"
          :items="item.tags"
          class="mt-4"
        />
        <template v-if="mdAndDown">
          <MDC
            v-if="item.summary"
            :value="item.summary"
            class="text-body-1 text-wrap clamped-text"
            :style="
              '-webkit-line-clamp:' +
              [5, 5, 3, 6, 10, 10][
                ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
              ]
            "
          />
          <v-btn
            class="mt-4"
            variant="outlined"
            tile
            size="small"
            :to="
              localePath({
                name: 'news-slug',
                params: { slug: item.slug[locale] },
              })
            "
          >
            {{ $t("read-more") }}
          </v-btn>
        </template>
      </template>
    </v-col>

    <v-col v-if="lgAndUp" cols="12" lg="5">
      <v-skeleton-loader
        v-if="rootStore.loading || $stores.news.loading"
        type="text@8, ossein, button"
      />

      <template v-else>
        <MDC
          v-if="item.summary"
          :value="item.summary"
          class="text-body-1 text-wrap clamped-text"
          :style="
            '-webkit-line-clamp:' +
            [5, 5, 4, 7, 8, 10][
              ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
            ]
          "
        />
        <p v-else />
        <v-btn
          class="mt-4"
          variant="outlined"
          tile
          :to="
            localePath({
              name: 'news-slug',
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
      </template>
    </v-col>
  </v-row>
  <!-- <MiscMoleculesSearchItem></MiscMoleculesSearchItem> -->
</template>

<script setup>
import { useDisplay } from "vuetify";
import { computed } from "vue";
import { useRootStore } from "../../stores/root";
import { useNuxtApp, useI18n } from "#imports";

const { $stores } = useNuxtApp();
const { locale } = useI18n();
const localePath = useLocalePath();
const rootStore = useRootStore();
const { name, smAndDown, mdAndDown, mdAndUp, lgAndUp } = useDisplay();
const eventCategory = computed(() => {
  if (props.item.category) {
    return "list.filters.news.category." + props.item.category;
  } else {
    return "list.filters.news.category.others";
  }
});
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

<style></style>
