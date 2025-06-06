<template>
  <v-container>
    <EventsView :item="tag" :loading="loading"></EventsView
  ></v-container>
</template>

<script setup>
const { $queries } = useNuxtApp();

const { fetchItem } = useFetchItem();
const loading = ref(true);
// Fetch the item
const { data: tag } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: $queries.events.get,
    key: "getEvent",
  });
});
loading.value = false;
</script>
