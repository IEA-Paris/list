<template>
  <v-overlay
    :model-value="active"
    scrim="white"
    class="align-center justify-center loader-overlay"
    :class="{ 'loader-overlay--inactive': !active }"
  >
    <div
      v-motion
      :initial="{ scale: 0.8, opacity: 0 }"
      :enter="{
        scale: 1,
        opacity: 1,
        transition: { duration: 800, ease: 'easeOut' },
      }"
      :leave="{ scale: 0.9, opacity: 0, transition: { duration: 400 } }"
      class="logo-container"
    >
      <ListAtomsLogoPlaceholder class="loader-logo" :class="{ 'loader-logo--active': active }" />
    </div>
  </v-overlay>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean
}>()
</script>

<style scoped lang="scss">
$animation-duration: 3141ms;
$animation-easing: ease;

.loader-overlay {
  background: rgba(255, 255, 255, 1) !important;
  backdrop-filter: blur(3px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  height: calc(100vh - 5px) !important;
  top: 5px !important;
}

.loader-overlay--inactive {
  opacity: 0;
  transform: scale(0.95);

  .logo-container {
    transform: scale(0.9);
    opacity: 0;
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.loader-logo {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
  max-width: 350px;
  height: auto;
  width: 280px;
}

.v-overlay--active {
  animation: fade-in 0.5s ease-in-out;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.loader-logo--active :deep([class^="IEA_"]) {
  fill: transparent;
  stroke: #000;
  stroke-opacity: 1;
  fill-opacity: 1;
  fill-rule: nonzero;
}

.loader-logo--active :deep(.IEA_0) {
  stroke-dasharray: 1223 1225;
  stroke-dashoffset: 1224;
  animation: IEA_draw_0 $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_5) {
  stroke-dasharray: 335 337;
  stroke-dashoffset: 336;
  animation: IEA_draw_5 $animation-duration $animation-easing 0ms 1 forwards;
}

.loader-logo--active :deep(.IEA_1) {
  stroke-dasharray: 1351 1353;
  stroke-dashoffset: 1352;
  animation:
    IEA_draw_1 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_2) {
  stroke-dasharray: 1311 1313;
  stroke-dashoffset: 1312;
  animation:
    IEA_draw_2 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_3),
.loader-logo--active :deep(.IEA_4) {
  stroke-dasharray: 13 15;
  stroke-dashoffset: 14;
}
.loader-logo--active :deep(.IEA_3) {
  animation:
    IEA_draw_3 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_4) {
  animation:
    IEA_draw_4 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_6),
.loader-logo--active :deep(.IEA_7),
.loader-logo--active :deep(.IEA_8) {
  stroke-dasharray: 102 104;
  stroke-dashoffset: 103;
}
.loader-logo--active :deep(.IEA_6) {
  animation:
    IEA_draw_6 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_7) {
  animation:
    IEA_draw_7 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_8) {
  animation:
    IEA_draw_8 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_9) {
  stroke-dasharray: 372 374;
  stroke-dashoffset: 373;
  animation:
    IEA_draw_9 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_10) {
  stroke-dasharray: 96 98;
  stroke-dashoffset: 97;
  animation:
    IEA_draw_10 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_11) {
  stroke-dasharray: 184 186;
  stroke-dashoffset: 185;
  animation:
    IEA_draw_11 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_12) {
  stroke-dasharray: 169 171;
  stroke-dashoffset: 170;
  animation:
    IEA_draw_12 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_13) {
  stroke-dasharray: 1020 1022;
  stroke-dashoffset: 1021;
  animation:
    IEA_draw_13 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-circles $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_14) {
  stroke-dasharray: 939 941;
  stroke-dashoffset: 940;
  animation:
    IEA_draw_14 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-circles $animation-duration $animation-easing 0ms 1 forwards;
}
.loader-logo--active :deep(.IEA_15) {
  stroke-dasharray: 326 328;
  stroke-dashoffset: 327;
  animation:
    IEA_draw_15 $animation-duration $animation-easing 0ms 1 forwards,
    stroke-fade $animation-duration linear 0ms 1 forwards,
    fill-standard $animation-duration $animation-easing 0ms 1 forwards;
}

@keyframes fill-standard {
  0%, 35% { fill: transparent; }
  60% { fill: rgba(0, 0, 0, 0.3); }
  80% { fill: rgba(0, 0, 0, 0.7); }
  100% { fill: #000; }
}

@keyframes fill-circles {
  0%, 35% { fill: transparent; }
  60% { fill: rgba(0, 0, 0, 0.2); }
  80% { fill: rgba(0, 0, 0, 0.5); }
  100% { fill: #000; }
}

@keyframes stroke-fade {
  0%, 65% { stroke-opacity: 1; }
  80% { stroke-opacity: 0.5; }
  95% { stroke-opacity: 0.2; }
  100% { stroke-opacity: 0; }
}

@keyframes draw {
  100% { stroke-dashoffset: 0; }
}

@keyframes IEA_draw_0 {
  5% { stroke-dashoffset: 1224; }
  30%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_1 {
  8% { stroke-dashoffset: 1352; }
  35%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_2 {
  10% { stroke-dashoffset: 1312; }
  40%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_3 {
  12% { stroke-dashoffset: 14; }
  45%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_4 {
  15% { stroke-dashoffset: 14; }
  50%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_5 {
  15.74% { stroke-dashoffset: 336; }
  43.52%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_6 {
  16.67% { stroke-dashoffset: 103; }
  44.44%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_7 {
  17.59% { stroke-dashoffset: 103; }
  45.37%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_8 {
  18.52% { stroke-dashoffset: 103; }
  46.3%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_9 {
  19.44% { stroke-dashoffset: 373; }
  47.22%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_10 {
  20.37% { stroke-dashoffset: 97; }
  48.15%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_11 {
  21.3% { stroke-dashoffset: 185; }
  49.07%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_12 {
  22.22% { stroke-dashoffset: 170; }
  50%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_13 {
  23.15% { stroke-dashoffset: 1021; }
  50.93%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_14 {
  24.07% { stroke-dashoffset: 940; }
  51.85%, 100% { stroke-dashoffset: 0; }
}
@keyframes IEA_draw_15 {
  25% { stroke-dashoffset: 327; }
  52.78%, 100% { stroke-dashoffset: 0; }
}
</style>
