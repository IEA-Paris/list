<template>
  <!-- TODO: make it after the slider of seed without swiper -->
  <v-row class="mb-9">
    <v-col class="justify-center">
      <slot />
    </v-col>
    <v-col cols="3">
      <!--     <div class="text-h6 font-weight-black d-flex align-center mx-6">
                {{ model + 1 }}/{{ items.length || 0 }}
              </div> -->
      <v-btn-toggle>
        <v-btn
          tile
          variant="outlined"
          flat
          :disabled="model === 0"
          icon="mdi-chevron-left"
          class="pseudo-carousel-prev"
        />
        <v-btn
          tile
          variant="outlined"
          :disabled="model === items.length - 1"
          flat
          icon="mdi-chevron-right"
          class="pseudo-carousel-next"
          @click="model++"
        />
      </v-btn-toggle>
    </v-col>
  </v-row>

  <Swiper
    ref="swiper"
    style="overflow-x: visible"
    effect="slide"
    :modules="[
      SwiperAutoplay,
      SwiperA11y,
      SwiperPagination,
      SwiperNavigation,
      SwiperKeyboard,
    ]"
    :breakpoints="swiperBreakpoints"
    :navigation="{
      nextEl: '.pseudo-carousel-next',
      prevEl: '.pseudo-carousel-prev',
    }"
    @swiperprogress="onProgress"
    @swiperslidechange="onSlideChange"
  >
    <template v-for="(item, index) in items" v-if="loading"> LOADING </template>
    <SwiperSlide
      v-for="(item, index) in items"
      v-else
      :key="index + type"
      :style="'width: ' + computedWidth + 'px'"
      :width="computedWidth"
    >
      <component
        :is="capitalize(type) + 'SlidingItem'"
        :key="index + type"
        :index="index"
        :item="item"
        :width="computedWidth"
        :loading="loading"
        :dark="dark"
      />
    </SwiperSlide>
  </Swiper>
  <div v-if="more" class="d-flex justify-end mt-12">
    <v-btn class="ml-auto" variant="flat">{{ $t(type + ".see-more") }}</v-btn>
  </div>
</template>

<script setup>
/*
  TODO: make it similar to radcliffe :
  - offset out of the layout before scrolling.
  - Meaningful behavior when clicking on the arrrows
  - Add a slide-in from right animation when the items are entering viewport
  */
import { useDisplay } from "vuetify"
const { locale } = useI18n()
const { name, mdAndUp } = useDisplay()
const model = ref(0)
const swiperBreakpoints = ref({
  320: {
    slidesPerView: "auto",
    spaceBetween: 15,
  },
  480: {
    slidesPerView: "auto",
    spaceBetween: 22,
  },
  640: {
    slidesPerView: "auto",
    spaceBetween: 25,
  },
  960: {
    slidesPerView: "auto",
    spaceBetween: 28,
  },
  1280: {
    slidesPerView: "auto",
    spaceBetween: 31,
  },
  1920: {
    slidesPerView: "auto",
    spaceBetween: 35,
  },
})
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  items: { type: Array, required: true },
  loading: { type: Boolean, default: false },
  dark: { type: Boolean, default: false },
  more: { type: Boolean, default: true },
})

/* const { data, error } = await useAsyncData(props.type, () =>
  )
  console.log("error: ", error) */
const spaceBetween = 10
const onProgress = (e) => {
  const [swiper, progress] = e.detail
}

const computedWidth = computed(() => {
  let modifier = 1
  switch (props.type) {
    case "events":
      modifier = 1.1
      break
    case "people":
      break
    case "image":
      break
    default:
      break
  }
  return (
    [250, 300, 350, 380, 430, 460][
      ["xs", "sm", "md", "lg", "xl", "xxl"].indexOf(name.value || "md")
    ] * modifier
  )
})

onMounted(() => {
  console.log("Resolved Item", capitalize(props.type) + "SlidingItem")
})
</script>
<style scoped>
.swiper-slide {
  width: auto;
}
</style>
