
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T extends DefineComponent> = T & DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>>
type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = (T & DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }>)
interface _GlobalComponents {
      'EventsBadges': typeof import("../src/runtime/components/events/Badges.vue")['default']
    'EventsDateTimePlace': typeof import("../src/runtime/components/events/DateTimePlace.vue")['default']
    'EventsDenseItem': typeof import("../src/runtime/components/events/DenseItem.vue")['default']
    'EventsExpandedItem': typeof import("../src/runtime/components/events/ExpandedItem.vue")['default']
    'EventsListContainer': typeof import("../src/runtime/components/events/ListContainer.vue")['default']
    'EventsRegisterModal': typeof import("../src/runtime/components/events/RegisterModal.vue")['default']
    'EventsRelatedItem': typeof import("../src/runtime/components/events/RelatedItem.vue")['default']
    'EventsRowsItem': typeof import("../src/runtime/components/events/RowsItem.vue")['default']
    'EventsView': typeof import("../src/runtime/components/events/View.vue")['default']
    'FellowshipsBadges': typeof import("../src/runtime/components/fellowships/Badges.vue")['default']
    'FellowshipsDenseItem': typeof import("../src/runtime/components/fellowships/DenseItem.vue")['default']
    'FellowshipsExpandedItem': typeof import("../src/runtime/components/fellowships/ExpandedItem.vue")['default']
    'FellowshipsRegisterModal': typeof import("../src/runtime/components/fellowships/RegisterModal.vue")['default']
    'FellowshipsRowsItem': typeof import("../src/runtime/components/fellowships/RowsItem.vue")['default']
    'FellowshipsView': typeof import("../src/runtime/components/fellowships/View.vue")['default']
    'ListAtomsFiltersMenu': typeof import("../src/runtime/components/list/atoms/FiltersMenu.vue")['default']
    'ListAtomsSearchInput': typeof import("../src/runtime/components/list/atoms/SearchInput.vue")['default']
    'ListAtomsSearchItem': typeof import("../src/runtime/components/list/atoms/SearchItem.vue")['default']
    'ListAtomsSearchString': typeof import("../src/runtime/components/list/atoms/SearchString.vue")['default']
    'ListAtomsSortMenu': typeof import("../src/runtime/components/list/atoms/SortMenu.vue")['default']
    'ListAtomsViewMenu': typeof import("../src/runtime/components/list/atoms/ViewMenu.vue")['default']
    'ListInputsAutoComplete': typeof import("../src/runtime/components/list/inputs/AutoComplete.vue")['default']
    'ListInputsBooleanSwitch': typeof import("../src/runtime/components/list/inputs/BooleanSwitch.vue")['default']
    'ListInputsCheckbox': typeof import("../src/runtime/components/list/inputs/Checkbox.vue")['default']
    'ListInputsSelect': typeof import("../src/runtime/components/list/inputs/Select.vue")['default']
    'ListMoleculesFilters': typeof import("../src/runtime/components/list/molecules/Filters.vue")['default']
    'ListMoleculesHeader': typeof import("../src/runtime/components/list/molecules/Header.vue")['default']
    'ListMoleculesPagination': typeof import("../src/runtime/components/list/molecules/Pagination.vue")['default']
    'ListOrganismsList': typeof import("../src/runtime/components/list/organisms/List.vue")['default']
    'ListViewsDense': typeof import("../src/runtime/components/list/views/Dense.vue")['default']
    'ListViewsExpanded': typeof import("../src/runtime/components/list/views/Expanded.vue")['default']
    'ListViewsGrid': typeof import("../src/runtime/components/list/views/Grid.vue")['default']
    'ListViewsRows': typeof import("../src/runtime/components/list/views/Rows.vue")['default']
    'ListViewsTable': typeof import("../src/runtime/components/list/views/Table.vue")['default']
    'MiscAtomsDateStamp': typeof import("../src/runtime/components/misc/atoms/DateStamp.vue")['default']
    'MiscAtomsImageContainer': typeof import("../src/runtime/components/misc/atoms/ImageContainer.vue")['default']
    'MiscAtomsShareMenu': typeof import("../src/runtime/components/misc/atoms/ShareMenu.vue")['default']
    'MiscAtomsSocials': typeof import("../src/runtime/components/misc/atoms/Socials.vue")['default']
    'MiscMoleculesChipContainer': typeof import("../src/runtime/components/misc/molecules/ChipContainer.vue")['default']
    'MiscMoleculesRelated': typeof import("../src/runtime/components/misc/molecules/Related.vue")['default']
    'MiscMoleculesRelatedItems': typeof import("../src/runtime/components/misc/molecules/RelatedItems.vue")['default']
    'MiscMoleculesSearchItem': typeof import("../src/runtime/components/misc/molecules/SearchItem.vue")['default']
    'NewsDenseItem': typeof import("../src/runtime/components/news/DenseItem.vue")['default']
    'NewsExpandedItem': typeof import("../src/runtime/components/news/ExpandedItem.vue")['default']
    'NewsHeader': typeof import("../src/runtime/components/news/Header.vue")['default']
    'NewsRelatedItem': typeof import("../src/runtime/components/news/RelatedItem.vue")['default']
    'NewsRowsItem': typeof import("../src/runtime/components/news/RowsItem.vue")['default']
    'NewsView': typeof import("../src/runtime/components/news/View.vue")['default']
    'PeopleDenseItem': typeof import("../src/runtime/components/people/DenseItem.vue")['default']
    'PeopleExpandedItem': typeof import("../src/runtime/components/people/ExpandedItem.vue")['default']
    'PeopleGroupBadges': typeof import("../src/runtime/components/people/GroupBadges.vue")['default']
    'PeopleRelatedItem': typeof import("../src/runtime/components/people/RelatedItem.vue")['default']
    'PeopleRowsItem': typeof import("../src/runtime/components/people/RowsItem.vue")['default']
    'PeopleView': typeof import("../src/runtime/components/people/View.vue")['default']
    'ProjectsExpandedItem': typeof import("../src/runtime/components/projects/ExpandedItem.vue")['default']
    'ProjectsRelatedItem': typeof import("../src/runtime/components/projects/RelatedItem.vue")['default']
    'ProjectsRowsItem': typeof import("../src/runtime/components/projects/RowsItem.vue")['default']
    'ProjectsView': typeof import("../src/runtime/components/projects/View.vue")['default']
    'PublicationsRelatedItem': typeof import("../src/runtime/components/publications/RelatedItem.vue")['default']
    'PublicationsRowsItem': typeof import("../src/runtime/components/publications/RowsItem.vue")['default']
    'PublicationsView': typeof import("../src/runtime/components/publications/View.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'NuxtLinkLocale': typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
    'SwitchLocalePathLink': typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
    'NoScript': typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
    'Link': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
    'Base': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
    'Title': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
    'Meta': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
    'Style': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
    'Head': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
    'Html': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
    'Body': typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
    'NuxtIsland': typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
    'NuxtRouteAnnouncer': IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
      'LazyEventsBadges': LazyComponent<typeof import("../src/runtime/components/events/Badges.vue")['default']>
    'LazyEventsDateTimePlace': LazyComponent<typeof import("../src/runtime/components/events/DateTimePlace.vue")['default']>
    'LazyEventsDenseItem': LazyComponent<typeof import("../src/runtime/components/events/DenseItem.vue")['default']>
    'LazyEventsExpandedItem': LazyComponent<typeof import("../src/runtime/components/events/ExpandedItem.vue")['default']>
    'LazyEventsListContainer': LazyComponent<typeof import("../src/runtime/components/events/ListContainer.vue")['default']>
    'LazyEventsRegisterModal': LazyComponent<typeof import("../src/runtime/components/events/RegisterModal.vue")['default']>
    'LazyEventsRelatedItem': LazyComponent<typeof import("../src/runtime/components/events/RelatedItem.vue")['default']>
    'LazyEventsRowsItem': LazyComponent<typeof import("../src/runtime/components/events/RowsItem.vue")['default']>
    'LazyEventsView': LazyComponent<typeof import("../src/runtime/components/events/View.vue")['default']>
    'LazyFellowshipsBadges': LazyComponent<typeof import("../src/runtime/components/fellowships/Badges.vue")['default']>
    'LazyFellowshipsDenseItem': LazyComponent<typeof import("../src/runtime/components/fellowships/DenseItem.vue")['default']>
    'LazyFellowshipsExpandedItem': LazyComponent<typeof import("../src/runtime/components/fellowships/ExpandedItem.vue")['default']>
    'LazyFellowshipsRegisterModal': LazyComponent<typeof import("../src/runtime/components/fellowships/RegisterModal.vue")['default']>
    'LazyFellowshipsRowsItem': LazyComponent<typeof import("../src/runtime/components/fellowships/RowsItem.vue")['default']>
    'LazyFellowshipsView': LazyComponent<typeof import("../src/runtime/components/fellowships/View.vue")['default']>
    'LazyListAtomsFiltersMenu': LazyComponent<typeof import("../src/runtime/components/list/atoms/FiltersMenu.vue")['default']>
    'LazyListAtomsSearchInput': LazyComponent<typeof import("../src/runtime/components/list/atoms/SearchInput.vue")['default']>
    'LazyListAtomsSearchItem': LazyComponent<typeof import("../src/runtime/components/list/atoms/SearchItem.vue")['default']>
    'LazyListAtomsSearchString': LazyComponent<typeof import("../src/runtime/components/list/atoms/SearchString.vue")['default']>
    'LazyListAtomsSortMenu': LazyComponent<typeof import("../src/runtime/components/list/atoms/SortMenu.vue")['default']>
    'LazyListAtomsViewMenu': LazyComponent<typeof import("../src/runtime/components/list/atoms/ViewMenu.vue")['default']>
    'LazyListInputsAutoComplete': LazyComponent<typeof import("../src/runtime/components/list/inputs/AutoComplete.vue")['default']>
    'LazyListInputsBooleanSwitch': LazyComponent<typeof import("../src/runtime/components/list/inputs/BooleanSwitch.vue")['default']>
    'LazyListInputsCheckbox': LazyComponent<typeof import("../src/runtime/components/list/inputs/Checkbox.vue")['default']>
    'LazyListInputsSelect': LazyComponent<typeof import("../src/runtime/components/list/inputs/Select.vue")['default']>
    'LazyListMoleculesFilters': LazyComponent<typeof import("../src/runtime/components/list/molecules/Filters.vue")['default']>
    'LazyListMoleculesHeader': LazyComponent<typeof import("../src/runtime/components/list/molecules/Header.vue")['default']>
    'LazyListMoleculesPagination': LazyComponent<typeof import("../src/runtime/components/list/molecules/Pagination.vue")['default']>
    'LazyListOrganismsList': LazyComponent<typeof import("../src/runtime/components/list/organisms/List.vue")['default']>
    'LazyListViewsDense': LazyComponent<typeof import("../src/runtime/components/list/views/Dense.vue")['default']>
    'LazyListViewsExpanded': LazyComponent<typeof import("../src/runtime/components/list/views/Expanded.vue")['default']>
    'LazyListViewsGrid': LazyComponent<typeof import("../src/runtime/components/list/views/Grid.vue")['default']>
    'LazyListViewsRows': LazyComponent<typeof import("../src/runtime/components/list/views/Rows.vue")['default']>
    'LazyListViewsTable': LazyComponent<typeof import("../src/runtime/components/list/views/Table.vue")['default']>
    'LazyMiscAtomsDateStamp': LazyComponent<typeof import("../src/runtime/components/misc/atoms/DateStamp.vue")['default']>
    'LazyMiscAtomsImageContainer': LazyComponent<typeof import("../src/runtime/components/misc/atoms/ImageContainer.vue")['default']>
    'LazyMiscAtomsShareMenu': LazyComponent<typeof import("../src/runtime/components/misc/atoms/ShareMenu.vue")['default']>
    'LazyMiscAtomsSocials': LazyComponent<typeof import("../src/runtime/components/misc/atoms/Socials.vue")['default']>
    'LazyMiscMoleculesChipContainer': LazyComponent<typeof import("../src/runtime/components/misc/molecules/ChipContainer.vue")['default']>
    'LazyMiscMoleculesRelated': LazyComponent<typeof import("../src/runtime/components/misc/molecules/Related.vue")['default']>
    'LazyMiscMoleculesRelatedItems': LazyComponent<typeof import("../src/runtime/components/misc/molecules/RelatedItems.vue")['default']>
    'LazyMiscMoleculesSearchItem': LazyComponent<typeof import("../src/runtime/components/misc/molecules/SearchItem.vue")['default']>
    'LazyNewsDenseItem': LazyComponent<typeof import("../src/runtime/components/news/DenseItem.vue")['default']>
    'LazyNewsExpandedItem': LazyComponent<typeof import("../src/runtime/components/news/ExpandedItem.vue")['default']>
    'LazyNewsHeader': LazyComponent<typeof import("../src/runtime/components/news/Header.vue")['default']>
    'LazyNewsRelatedItem': LazyComponent<typeof import("../src/runtime/components/news/RelatedItem.vue")['default']>
    'LazyNewsRowsItem': LazyComponent<typeof import("../src/runtime/components/news/RowsItem.vue")['default']>
    'LazyNewsView': LazyComponent<typeof import("../src/runtime/components/news/View.vue")['default']>
    'LazyPeopleDenseItem': LazyComponent<typeof import("../src/runtime/components/people/DenseItem.vue")['default']>
    'LazyPeopleExpandedItem': LazyComponent<typeof import("../src/runtime/components/people/ExpandedItem.vue")['default']>
    'LazyPeopleGroupBadges': LazyComponent<typeof import("../src/runtime/components/people/GroupBadges.vue")['default']>
    'LazyPeopleRelatedItem': LazyComponent<typeof import("../src/runtime/components/people/RelatedItem.vue")['default']>
    'LazyPeopleRowsItem': LazyComponent<typeof import("../src/runtime/components/people/RowsItem.vue")['default']>
    'LazyPeopleView': LazyComponent<typeof import("../src/runtime/components/people/View.vue")['default']>
    'LazyProjectsExpandedItem': LazyComponent<typeof import("../src/runtime/components/projects/ExpandedItem.vue")['default']>
    'LazyProjectsRelatedItem': LazyComponent<typeof import("../src/runtime/components/projects/RelatedItem.vue")['default']>
    'LazyProjectsRowsItem': LazyComponent<typeof import("../src/runtime/components/projects/RowsItem.vue")['default']>
    'LazyProjectsView': LazyComponent<typeof import("../src/runtime/components/projects/View.vue")['default']>
    'LazyPublicationsRelatedItem': LazyComponent<typeof import("../src/runtime/components/publications/RelatedItem.vue")['default']>
    'LazyPublicationsRowsItem': LazyComponent<typeof import("../src/runtime/components/publications/RowsItem.vue")['default']>
    'LazyPublicationsView': LazyComponent<typeof import("../src/runtime/components/publications/View.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyNuxtLinkLocale': LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
    'LazySwitchLocalePathLink': LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
    'LazyNoScript': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
    'LazyLink': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
    'LazyBase': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
    'LazyTitle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
    'LazyMeta': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
    'LazyStyle': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
    'LazyHead': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
    'LazyHtml': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
    'LazyBody': LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
    'LazyNuxtIsland': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export const EventsBadges: typeof import("../src/runtime/components/events/Badges.vue")['default']
export const EventsDateTimePlace: typeof import("../src/runtime/components/events/DateTimePlace.vue")['default']
export const EventsDenseItem: typeof import("../src/runtime/components/events/DenseItem.vue")['default']
export const EventsExpandedItem: typeof import("../src/runtime/components/events/ExpandedItem.vue")['default']
export const EventsListContainer: typeof import("../src/runtime/components/events/ListContainer.vue")['default']
export const EventsRegisterModal: typeof import("../src/runtime/components/events/RegisterModal.vue")['default']
export const EventsRelatedItem: typeof import("../src/runtime/components/events/RelatedItem.vue")['default']
export const EventsRowsItem: typeof import("../src/runtime/components/events/RowsItem.vue")['default']
export const EventsView: typeof import("../src/runtime/components/events/View.vue")['default']
export const FellowshipsBadges: typeof import("../src/runtime/components/fellowships/Badges.vue")['default']
export const FellowshipsDenseItem: typeof import("../src/runtime/components/fellowships/DenseItem.vue")['default']
export const FellowshipsExpandedItem: typeof import("../src/runtime/components/fellowships/ExpandedItem.vue")['default']
export const FellowshipsRegisterModal: typeof import("../src/runtime/components/fellowships/RegisterModal.vue")['default']
export const FellowshipsRowsItem: typeof import("../src/runtime/components/fellowships/RowsItem.vue")['default']
export const FellowshipsView: typeof import("../src/runtime/components/fellowships/View.vue")['default']
export const ListAtomsFiltersMenu: typeof import("../src/runtime/components/list/atoms/FiltersMenu.vue")['default']
export const ListAtomsSearchInput: typeof import("../src/runtime/components/list/atoms/SearchInput.vue")['default']
export const ListAtomsSearchItem: typeof import("../src/runtime/components/list/atoms/SearchItem.vue")['default']
export const ListAtomsSearchString: typeof import("../src/runtime/components/list/atoms/SearchString.vue")['default']
export const ListAtomsSortMenu: typeof import("../src/runtime/components/list/atoms/SortMenu.vue")['default']
export const ListAtomsViewMenu: typeof import("../src/runtime/components/list/atoms/ViewMenu.vue")['default']
export const ListInputsAutoComplete: typeof import("../src/runtime/components/list/inputs/AutoComplete.vue")['default']
export const ListInputsBooleanSwitch: typeof import("../src/runtime/components/list/inputs/BooleanSwitch.vue")['default']
export const ListInputsCheckbox: typeof import("../src/runtime/components/list/inputs/Checkbox.vue")['default']
export const ListInputsSelect: typeof import("../src/runtime/components/list/inputs/Select.vue")['default']
export const ListMoleculesFilters: typeof import("../src/runtime/components/list/molecules/Filters.vue")['default']
export const ListMoleculesHeader: typeof import("../src/runtime/components/list/molecules/Header.vue")['default']
export const ListMoleculesPagination: typeof import("../src/runtime/components/list/molecules/Pagination.vue")['default']
export const ListOrganismsList: typeof import("../src/runtime/components/list/organisms/List.vue")['default']
export const ListViewsDense: typeof import("../src/runtime/components/list/views/Dense.vue")['default']
export const ListViewsExpanded: typeof import("../src/runtime/components/list/views/Expanded.vue")['default']
export const ListViewsGrid: typeof import("../src/runtime/components/list/views/Grid.vue")['default']
export const ListViewsRows: typeof import("../src/runtime/components/list/views/Rows.vue")['default']
export const ListViewsTable: typeof import("../src/runtime/components/list/views/Table.vue")['default']
export const MiscAtomsDateStamp: typeof import("../src/runtime/components/misc/atoms/DateStamp.vue")['default']
export const MiscAtomsImageContainer: typeof import("../src/runtime/components/misc/atoms/ImageContainer.vue")['default']
export const MiscAtomsShareMenu: typeof import("../src/runtime/components/misc/atoms/ShareMenu.vue")['default']
export const MiscAtomsSocials: typeof import("../src/runtime/components/misc/atoms/Socials.vue")['default']
export const MiscMoleculesChipContainer: typeof import("../src/runtime/components/misc/molecules/ChipContainer.vue")['default']
export const MiscMoleculesRelated: typeof import("../src/runtime/components/misc/molecules/Related.vue")['default']
export const MiscMoleculesRelatedItems: typeof import("../src/runtime/components/misc/molecules/RelatedItems.vue")['default']
export const MiscMoleculesSearchItem: typeof import("../src/runtime/components/misc/molecules/SearchItem.vue")['default']
export const NewsDenseItem: typeof import("../src/runtime/components/news/DenseItem.vue")['default']
export const NewsExpandedItem: typeof import("../src/runtime/components/news/ExpandedItem.vue")['default']
export const NewsHeader: typeof import("../src/runtime/components/news/Header.vue")['default']
export const NewsRelatedItem: typeof import("../src/runtime/components/news/RelatedItem.vue")['default']
export const NewsRowsItem: typeof import("../src/runtime/components/news/RowsItem.vue")['default']
export const NewsView: typeof import("../src/runtime/components/news/View.vue")['default']
export const PeopleDenseItem: typeof import("../src/runtime/components/people/DenseItem.vue")['default']
export const PeopleExpandedItem: typeof import("../src/runtime/components/people/ExpandedItem.vue")['default']
export const PeopleGroupBadges: typeof import("../src/runtime/components/people/GroupBadges.vue")['default']
export const PeopleRelatedItem: typeof import("../src/runtime/components/people/RelatedItem.vue")['default']
export const PeopleRowsItem: typeof import("../src/runtime/components/people/RowsItem.vue")['default']
export const PeopleView: typeof import("../src/runtime/components/people/View.vue")['default']
export const ProjectsExpandedItem: typeof import("../src/runtime/components/projects/ExpandedItem.vue")['default']
export const ProjectsRelatedItem: typeof import("../src/runtime/components/projects/RelatedItem.vue")['default']
export const ProjectsRowsItem: typeof import("../src/runtime/components/projects/RowsItem.vue")['default']
export const ProjectsView: typeof import("../src/runtime/components/projects/View.vue")['default']
export const PublicationsRelatedItem: typeof import("../src/runtime/components/publications/RelatedItem.vue")['default']
export const PublicationsRowsItem: typeof import("../src/runtime/components/publications/RowsItem.vue")['default']
export const PublicationsView: typeof import("../src/runtime/components/publications/View.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const NuxtLinkLocale: typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
export const SwitchLocalePathLink: typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const NuxtRouteAnnouncer: IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyEventsBadges: LazyComponent<typeof import("../src/runtime/components/events/Badges.vue")['default']>
export const LazyEventsDateTimePlace: LazyComponent<typeof import("../src/runtime/components/events/DateTimePlace.vue")['default']>
export const LazyEventsDenseItem: LazyComponent<typeof import("../src/runtime/components/events/DenseItem.vue")['default']>
export const LazyEventsExpandedItem: LazyComponent<typeof import("../src/runtime/components/events/ExpandedItem.vue")['default']>
export const LazyEventsListContainer: LazyComponent<typeof import("../src/runtime/components/events/ListContainer.vue")['default']>
export const LazyEventsRegisterModal: LazyComponent<typeof import("../src/runtime/components/events/RegisterModal.vue")['default']>
export const LazyEventsRelatedItem: LazyComponent<typeof import("../src/runtime/components/events/RelatedItem.vue")['default']>
export const LazyEventsRowsItem: LazyComponent<typeof import("../src/runtime/components/events/RowsItem.vue")['default']>
export const LazyEventsView: LazyComponent<typeof import("../src/runtime/components/events/View.vue")['default']>
export const LazyFellowshipsBadges: LazyComponent<typeof import("../src/runtime/components/fellowships/Badges.vue")['default']>
export const LazyFellowshipsDenseItem: LazyComponent<typeof import("../src/runtime/components/fellowships/DenseItem.vue")['default']>
export const LazyFellowshipsExpandedItem: LazyComponent<typeof import("../src/runtime/components/fellowships/ExpandedItem.vue")['default']>
export const LazyFellowshipsRegisterModal: LazyComponent<typeof import("../src/runtime/components/fellowships/RegisterModal.vue")['default']>
export const LazyFellowshipsRowsItem: LazyComponent<typeof import("../src/runtime/components/fellowships/RowsItem.vue")['default']>
export const LazyFellowshipsView: LazyComponent<typeof import("../src/runtime/components/fellowships/View.vue")['default']>
export const LazyListAtomsFiltersMenu: LazyComponent<typeof import("../src/runtime/components/list/atoms/FiltersMenu.vue")['default']>
export const LazyListAtomsSearchInput: LazyComponent<typeof import("../src/runtime/components/list/atoms/SearchInput.vue")['default']>
export const LazyListAtomsSearchItem: LazyComponent<typeof import("../src/runtime/components/list/atoms/SearchItem.vue")['default']>
export const LazyListAtomsSearchString: LazyComponent<typeof import("../src/runtime/components/list/atoms/SearchString.vue")['default']>
export const LazyListAtomsSortMenu: LazyComponent<typeof import("../src/runtime/components/list/atoms/SortMenu.vue")['default']>
export const LazyListAtomsViewMenu: LazyComponent<typeof import("../src/runtime/components/list/atoms/ViewMenu.vue")['default']>
export const LazyListInputsAutoComplete: LazyComponent<typeof import("../src/runtime/components/list/inputs/AutoComplete.vue")['default']>
export const LazyListInputsBooleanSwitch: LazyComponent<typeof import("../src/runtime/components/list/inputs/BooleanSwitch.vue")['default']>
export const LazyListInputsCheckbox: LazyComponent<typeof import("../src/runtime/components/list/inputs/Checkbox.vue")['default']>
export const LazyListInputsSelect: LazyComponent<typeof import("../src/runtime/components/list/inputs/Select.vue")['default']>
export const LazyListMoleculesFilters: LazyComponent<typeof import("../src/runtime/components/list/molecules/Filters.vue")['default']>
export const LazyListMoleculesHeader: LazyComponent<typeof import("../src/runtime/components/list/molecules/Header.vue")['default']>
export const LazyListMoleculesPagination: LazyComponent<typeof import("../src/runtime/components/list/molecules/Pagination.vue")['default']>
export const LazyListOrganismsList: LazyComponent<typeof import("../src/runtime/components/list/organisms/List.vue")['default']>
export const LazyListViewsDense: LazyComponent<typeof import("../src/runtime/components/list/views/Dense.vue")['default']>
export const LazyListViewsExpanded: LazyComponent<typeof import("../src/runtime/components/list/views/Expanded.vue")['default']>
export const LazyListViewsGrid: LazyComponent<typeof import("../src/runtime/components/list/views/Grid.vue")['default']>
export const LazyListViewsRows: LazyComponent<typeof import("../src/runtime/components/list/views/Rows.vue")['default']>
export const LazyListViewsTable: LazyComponent<typeof import("../src/runtime/components/list/views/Table.vue")['default']>
export const LazyMiscAtomsDateStamp: LazyComponent<typeof import("../src/runtime/components/misc/atoms/DateStamp.vue")['default']>
export const LazyMiscAtomsImageContainer: LazyComponent<typeof import("../src/runtime/components/misc/atoms/ImageContainer.vue")['default']>
export const LazyMiscAtomsShareMenu: LazyComponent<typeof import("../src/runtime/components/misc/atoms/ShareMenu.vue")['default']>
export const LazyMiscAtomsSocials: LazyComponent<typeof import("../src/runtime/components/misc/atoms/Socials.vue")['default']>
export const LazyMiscMoleculesChipContainer: LazyComponent<typeof import("../src/runtime/components/misc/molecules/ChipContainer.vue")['default']>
export const LazyMiscMoleculesRelated: LazyComponent<typeof import("../src/runtime/components/misc/molecules/Related.vue")['default']>
export const LazyMiscMoleculesRelatedItems: LazyComponent<typeof import("../src/runtime/components/misc/molecules/RelatedItems.vue")['default']>
export const LazyMiscMoleculesSearchItem: LazyComponent<typeof import("../src/runtime/components/misc/molecules/SearchItem.vue")['default']>
export const LazyNewsDenseItem: LazyComponent<typeof import("../src/runtime/components/news/DenseItem.vue")['default']>
export const LazyNewsExpandedItem: LazyComponent<typeof import("../src/runtime/components/news/ExpandedItem.vue")['default']>
export const LazyNewsHeader: LazyComponent<typeof import("../src/runtime/components/news/Header.vue")['default']>
export const LazyNewsRelatedItem: LazyComponent<typeof import("../src/runtime/components/news/RelatedItem.vue")['default']>
export const LazyNewsRowsItem: LazyComponent<typeof import("../src/runtime/components/news/RowsItem.vue")['default']>
export const LazyNewsView: LazyComponent<typeof import("../src/runtime/components/news/View.vue")['default']>
export const LazyPeopleDenseItem: LazyComponent<typeof import("../src/runtime/components/people/DenseItem.vue")['default']>
export const LazyPeopleExpandedItem: LazyComponent<typeof import("../src/runtime/components/people/ExpandedItem.vue")['default']>
export const LazyPeopleGroupBadges: LazyComponent<typeof import("../src/runtime/components/people/GroupBadges.vue")['default']>
export const LazyPeopleRelatedItem: LazyComponent<typeof import("../src/runtime/components/people/RelatedItem.vue")['default']>
export const LazyPeopleRowsItem: LazyComponent<typeof import("../src/runtime/components/people/RowsItem.vue")['default']>
export const LazyPeopleView: LazyComponent<typeof import("../src/runtime/components/people/View.vue")['default']>
export const LazyProjectsExpandedItem: LazyComponent<typeof import("../src/runtime/components/projects/ExpandedItem.vue")['default']>
export const LazyProjectsRelatedItem: LazyComponent<typeof import("../src/runtime/components/projects/RelatedItem.vue")['default']>
export const LazyProjectsRowsItem: LazyComponent<typeof import("../src/runtime/components/projects/RowsItem.vue")['default']>
export const LazyProjectsView: LazyComponent<typeof import("../src/runtime/components/projects/View.vue")['default']>
export const LazyPublicationsRelatedItem: LazyComponent<typeof import("../src/runtime/components/publications/RelatedItem.vue")['default']>
export const LazyPublicationsRowsItem: LazyComponent<typeof import("../src/runtime/components/publications/RowsItem.vue")['default']>
export const LazyPublicationsView: LazyComponent<typeof import("../src/runtime/components/publications/View.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyNuxtLinkLocale: LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
export const LazySwitchLocalePathLink: LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page-placeholder")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<IslandComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>>

export const componentNames: string[]
