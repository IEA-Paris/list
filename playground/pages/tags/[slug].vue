<template>
  <v-container>
    <TagsView :item="tag" :loading="loading"></TagsView
  ></v-container>
</template>

<script setup>
const { $queries } = useNuxtApp();

const { fetchItem } = useFetchItem();
const loading = ref(true);
// Fetch the item
const { data: tag } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: $queries.tags.get,
    key: "getTag",
  });
});
loading.value = false;
</script>
