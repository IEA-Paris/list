<template>
  <v-container style="max-width: 1600px">
    <EventsView :item="event" :loading="loading" />
  </v-container>
</template>

<script setup>
const { $queries } = useNuxtApp()
const { fetchItem } = useFetchItem()
const loading = ref(true)
// Fetch the item
const { data: event } = await useAsyncData("item", async () => {
  return await fetchItem({
    query: $queries.events.get,
    key: "getEvent",
  })
})
loading.value = false
</script>
