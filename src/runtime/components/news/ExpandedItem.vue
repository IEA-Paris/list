<template>
  <v-row
    v-ripple
    class="expanded-item my-6 cursor-pointer"
    :class="expanded ? 'expanded' : 'collapsed'"
    @click="expanded = !expanded"
  >
    <v-col
      cols="12"
      :md="expanded ? '4' : '2'"
      class="animated-col"
      @click.prevent="
        expanded
          ? router.push(
              localePath({
                name: 'news-slug',
                params: { slug: item.slug[locale] },
              })
            )
          : null
      "
    >
      <MiscAtomsImageContainer
        cover
        :loading="rootStore.loading"
        :src="item.image"
        :ratio="1 / 1"
      />
    </v-col>
    <v-col class="text-h5" cols="12" :md="expanded ? '8' : '9'">
      <div
        :class="expanded ? 'text-h4' : 'text-h5'"
        @click.prevent="
          expanded
            ? router.push(
                localePath({
                  name: 'news-slug',
                  params: { slug: item.slug[locale] },
                })
              )
            : null
        "
      >
        <MDC v-if="item.name" :value="item.name" />
      </div>
      <v-expand-transition v-if="lgAndUp">
        <div v-show="expanded">
          <MiscMoleculesChipContainer :items="item.tags" />
        </div>
      </v-expand-transition>
      <MDC
        v-if="item.summary"
        class="text-body-1 text-wrap clamped-text"
        :style="
          '-webkit-line-clamp:' +
          (expanded ? [5, 5, 3, 6, 9, 11] : [5, 5, 2, 4, 6, 8])[
            ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].indexOf(name || 'md')
          ]
        "
        :value="item.summary"
      />

      <v-expand-transition>
        <v-btn
          v-show="expanded"
          class="mt-4"
          variant="outlined"
          tile
          @click.prevent="
            router.push(
              localePath({
                name: 'news-slug',
                params: { slug: item.slug[locale] },
              })
            )
          "
        >
          {{ $t("read-more") }}
        </v-btn>
      </v-expand-transition>
    </v-col>
  </v-row>
</template>

<script setup>
import { useDisplay } from "vuetify";
import { useRootStore } from "../../stores/root";
import { useRouter } from "#imports";

const router = useRouter();
const rootStore = useRootStore();
const expanded = ref(false);
const { name, lgAndUp } = useDisplay();
const { locale } = useI18n();
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

<style lang="scss" scoped>
.expanded-item {
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  &.expanded {
    .v-col:first-child {
      flex: 0 0 33.333%;
      max-width: 33.333%;
    }

    .v-col:last-child {
      flex: 0 0 66.666%;
      max-width: 66.666%;
    }
  }

  &.collapsed {
    .v-col:first-child {
      flex: 0 0 16.666%;
      max-width: 16.666%;
    }

    .v-col:last-child {
      flex: 0 0 83.333%;
      max-width: 83.333%;
    }
  }

  .animated-col {
    transition: flex 0.3s ease-in-out, max-width 0.3s ease-in-out;
  }
}

.fade-in {
  animation: fadeIn 1s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
