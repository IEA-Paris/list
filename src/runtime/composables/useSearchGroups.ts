/**
 * Global-search group model.
 *
 * The global search resolver dispatches results into modifier-based
 * sub-categories (see query.search.all.gql / the Apex search resolver). The UI
 * presents them under their renamed top-level groups, e.g. People details into
 * team / sab / board / ethics / fellows, while Projects becomes "Collective
 * Intelligence" and Publications becomes "Resources".
 *
 * For each sub-category we keep:
 *  - `type`:       the result key in `rootStore.results` (also the i18n
 *                  `items.<type>` label key for the count line)
 *  - `parentType`: the underlying list module, used to resolve the item card
 *                  component and reuse module-level behaviour
 *  - `labelKey`:   optional i18n override when the sub-category label does not
 *                  live under `items.<type>` (people groups live under
 *                  `list.filters.people.groups.*`)
 *  - `pathPrefix`: route name for an individual item's detail page
 *  - `viewMore`:   path for the "view more" link (the sub-category landing page)
 */

export interface SearchSubCategory {
  type: string
  parentType: string
  labelKey?: string
  pathPrefix: string
  viewMore: string
}

export interface SearchGroup {
  /** i18n key for the group heading (under the list namespace). */
  labelKey: string
  /** Stable key for v-for / open-state tracking. */
  key: string
  subCategories: SearchSubCategory[]
}

const PEOPLE_DETAIL = "fellows-slug"
const ORGANISATION = "/about/organisation"

export const SEARCH_GROUPS: SearchGroup[] = [
  {
    key: "people",
    labelKey: "search.groups.people",
    subCategories: [
      // People share one detail route (/fellows/[slug]); the four governance
      // groups all land on the organisation page, fellows on the fellows page.
      {
        type: "team",
        parentType: "people",
        labelKey: "list.filters.people.groups.team",
        pathPrefix: PEOPLE_DETAIL,
        viewMore: ORGANISATION,
      },
      {
        type: "sab",
        parentType: "people",
        labelKey: "list.filters.people.groups.sab",
        pathPrefix: PEOPLE_DETAIL,
        viewMore: ORGANISATION,
      },
      {
        type: "board",
        parentType: "people",
        labelKey: "list.filters.people.groups.board",
        pathPrefix: PEOPLE_DETAIL,
        viewMore: ORGANISATION,
      },
      {
        type: "ethics",
        parentType: "people",
        labelKey: "list.filters.people.groups.ethics",
        pathPrefix: PEOPLE_DETAIL,
        viewMore: ORGANISATION,
      },
      {
        type: "fellows",
        parentType: "people",
        labelKey: "list.filters.people.groups.fellows",
        pathPrefix: PEOPLE_DETAIL,
        viewMore: "/fellows",
      },
    ],
  },
  {
    key: "collective-intelligence",
    labelKey: "search.groups.collective-intelligence",
    subCategories: [
      {
        type: "initiatives",
        parentType: "projects",
        pathPrefix: "programs-collective-intelligence-initiatives-slug",
        viewMore: "/programs/collective-intelligence/initiatives",
      },
      {
        type: "projects",
        parentType: "projects",
        pathPrefix: "programs-collective-intelligence-projects-slug",
        viewMore: "/programs/collective-intelligence/projects",
      },
      {
        type: "tools",
        parentType: "projects",
        pathPrefix: "programs-collective-intelligence-tools-slug",
        viewMore: "/programs/collective-intelligence/tools",
      },
    ],
  },
  {
    key: "events",
    labelKey: "search.groups.events",
    subCategories: [
      {
        type: "events",
        parentType: "events",
        pathPrefix: "events-slug",
        viewMore: "/events",
      },
    ],
  },
  {
    key: "fellowships",
    labelKey: "search.groups.fellowships",
    subCategories: [
      {
        type: "fellowships",
        parentType: "fellowships",
        pathPrefix: "programs-fellowships-slug",
        viewMore: "/programs/fellowships",
      },
    ],
  },
  {
    key: "resources",
    labelKey: "search.groups.resources",
    subCategories: [
      {
        type: "media",
        parentType: "publications",
        pathPrefix: "resources-media-slug",
        viewMore: "/resources/media",
      },
      {
        type: "publications",
        parentType: "publications",
        pathPrefix: "resources-publications-slug",
        viewMore: "/resources/publications",
      },
      {
        type: "news",
        parentType: "publications",
        pathPrefix: "resources-news-slug",
        viewMore: "/resources/news",
      },
    ],
  },
]

/** Every sub-category type, flattened — handy for store iteration. */
export const SEARCH_SUBCATEGORY_TYPES: string[] = SEARCH_GROUPS.flatMap((g) =>
  g.subCategories.map((s) => s.type),
)

/** Feminine grammatical gender per sub-category (drives the count i18n form). */
export const FEMININE_SUBCATEGORIES = new Set([
  "team",
  "media",
  "news",
  "publications",
])
