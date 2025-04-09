<template>
  <v-list-item :to="localePath(getPath(item.id))" class="search-item py-2">
    <template v-slot:item :key="index.toString() + item.id"></template>
    <template v-slot:prepend v-if="item.prependAvatar">
      <v-avatar rounded="0" :image="item.prependAvatar"> </v-avatar>
    </template>
    <template v-slot:title>
      <div v-html="item.title" class="text-black black-text"></div>
    </template>
    <template v-slot:subtitle>
      <div v-html="item.subtitle" class="text-black black-text"></div>
    </template>
    <template v-slot:append>
      <v-btn
        icon="mdi-open-in-new"
        variant="text"
        :to="localePath(getPath(item.id))"
        target="_blank"
      ></v-btn>
    </template>
  </v-list-item>
</template>
<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
const localePath = useLocalePath()
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})
const getPath = (id) => {
  switch (props.item.type) {
    case "projects":
      return "/activities/projects/" + id
    case "publications":
      return "/activities/publications/" + id
    case "fellowship":
      return "/activities/fellowships/" + id
    default:
      return `/${props.type}/${id}`
  }
}
</script>
<style lang="scss">
.search-item {
  align-items: center;
  height: 100%;
}
</style>
