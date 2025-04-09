<template>
  <v-dialog max-width="500">
    <template #activator="{ props: activatorProps }">
      <v-btn
        variant="outlined"
        tile
        block
        v-bind="activatorProps"
        size="x-large"
        prepend-icon="mdi-circle-medium"
      >
        <template #prepend>
          <v-icon size="x-large" color="success" />
        </template>
        <div class="text-wrap register-text">
          {{ $t("register") }}
        </div>
      </v-btn>
    </template>

    <template #default="{ isActive }">
      <v-card :title="$t('events.register')">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn :text="$t('cancel')" @click="isActive.value = false" />
          <v-btn
            :text="$t('events.register-me')"
            @click="isActive.value = false"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true },
})
</script>
<style>
.register-text {
  font-size: 0.8rem;
}
</style>
