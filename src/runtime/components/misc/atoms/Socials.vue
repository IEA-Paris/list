<template>
  <v-row no-gutters>
    <v-col>
      <template v-for="(value, key, index) in socials" :key="key + value">
        <v-tooltip v-if="value" :location="location">
          <template #activator="{ props }">
            <v-btn
              tile
              v-bind="mergeProps(props, attrs)"
              target="_blank"
              :href="getSocialId(key, value)"
              :color="dark ? 'transparent' : 'white'"
              flat
            >
              <v-icon :color="dark ? 'white' : 'black'">
                {{ getProfileIcon(key) }}</v-icon
              >
              <div v-if="labelled" class="text-uppercase text-muted ml-3">
                {{ key }}
              </div>
            </v-btn>
          </template>
          <span>{{ $t("socials." + key) }}</span>
        </v-tooltip>
        <br v-if="labelled" />
      </template>
    </v-col>
  </v-row>
</template>

<script setup>
import { useAttrs, mergeProps } from "vue";
import { useDisplay } from "vuetify";

const attrs = useAttrs();
const { name } = useDisplay();

const props = defineProps({
  socials: {
    type: Object,
    required: true,
  },
  location: {
    type: String,
    default: "bottom",
  },
  dark: {
    type: Boolean,
    default: false,
  },
  labelled: {
    type: Boolean,
    default: false,
  },
});

const getSocialId = (name, id) => {
  switch (name) {
    case "idRef":
      return `https://www.idref.fr/${id}`;
    case "mendeley":
      return `https://www.mendeley.com/${id}`;
    case "linkedin":
      return `https://www.linkedin.com/company/${id}`;
    case "twitter":
      return `https://x.com/${id}`;
    case "orcid":
      return `https://orcid.org/${id}`;
    case "scholar":
      return `https://scholar.google.com/${id}`;
    case "wikipedia":
      return `https://fr.wikipedia.org/${id}`;
    case "researchgate":
      return `https://www.researchgate.net/${id}`;
    case "youtube":
      return `https://www.youtube.com/${id}`;
    case "facebook":
      return `https://www.facebook.com/pages/${id}`;
    case "instagram":
      return `https://www.instagram.com/${id}`;
    case "github":
      return `https://gitbub.com/${id}`;
    case "rss":
      return "";
    case "website":
      return "";
  }
};

const getProfileIcon = (name) => {
  switch (name) {
    case "idRef":
      return "mdi-account-plus-outline";
    case "mendeley":
      return "mdi-book";
    case "bluesky":
      return "mdi-cloud";
    case "linkedin":
      return "mdi-linkedin";
    case "twitter":
      return "mdi-twitter";
    case "orcid":
      return "mdi-account";
    case "scholar":
      return "mdi-google";
    case "wikipedia":
      return "mdi-wikipedia";
    case "researchgate":
      return "mdi-account";
    case "youtube":
      return "mdi-youtube";
    case "facebook":
      return "mdi-facebook";
    case "instagram":
      return "mdi-instagram";
    case "github":
      return "mdi-github";
    case "rss":
      return "mdi-rss";
    case "website":
      return "mdi-web";
  }
};
</script>

<style lang="scss"></style>
