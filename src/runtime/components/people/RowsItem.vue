<template>
  <v-divider v-if="index > 0" />
  <v-row
    class="my-6 ml-md-1 px-3 px-md-0 highlight-on-hover"
    @click="
      $router.push(
        localePath({
          name: 'people-slug',
          params: { slug: item.slug },
        })
      )
    "
  >
    <v-col v-if="mdAndUp" cols="12" md="3">
      <MiscAtomsImageContainer
        cover
        :loading="$stores.people.loading"
        :src="item.image.url ? item.image : '/default.png'"
        :ratio="1 / 1"
        :name="item.lastname + ' ' + item.firstname"
        :slug="item.slug"
        link="people-slug"
      />
    </v-col>

    <v-col cols="12" md="8">
      <v-skeleton-loader
        v-if="$stores.people.loading"
        :type="
          [
            'heading, subtitle, text@5',
            'heading, subtitle, text@5',
            'heading, subtitle, text@3',
            'heading, subtitle, text@6',
            'heading, subtitle, text@9',
            'heading, subtitle, text@9',
          ][['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')]
        "
      />

      <div v-else class="ml-md-8">
        <NuxtLink
          :to="
            localePath({
              name: 'people-slug',
              params: { slug: item.slug },
            })
          "
          class="text-wrap text-h5 text-md-h4 text-black"
        >
          {{ item.firstname + " " + item.lastname }}
        </NuxtLink>
        <MiscAtomsSocials v-if="item.socials" :socials="item.socials" />
        <PeopleGroupBadges :item="item" />

        <MDC
          v-if="item.biography"
          :value="item.biography"
          class="text-wrap clamped-text text-black"
          :style="'-webkit-line-clamp:' + lineClamp"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { computed } from "vue";

const { name, mdAndUp } = useDisplay();
const localePath = useLocalePath();
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
const lineClamp = computed(() => {
  let base = [5, 6, 3, 6, 8, 10][
    ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
  ];
  if (props.item?.socials && Object.keys(props.item.socials).length > 0) {
    base =
      base -
      [0, 0, 1, 1, 1, 2][
        ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
      ];
  }

  return base;
});
</script>
