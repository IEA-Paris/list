<template>
  <v-list-item :to="localePath(getPath(item.id))" class="search-item py-2">
    <template #item :key="index.toString() + item.id" />
    <template v-if="item.prependAvatar" #prepend>
      <v-avatar rounded="0" :image="item.prependAvatar" />
    </template>
    <template #title>
      <div class="text-black black-text" v-html="item.title" />
    </template>
    <template #subtitle>
      <div class="text-black black-text" v-html="item.subtitle" />
    </template>
    <template #append>
      <v-btn
        icon="mdi-open-in-new"
        variant="text"
        :to="localePath(getPath(item.id))"
        target="_blank"
      />
    </template>
  </v-list-item>
</template>

<script setup>
// import { useDisplay } from "vuetify"
// const { smAndUp } = useDisplay()
import { useLocalePath } from "#imports";

const localePath = useLocalePath();
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
});
const getPath = (id) => {
  switch (props.item.type) {
    case "projects":
      return "/activities/projects/" + id;
    case "publications":
      return "/activities/publications/" + id;
    case "fellowship":
      return "/activities/fellowships/" + id;
    default:
      return `/${props.type}/${id}`;
  }
};
</script>

<style lang="scss">
.search-item {
  align-items: center;
  height: 100%;
}
</style>
