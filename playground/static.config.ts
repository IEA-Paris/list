export default {
  env: { NODE_ENV: "dev" },
  name: "PARIS IAS",
  full_name: "Paris Institute for Advanced Study", // set to false if there is none
  short_name: "Paris IAS", // set to false if there is none
  full_name_html: "Paris&nbsp;Institute<br>for Advanced&nbsp;Study", // set to false if there is none
  address: "17 Quai d'Anjou",
  postcode_country: "75004 PARIS - FRANCE",
  phone: "+33(0)1 56 81 00 52",
  email: "contact@paris-iea.fr",
  subtitle: "Paris Institute for Advanced Study",
  description: "Paris Institute for Advanced Study",
  splash_title: "Paris Institute for Advanced Study",
  recaptcha: "6Lc_xuUUAAAAALwowUq0cC0wFtFnZ2NCi3UH4i1j", // TODO: rm -> fetch from GPG secrets / SSM
  graphqlEndpoint:
    "https://svrk22xx3zforcytbifrudb4k4.appsync-api.eu-west-2.amazonaws.com/graphql",
  graphqlApiKey: "da2-2g3v2byhujc6xbv6ranaxb37wu",
  keywords: "open source, open science, science",
  logo: {
    light: "/logo.png",
    dark: "/logo_white.png",
  },
  titleSeparator: " | ",
  lang: {
    default: "en",
    locales: [
      {
        code: "fr",
        iso: "fr-FR",
        name: "French",
        file: "fr.json",
        dir: "ltr",
      },
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.json",
        dir: "ltr",
        isCatchallLocale: true,
      },
    ],
  },
  theme: {
    loading: "red",
    dark: false,
    themes: {
      light: {
        primary: "#2196f3",
        secondary: "#424242",
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
      // dark: {
      //   primary: colors.blue,
      //   accent: colors.grey.darken3,
      //   secondary: colors.grey.darken3,
      //   info: colors.teal.lighten1,
      //   warning: colors.amber.darken3,
      //   error: colors.deepOrange.darken3,
      //   success: colors.green.accent3,
      // },
    },
  },
  identifier: {
    ISSN: "2826-2832",
  },
  modules: {
    auth: {
      // The module is enabled. Change this to disable the module
      isEnabled: true,

      // The origin is set to the development origin. Change this when deploying to production by setting `origin` in this config before build-time or by exporting `AUTH_ORIGIN` by running `export AUTH_ORIGIN=...`
      origin: "http://localhost:3000",

      // The base path to the authentication endpoints. Change this if you want to add your auth-endpoints at a non-default location
      basePath: "/api/auth",

      // Whether to periodically refresh the session. Change this to `true` for a refresh every seconds or set this to a number like `5000` for a refresh every 5000 milliseconds (aka: 5 seconds)
      enableSessionRefreshPeriodically: false,

      // Whether to refresh the session whenever a window focus event happens, i.e, when your user refocuses the window. Set this to `false` to turn this off
      enableSessionRefreshOnWindowFocus: true,

      // Whether to add a global authentication middleware that will protect all pages without exclusion
      enableGlobalAppMiddleware: false,

      // Select the default-provider to use when `signIn` is called. Setting this here will also effect the global middleware behavior: E.g., when you set it to `github` and the user is unauthorized, they will be directly forwarded to the Github OAuth page instead of seeing the app-login page
      defaultProvider: "github",

      // Whether to automatically set the callback url to the page the user tried to visit when the middleware stopped them. This is useful to disable this when using the credentials provider, as it does not allow a `callbackUrl`. Setting this to a string-value will result in that being used as the callbackUrl path.
      addDefaultCallbackUrl: true,

      // Configuration of the global auth-middleware (only applies if you set `enableGlobalAppMiddleware: true` above!)
      globalMiddlewareOptions: {
        // Whether to allow access to 404 pages without authentication. Set this to `false` to force users to sign-in before seeing `404` pages. Setting this to false may lead to vue-router problems (as the target page does not exist)
        allow404WithoutAuth: true,

        // Whether to automatically set the callback url to the page the user tried to visit when the middleware stopped them. This is useful to disable this when using the credentials provider, as it does not allow a `callbackUrl`. Setting this to a string-value will result in that being used as the callbackUrl path. Note: You also need to set the global `addDefaultCallbackUrl` setting to `false` if you want to fully disable this for the global middleware.
        addDefaultCallbackUrl: true,
      },
    },
    apollo: {},
    sentry: {
      dsn: "https://a329c0ed448543d098d4c1956b6bffb4@sentry.paris-ias.io/13",
    },
    ackee: {
      domain: "0406b6c9-6dfc-44de-bb13-83bc0607cb14",
      server: "https://ackee.paris-ias.io/",
    },
    zenodo: {
      token: "YZ2NJN33R5K68Qh3ev46llet5b01FSSWdws3y4zxc4auBBHnq91xaBdGXDfU",
    },
    image: {
      domains: [
        "https://picsum.photos",
        // snipcart.nuxtjs.org',
        "source.unsplash.com",
      ],
    },
    deepl: {
      /*     key: process.env.DEEPL_KEY, */
    },
    fonts: {
      families: {
        "Bodoni+Moda": [500, 700],
        "Open+Sans": [500, 700],
      },
    },
    bibliography: {
      defaultStyle: "APA",
      styles: [],
    },
    github: {
      apiRoot: "https://api.github.com",
      token: process.env.GH_TOKEN,
      branch: "master",
      useOpenAuthoring: true,
      repo: "paris-iea/apex",
      squashMerges: true,
      cmsLabelPrefix: "Apex CMS update",
      initialWorkflowStatus: "Draft",
    },
  },

  sitemap: {
    main: [
      {
        text: "about",
        dropdown: true,
        children: [
          { text: "institute", path: "/about/institute" },
          { text: "scientific_policy", path: "/about/scientific_policy" },
          { text: "network", path: "/about/network" },
        ],
      },
      {
        text: "activities",
        dropdown: true,
        children: [
          { text: "fellowships", path: "/activities/fellowships" },
          { text: "projects", path: "/activities/projects" },
          {
            text: "events.key",
            path: "/activities/events",
          },
          { text: "publications", path: "/activities/publications" },
        ],
      },
      {
        text: "people",
        dropdown: true,
        children: [
          { text: "fellows", path: "/people?groups=fellows" },
          { text: "team", path: "/people?groups=team" },
          {
            text: "sab",
            path: "/people?groups=sab",
          },
          { text: "board", path: "/people?groups=board" },
          { text: "browse", path: "/people" },
        ],
      },
      {
        text: "news",
        path: "/news",
      },
    ],
    footer: [
      { text: "tos", path: "/tos" },
      { text: "contact", path: "/contact" },
      { text: "pressroom", path: "/pressroom" },
      { text: "newsletter", path: "/tos" },
      { text: "about", path: "/tos" },
      { text: "privacy_policy", path: "/tos" },
      { text: "support", path: "/support" },
    ],
  },

  socials: {
    linkedin: "iea-de-paris",
    youtube: "@IEAPARIS",
    twitter: "ieadeparis",
    bluesky: "iea-paris",
    github: "iea-paris",
    facebook:
      "Institut-d%C3%A9tudes-avanc%C3%A9es-de-Paris-IEA-de-Paris/277065215652486",
    rss: "https://paris-iea.fr/en/rss.xml",
  },
};
