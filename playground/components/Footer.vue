<template>
  <section>
    <v-footer
      dark
      class="d-flex justify-center align-center dark"
      :class="{ 'fill-height': isSnapScroll }"
      style="background-color: black"
    >
      <v-container
        class="d-flex flex-column justify-space-between h-100 mt-md-12"
      >
        <v-row justify="center" no-gutters>
          <v-col cols="12" lg="10" class="mt-12">
            <v-row justify="center">
              <v-col cols="12" md="6">
                <nuxt-link
                  :to="localePath('/')"
                  style="transition: all 500ms ease 0s"
                  @click.native="$vuetify.goTo(0)"
                >
                  <v-img
                    src="/Logo_white.png"
                    contain
                    width="200"
                    class="my-6"
                  ></v-img>
                </nuxt-link>
              </v-col>
              <v-col cols="12" md="6" class="mt-md-12 pl-6">
                <div class="uppercase">
                  {{ $t("subscribe-to-our-newsletter") }}
                </div>
                <v-text-field
                  v-model="email"
                  :rules="rules"
                  :label="$t('email')"
                  variant="outlined"
                  tile
                >
                </v-text-field>
                <v-btn block size="large" v-show="false">{{
                  $t("subscribe")
                }}</v-btn>
              </v-col>
            </v-row>
            <v-row justify="center" class="mt-0">
              <v-col cols="12" md="6" :order="smAndDown ? 'last' : ''">
                <div class="text-subtitle-2 font-weight-medium mb-6">
                  <div>{{ config.full_name }}</div>

                  <div>{{ config.address }}</div>

                  <div>{{ config.postcode_country }}</div>

                  <div>{{ config.phone }}</div>

                  <div>
                    <a mailto="information@paris-iea.fr">{{ config.email }}</a>
                  </div>
                </div>
                <iframe
                  title="openstreetmap"
                  width="100%"
                  absolute
                  frameborder="0"
                  scrolling="no"
                  marginheight="0"
                  marginwidth="0"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.356580793857575%2C48.850586483414915%2C2.361644804477692%2C48.85278204589751&amp;layer=mapnik&amp;marker=48.851684276691216%2C2.359112799167633"
                  style="border: 1px solid black; max-width: 400px"
                  @click="
                    router.go(
                      'https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911',
                    )
                  "
                  @keyup.enter="
                    router.go(
                      'https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911',
                    )
                  "
                ></iframe>
                <br />
                <small
                  ><a
                    style="color: white"
                    href="https://www.openstreetmap.org/?mlat=48.85168&amp;mlon=2.35911#map=19/48.85168/2.35911"
                    >{{ $t("view-larger-map") }}</a
                  ></small
                >
              </v-col>

              <v-col cols="12" md="6" class="pt-0">
                <v-row justify="center" no-gutters>
                  <v-col cols="12" sm="6">
                    <v-list bg-color="transparent">
                      <v-list-item :to="localePath('/about/institute')" nuxt>
                        <v-list-item-title
                          class="text-uppercase text-button"
                          v-text="$t('about-us')"
                        ></v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        :to="localePath('/contact')"
                        nuxt
                        @click="open = false"
                      >
                        <v-list-item-title
                          class="text-uppercase text-button"
                          v-text="$t('contact')"
                        ></v-list-item-title>
                      </v-list-item>
                      <v-list-item :to="localePath('/visit')" nuxt>
                        <v-list-item-title
                          class="text-uppercase text-button"
                          v-text="$t('visit')"
                        ></v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        :to="localePath('/pressroom')"
                        nuxt
                        @click="open = false"
                      >
                        <v-list-item-title
                          class="text-uppercase text-button"
                          v-text="$t('pressroom')"
                        ></v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        :to="localePath('/support')"
                        nuxt
                        @click="open = false"
                      >
                        <v-list-item-title
                          class="text-uppercase text-button"
                          v-text="$t('support')"
                        ></v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col class="pt-3">
                    <MiscAtomsSocials
                      dark
                      :socials="config.socials"
                      labelled
                    ></MiscAtomsSocials>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row
          justify="center"
          no-gutters
          class="mt-3 flex-grow-0 flex-shrink-1"
        >
          <v-col cols="12" align="center" class="mt-3">
            <v-btn variant="text" size="small" nuxt dark>
              <!-- TODO add raw licence file url on github -->
              &copy; {{ new Date().getFullYear() }} {{ $t("paris-ias") }}</v-btn
            >
            <v-btn
              variant="text"
              size="small"
              nuxt
              dark
              :to="localePath('/terms_of_service')"
            >
              {{ $t("tos") }}
            </v-btn>
            <v-btn
              variant="text"
              size="small"
              nuxt
              dark
              :to="localePath('/privacy_policy')"
            >
              {{ $t("privacy") }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </section>
</template>
<script setup>
// import socials from "~/assets/data/social"
// import sitemap from "~/assets/data/sitemap"
import { useDisplay } from "vuetify"
import { useI18n } from "vue-i18n"

const config = useAppConfig()
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { smAndDown } = useDisplay()
const { router } = useRouter()
const nuxtApp = useNuxtApp()

const { $vuetify } = nuxtApp
const socialsRef = ref(config.socials)
const panel = reactive([])
const footer = ref(config.sitemap.footer)
const email = ref("")
const props = defineProps({
  isSnapScroll: Boolean,
})
const rules = [
  //TODO internationalzie the error messages
  (value) => !!value || "Required.",
  (value) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value,
    ) || t("invalid-e-mail"),
]
</script>
<style lang="scss">
.v-footer.fill-height {
  height: calc(100vh - 64px);
  /* scroll-snap-stop: normal; */
}

.footer-image {
  filter: brightness(1.5) contrast(1.5);
}
</style>
