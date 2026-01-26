<template>
  <v-row>
    <v-col
      v-for="(items, type) in related"
      :key="type"
      cols="12"
      md="4"
      class="d-flex flex-column align-start"
    >
      <MiscMoleculesRelatedItems
        v-if="items && items.length && type !== '__typename'"
        :type="type"
        :items="items"
      />
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  related: {
    type: Object,
    required: true,
  },
})
</script>
