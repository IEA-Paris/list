
// @ts-nocheck
import locale_en_46json_febb77f5 from "#nuxt-i18n/febb77f5";
import locale_fr_46json_768be560 from "#nuxt-i18n/768be560";

export const localeCodes =  [
  "en",
  "fr"
]

export const localeLoaders = {
  en: [
    {
      key: "locale_en_46json_febb77f5",
      load: () => Promise.resolve(locale_en_46json_febb77f5),
      cache: true
    }
  ],
  fr: [
    {
      key: "locale_fr_46json_768be560",
      load: () => Promise.resolve(locale_fr_46json_768be560),
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
    optimizeTranslationDirective: true
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
      code: "en",
      files: [
        {
          path: "/home/bob/Projects/list/src/runtime/translations/en.json",
          cache: undefined
        }
      ]
    },
    {
      code: "fr",
      files: [
        {
          path: "/home/bob/Projects/list/src/runtime/translations/fr.json",
          cache: undefined
        }
      ]
    }
  ],
  defaultLocale: "",
  defaultDirection: "ltr",
  routesNameSeparator: "___",
  trailingSlash: false,
  defaultLocaleRouteNameSuffix: "default",
  strategy: "prefix_except_default",
  lazy: false,
  langDir: "/home/bob/Projects/list/src/runtime/translations",
  rootRedirect: undefined,
  detectBrowserLanguage: {
    alwaysRedirect: false,
    cookieCrossOrigin: false,
    cookieDomain: null,
    cookieKey: "i18n_redirected",
    cookieSecure: false,
    fallbackLocale: "",
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
      langDir: "/home/bob/Projects/list/src/runtime/translations",
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
    code: "en",
    files: [
      {
        path: "/home/bob/Projects/list/src/runtime/translations/en.json",
        cache: undefined
      }
    ]
  },
  {
    code: "fr",
    files: [
      {
        path: "/home/bob/Projects/list/src/runtime/translations/fr.json",
        cache: undefined
      }
    ]
  }
]

export const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n"
export const parallelPlugin = false
export const isSSG = false
export const hasPages = false

export const DEFAULT_COOKIE_KEY = "i18n_redirected"
export const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal"
export const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp"
/** client **/

/** client-end **/