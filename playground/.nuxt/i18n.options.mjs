
// @ts-nocheck


export const localeCodes =  [
  "fr",
  "en"
]

export const localeLoaders = {
  fr: [
    {
      key: "locale_fr_46json_a38d6dcb",
      load: () => import("#nuxt-i18n/a38d6dcb" /* webpackChunkName: "locale_fr_46json_a38d6dcb" */),
      cache: true
    },
    {
      key: "locale_fr_46json_595ce243",
      load: () => import("#nuxt-i18n/595ce243" /* webpackChunkName: "locale_fr_46json_595ce243" */),
      cache: true
    }
  ],
  en: [
    {
      key: "locale_en_46json_22e8ad5b",
      load: () => import("#nuxt-i18n/22e8ad5b" /* webpackChunkName: "locale_en_46json_22e8ad5b" */),
      cache: true
    },
    {
      key: "locale_en_46json_4005ec23",
      load: () => import("#nuxt-i18n/4005ec23" /* webpackChunkName: "locale_en_46json_4005ec23" */),
      cache: true
    }
  ]
}

export const vueI18nConfigs = []

export const nuxtI18nOptions = {
  restructureDir: "i18n",
  experimental: {
    localeDetector: "",
    switchLocalePathLinkSSR: false,
    autoImportTranslationFunctions: false,
    typedPages: true,
    typedOptionsAndMessages: false,
    generatedLocaleFilePathFormat: "absolute",
    alternateLinkCanonicalQueries: false,
    hmr: true
  },
  bundle: {
    compositionOnly: true,
    runtimeOnly: false,
    fullInstall: true,
    dropMessageCompiler: false,
    optimizeTranslationDirective: false
  },
  compilation: {
    strictMessage: true,
    escapeHtml: false
  },
  customBlocks: {
    defaultSFCLang: "json",
    globalSFCScope: false
  },
  locales: [
    {
      code: "fr",
      iso: "fr-FR",
      name: "French",
      dir: "ltr",
      files: [
        {
          path: "/home/bob/Projects/seed/modules/list/src/runtime/translations/fr.json",
          cache: undefined
        },
        {
          path: "/home/bob/Projects/seed/modules/list/playground/translations/fr.json",
          cache: undefined
        }
      ]
    },
    {
      code: "en",
      iso: "en-US",
      name: "English",
      dir: "ltr",
      isCatchallLocale: true,
      files: [
        {
          path: "/home/bob/Projects/seed/modules/list/src/runtime/translations/en.json",
          cache: undefined
        },
        {
          path: "/home/bob/Projects/seed/modules/list/playground/translations/en.json",
          cache: undefined
        }
      ]
    }
  ],
  defaultLocale: "en",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  trailingSlash: false,
  defaultLocaleRouteNameSuffix: "default",
  strategy: "prefix_except_default",
  lazy: true,
  langDir: "../translations/",
  rootRedirect: undefined,
  detectBrowserLanguage: {
    alwaysRedirect: true,
    cookieCrossOrigin: false,
    cookieDomain: null,
    cookieKey: "i18n_redirected",
    cookieSecure: false,
    fallbackLocale: "en",
    redirectOn: "root",
    useCookie: true
  },
  differentDomains: false,
  baseUrl: "",
  customRoutes: "page",
  pages: {},
  skipSettingLocaleOnNavigate: false,
  types: "composition",
  debug: false,
  parallelPlugin: false,
  multiDomainLocales: false,
  i18nModules: [
    {
      langDir: "/home/bob/Projects/seed/modules/list/src/runtime/translations",
      locales: [
        {
          code: "en"
        },
        {
          code: "fr"
        }
      ]
    }
  ]
}

export const normalizedLocales = [
  {
    code: "fr",
    iso: "fr-FR",
    name: "French",
    dir: "ltr",
    files: [
      {
        path: "/home/bob/Projects/seed/modules/list/src/runtime/translations/fr.json",
        cache: undefined
      },
      {
        path: "/home/bob/Projects/seed/modules/list/playground/translations/fr.json",
        cache: undefined
      }
    ]
  },
  {
    code: "en",
    iso: "en-US",
    name: "English",
    dir: "ltr",
    isCatchallLocale: true,
    files: [
      {
        path: "/home/bob/Projects/seed/modules/list/src/runtime/translations/en.json",
        cache: undefined
      },
      {
        path: "/home/bob/Projects/seed/modules/list/playground/translations/en.json",
        cache: undefined
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false
export const hasPages = true

export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
/** client **/
if(import.meta.hot) {

function deepEqual(a, b, ignoreKeys = []) {
  // Same reference?
  if (a === b) return true

  // Check if either is null or not an object
  if (a == null || b == null || typeof a !== 'object' || typeof b !== 'object') {
    return false
  }

  // Get top-level keys, excluding ignoreKeys
  const keysA = Object.keys(a).filter(k => !ignoreKeys.includes(k))
  const keysB = Object.keys(b).filter(k => !ignoreKeys.includes(k))

  // Must have the same number of keys (after ignoring)
  if (keysA.length !== keysB.length) {
    return false
  }

  // Check each property
  for (const key of keysA) {
    if (!keysB.includes(key)) {
      return false
    }

    const valA = a[key]
    const valB = b[key]

    // Compare functions stringified
    if (typeof valA === 'function' && typeof valB === 'function') {
      if (valA.toString() !== valB.toString()) {
        return false
      }
    }
    // If nested, do a normal recursive check (no ignoring at deeper levels)
    else if (typeof valA === 'object' && typeof valB === 'object') {
      if (!deepEqual(valA, valB)) {
        return false
      }
    }
    // Compare primitive values
    else if (valA !== valB) {
      return false
    }
  }

  return true
}



async function loadCfg(config) {
  const nuxt = useNuxtApp()
  const { default: resolver } = await config()
  return typeof resolver === 'function' ? await nuxt.runWithContext(() => resolver()) : resolver
}


  import.meta.hot.accept("../../src/runtime/translations/fr.json", async mod => {
    localeLoaders["fr"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("fr")
  })

  import.meta.hot.accept("../translations/fr.json", async mod => {
    localeLoaders["fr"][1].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("fr")
  })

  import.meta.hot.accept("../../src/runtime/translations/en.json", async mod => {
    localeLoaders["en"][0].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("en")
  })

  import.meta.hot.accept("../translations/en.json", async mod => {
    localeLoaders["en"][1].load = () => Promise.resolve(mod.default)
    await useNuxtApp()._nuxtI18nDev.resetI18nProperties("en")
  })



}
/** client-end **/