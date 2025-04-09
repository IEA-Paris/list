<template>
  <div>
    <!--  TODO
  - add skeleton UI
  - test lazy-src
  - validate requested quality
  - Add conditional overlays slots (top left/right, bottom left/right/center for date, caption, copyright) -->

    <v-skeleton-loader v-if="loading" height="100%" type="image" />

    <template v-else>
      <nuxt-link
        :to="
          link
            ? localePath({
                name: link,
                params: { slug: slugify(slug) },
              })
            : null
        "
      >
        <div class="overflow-hidden mw-100">
          <!--  TODO debug why the picture is not displaying/sizing properly -->
          <v-img
            v-if="src"
            :aspect-ratio="ratio"
            :class="{ 'img-animation': animate }"
            :lazy-src="
              img(computedSrc, {
                width,
                quality: 70,
              })
            "
            :src="
              img(computedSrc, {
                width,
                quality: 70,
              })
            "
            :srcset="_srcset.srcset"
            :sizes="_srcset.sizes"
            :title="caption"
            v-bind="$attrs"
          >
            <slot />
          </v-img></div
      ></nuxt-link>
    </template>
  </div>
</template>

<script setup>
import { slugify } from "../../../composables/useUtils";
import { computed, useLocalePath } from "#imports";

const localePath = useLocalePath();
const img = useImage();

const computedSrc = computed(() => {
  return typeof props.src === "string" ? props.src : props.src.url;
});
const props = defineProps({
  src: {
    type: [Object, String],
    required: false,
    default: {
      alt: "default",
      copyright: "IEA PARIS",
      url: "/logo_grey.png",
    },
  },
  loading: {
    type: Boolean,
    default: false,
    required: true,
  },
  width: { type: Number, default: 0 },
  ratio: { type: Number, required: true, default: 1 },
  caption: { type: String, default: "" },
  slug: { type: String, default: "" },
  link: { type: String, default: "" },
  animate: { type: Boolean, default: true },
});
const _srcset = computed(() => {
  return img.getSizes(
    typeof props.src === "string" ? props.src : props.src.url,
    {
      sizes: "xs:100vw sm:100vw md:100vw lg:100vw xl:100vw",
      modifiers: {
        format: "webp",
        quality: 70,
        ...(props.width && { width: props.width }),
      },
    }
  );
});
</script>

<style scoped>
.img-animation {
  transition: all 0.5s ease-in-out;
  width: 100%;
}

.img-animation:hover {
  transform: scale(1.1);
}
</style>
