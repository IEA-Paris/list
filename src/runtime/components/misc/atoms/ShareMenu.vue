<template>
  <v-menu>
    <template #activator="{ props: menu }">
      <v-tooltip location="top">
        <template #activator="{ props: tooltip }">
          <v-btn variant="outlined" v-bind="mergeProps(menu, tooltip)">
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </template>
        <div v-html="$t('share')" />
      </v-tooltip>
    </template>
    <v-list>
      <v-list-item
        v-for="(network, index) in networks"
        :key="network"
        :value="network"
      >
        <!-- TODO: Injecter dynamiquement l'url -->
        <SocialShare
          :key="network"
          class="text-black"
          :network="network"
          :title="$t('share-this-on', { item: item.name })"
          :aria-label="$t('share-on', { network: network })"
          :image="item.image"
          :url="'https://www.paris-iea.fr/fr' + route.fullPath"
        >
          <template #label>
            {{ network }}
          </template>
        </SocialShare>

        <!--         <SocialShare
          :key="network"
          class="text-black"
          :network="network"
          :title="$t('share-this-on', { item: item.name })"
          :aria-label="$t('share-on', { network: network })"
          :image="item.image"
          :hashtags="item.tags.map((tag) => tag.name)"
          :url="config.url + route.fullPath"
        >
          <template #label>
            {{ network }}
          </template>
        </SocialShare> -->
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { mergeProps } from "vue"
import { useRoute } from "#imports"
/* import config from "~/static.config"; */

const route = useRoute()

const props = defineProps({
  networks: {
    type: Array,
    default: [
      "facebook",
      "twitter",
      "linkedin",
      "email",
      "pinterest",
      "reddit",
      "whatsapp",
      "pocket",
    ],
  },
  item: {
    type: Object,
    required: true,
  },
})

/* console.log("PRPOS", props.item) */
</script>
