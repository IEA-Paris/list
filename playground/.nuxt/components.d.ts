
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
      'Footer': typeof import("../components/Footer.vue")['default']
    'ActionsExpandedItem': typeof import("../../src/runtime/components/actions/ExpandedItem.vue")['default']
    'ActionsRowsItem': typeof import("../../src/runtime/components/actions/RowsItem.vue")['default']
    'ActionsView': typeof import("../../src/runtime/components/actions/View.vue")['default']
    'AffiliationsExpandedItem': typeof import("../../src/runtime/components/affiliations/ExpandedItem.vue")['default']
    'AffiliationsRowsItem': typeof import("../../src/runtime/components/affiliations/RowsItem.vue")['default']
    'AffiliationsView': typeof import("../../src/runtime/components/affiliations/View.vue")['default']
    'DisciplinesExpandedItem': typeof import("../../src/runtime/components/disciplines/ExpandedItem.vue")['default']
    'DisciplinesRowsItem': typeof import("../../src/runtime/components/disciplines/RowsItem.vue")['default']
    'DisciplinesView': typeof import("../../src/runtime/components/disciplines/View.vue")['default']
    'EventsBadges': typeof import("../../src/runtime/components/events/Badges.vue")['default']
    'EventsDateTimePlace': typeof import("../../src/runtime/components/events/DateTimePlace.vue")['default']
    'EventsDenseItem': typeof import("../../src/runtime/components/events/DenseItem.vue")['default']
    'EventsExpandedItem': typeof import("../../src/runtime/components/events/ExpandedItem.vue")['default']
    'EventsRegisterModal': typeof import("../../src/runtime/components/events/RegisterModal.vue")['default']
    'EventsRelatedItem': typeof import("../../src/runtime/components/events/RelatedItem.vue")['default']
    'EventsRowsItem': typeof import("../../src/runtime/components/events/RowsItem.vue")['default']
    'EventsView': typeof import("../../src/runtime/components/events/View.vue")['default']
    'FellowshipsBadges': typeof import("../../src/runtime/components/fellowships/Badges.vue")['default']
    'FellowshipsDenseItem': typeof import("../../src/runtime/components/fellowships/DenseItem.vue")['default']
    'FellowshipsExpandedItem': typeof import("../../src/runtime/components/fellowships/ExpandedItem.vue")['default']
    'FellowshipsRegisterModal': typeof import("../../src/runtime/components/fellowships/RegisterModal.vue")['default']
    'FellowshipsRowsItem': typeof import("../../src/runtime/components/fellowships/RowsItem.vue")['default']
    'FellowshipsView': typeof import("../../src/runtime/components/fellowships/View.vue")['default']
    'FilesExpandedItem': typeof import("../../src/runtime/components/files/ExpandedItem.vue")['default']
    'FilesRowsItem': typeof import("../../src/runtime/components/files/RowsItem.vue")['default']
    'FilesView': typeof import("../../src/runtime/components/files/View.vue")['default']
    'ListAtomsFiltersMenu': typeof import("../../src/runtime/components/list/atoms/FiltersMenu.vue")['default']
    'ListAtomsResetButton': typeof import("../../src/runtime/components/list/atoms/ResetButton.vue")['default']
    'ListAtomsSearchInput': typeof import("../../src/runtime/components/list/atoms/SearchInput.vue")['default']
    'ListAtomsSearchItem': typeof import("../../src/runtime/components/list/atoms/SearchItem.vue")['default']
    'ListAtomsSearchString': typeof import("../../src/runtime/components/list/atoms/SearchString.vue")['default']
    'ListAtomsSortMenu': typeof import("../../src/runtime/components/list/atoms/SortMenu.vue")['default']
    'ListAtomsViewMenu': typeof import("../../src/runtime/components/list/atoms/ViewMenu.vue")['default']
    'ListInputsAutoComplete': typeof import("../../src/runtime/components/list/inputs/AutoComplete.vue")['default']
    'ListInputsBooleanSwitch': typeof import("../../src/runtime/components/list/inputs/BooleanSwitch.vue")['default']
    'ListInputsCheckbox': typeof import("../../src/runtime/components/list/inputs/Checkbox.vue")['default']
    'ListInputsSelect': typeof import("../../src/runtime/components/list/inputs/Select.vue")['default']
    'ListMoleculesFilters': typeof import("../../src/runtime/components/list/molecules/Filters.vue")['default']
    'ListMoleculesHeader': typeof import("../../src/runtime/components/list/molecules/Header.vue")['default']
    'ListMoleculesPagination': typeof import("../../src/runtime/components/list/molecules/Pagination.vue")['default']
    'ListOrganismsList': typeof import("../../src/runtime/components/list/organisms/List.vue")['default']
    'ListOrganismsSlider': typeof import("../../src/runtime/components/list/organisms/Slider.vue")['default']
    'ListViewsDense': typeof import("../../src/runtime/components/list/views/Dense.vue")['default']
    'ListViewsExpanded': typeof import("../../src/runtime/components/list/views/Expanded.vue")['default']
    'ListViewsGrid': typeof import("../../src/runtime/components/list/views/Grid.vue")['default']
    'ListViewsRows': typeof import("../../src/runtime/components/list/views/Rows.vue")['default']
    'ListViewsSlider': typeof import("../../src/runtime/components/list/views/Slider.vue")['default']
    'ListViewsTable': typeof import("../../src/runtime/components/list/views/Table.vue")['default']
    'MailingExpandedItem': typeof import("../../src/runtime/components/mailing/ExpandedItem.vue")['default']
    'MailingRowsItem': typeof import("../../src/runtime/components/mailing/RowsItem.vue")['default']
    'MailingView': typeof import("../../src/runtime/components/mailing/View.vue")['default']
    'MiscAtomsDateStamp': typeof import("../../src/runtime/components/misc/atoms/DateStamp.vue")['default']
    'MiscAtomsImageContainer': typeof import("../../src/runtime/components/misc/atoms/ImageContainer.vue")['default']
    'MiscAtomsShareMenu': typeof import("../../src/runtime/components/misc/atoms/ShareMenu.vue")['default']
    'MiscAtomsSocials': typeof import("../../src/runtime/components/misc/atoms/Socials.vue")['default']
    'MiscMoleculesChipContainer': typeof import("../../src/runtime/components/misc/molecules/ChipContainer.vue")['default']
    'MiscMoleculesRelated': typeof import("../../src/runtime/components/misc/molecules/Related.vue")['default']
    'MiscMoleculesRelatedItems': typeof import("../../src/runtime/components/misc/molecules/RelatedItems.vue")['default']
    'MiscMoleculesSearchItem': typeof import("../../src/runtime/components/misc/molecules/SearchItem.vue")['default']
    'NewsDenseItem': typeof import("../../src/runtime/components/news/DenseItem.vue")['default']
    'NewsExpandedItem': typeof import("../../src/runtime/components/news/ExpandedItem.vue")['default']
    'NewsHeader': typeof import("../../src/runtime/components/news/Header.vue")['default']
    'NewsRelatedItem': typeof import("../../src/runtime/components/news/RelatedItem.vue")['default']
    'NewsRowsItem': typeof import("../../src/runtime/components/news/RowsItem.vue")['default']
    'NewsView': typeof import("../../src/runtime/components/news/View.vue")['default']
    'PeopleDenseItem': typeof import("../../src/runtime/components/people/DenseItem.vue")['default']
    'PeopleExpandedItem': typeof import("../../src/runtime/components/people/ExpandedItem.vue")['default']
    'PeopleGroupBadges': typeof import("../../src/runtime/components/people/GroupBadges.vue")['default']
    'PeopleRelatedItem': typeof import("../../src/runtime/components/people/RelatedItem.vue")['default']
    'PeopleRowsItem': typeof import("../../src/runtime/components/people/RowsItem.vue")['default']
    'PeopleView': typeof import("../../src/runtime/components/people/View.vue")['default']
    'ProjectsExpandedItem': typeof import("../../src/runtime/components/projects/ExpandedItem.vue")['default']
    'ProjectsRelatedItem': typeof import("../../src/runtime/components/projects/RelatedItem.vue")['default']
    'ProjectsRowsItem': typeof import("../../src/runtime/components/projects/RowsItem.vue")['default']
    'ProjectsView': typeof import("../../src/runtime/components/projects/View.vue")['default']
    'PublicationsRelatedItem': typeof import("../../src/runtime/components/publications/RelatedItem.vue")['default']
    'PublicationsRowsItem': typeof import("../../src/runtime/components/publications/RowsItem.vue")['default']
    'PublicationsView': typeof import("../../src/runtime/components/publications/View.vue")['default']
    'TagsExpandedItem': typeof import("../../src/runtime/components/tags/ExpandedItem.vue")['default']
    'TagsRowsItem': typeof import("../../src/runtime/components/tags/RowsItem.vue")['default']
    'TagsView': typeof import("../../src/runtime/components/tags/View.vue")['default']
    'ProseA': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']
    'ProseBlockquote': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']
    'ProseCode': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue")['default']
    'ProseEm': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']
    'ProseH1': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']
    'ProseH2': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']
    'ProseH3': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']
    'ProseH4': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']
    'ProseH5': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']
    'ProseH6': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']
    'ProseHr': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']
    'ProseImg': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']
    'ProseLi': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']
    'ProseOl': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']
    'ProseP': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']
    'ProsePre': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue")['default']
    'ProseScript': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']
    'ProseStrong': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']
    'ProseTable': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']
    'ProseTbody': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']
    'ProseTd': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']
    'ProseTh': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']
    'ProseThead': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']
    'ProseTr': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']
    'ProseUl': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']
    'NuxtWelcome': typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
    'NuxtLayout': typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
    'NuxtErrorBoundary': typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
    'ClientOnly': typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
    'DevOnly': typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
    'ServerPlaceholder': typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
    'NuxtLink': typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
    'NuxtLoadingIndicator': typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
    'NuxtRouteAnnouncer': typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
    'NuxtImg': typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
    'NuxtPicture': typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
    'NuxtLinkLocale': typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
    'SwitchLocalePathLink': typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
    'MDC': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']
    'MDCRenderer': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']
    'MDCSlot': typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']
    'NuxtPage': typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
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
      'LazyFooter': LazyComponent<typeof import("../components/Footer.vue")['default']>
    'LazyActionsExpandedItem': LazyComponent<typeof import("../../src/runtime/components/actions/ExpandedItem.vue")['default']>
    'LazyActionsRowsItem': LazyComponent<typeof import("../../src/runtime/components/actions/RowsItem.vue")['default']>
    'LazyActionsView': LazyComponent<typeof import("../../src/runtime/components/actions/View.vue")['default']>
    'LazyAffiliationsExpandedItem': LazyComponent<typeof import("../../src/runtime/components/affiliations/ExpandedItem.vue")['default']>
    'LazyAffiliationsRowsItem': LazyComponent<typeof import("../../src/runtime/components/affiliations/RowsItem.vue")['default']>
    'LazyAffiliationsView': LazyComponent<typeof import("../../src/runtime/components/affiliations/View.vue")['default']>
    'LazyDisciplinesExpandedItem': LazyComponent<typeof import("../../src/runtime/components/disciplines/ExpandedItem.vue")['default']>
    'LazyDisciplinesRowsItem': LazyComponent<typeof import("../../src/runtime/components/disciplines/RowsItem.vue")['default']>
    'LazyDisciplinesView': LazyComponent<typeof import("../../src/runtime/components/disciplines/View.vue")['default']>
    'LazyEventsBadges': LazyComponent<typeof import("../../src/runtime/components/events/Badges.vue")['default']>
    'LazyEventsDateTimePlace': LazyComponent<typeof import("../../src/runtime/components/events/DateTimePlace.vue")['default']>
    'LazyEventsDenseItem': LazyComponent<typeof import("../../src/runtime/components/events/DenseItem.vue")['default']>
    'LazyEventsExpandedItem': LazyComponent<typeof import("../../src/runtime/components/events/ExpandedItem.vue")['default']>
    'LazyEventsRegisterModal': LazyComponent<typeof import("../../src/runtime/components/events/RegisterModal.vue")['default']>
    'LazyEventsRelatedItem': LazyComponent<typeof import("../../src/runtime/components/events/RelatedItem.vue")['default']>
    'LazyEventsRowsItem': LazyComponent<typeof import("../../src/runtime/components/events/RowsItem.vue")['default']>
    'LazyEventsView': LazyComponent<typeof import("../../src/runtime/components/events/View.vue")['default']>
    'LazyFellowshipsBadges': LazyComponent<typeof import("../../src/runtime/components/fellowships/Badges.vue")['default']>
    'LazyFellowshipsDenseItem': LazyComponent<typeof import("../../src/runtime/components/fellowships/DenseItem.vue")['default']>
    'LazyFellowshipsExpandedItem': LazyComponent<typeof import("../../src/runtime/components/fellowships/ExpandedItem.vue")['default']>
    'LazyFellowshipsRegisterModal': LazyComponent<typeof import("../../src/runtime/components/fellowships/RegisterModal.vue")['default']>
    'LazyFellowshipsRowsItem': LazyComponent<typeof import("../../src/runtime/components/fellowships/RowsItem.vue")['default']>
    'LazyFellowshipsView': LazyComponent<typeof import("../../src/runtime/components/fellowships/View.vue")['default']>
    'LazyFilesExpandedItem': LazyComponent<typeof import("../../src/runtime/components/files/ExpandedItem.vue")['default']>
    'LazyFilesRowsItem': LazyComponent<typeof import("../../src/runtime/components/files/RowsItem.vue")['default']>
    'LazyFilesView': LazyComponent<typeof import("../../src/runtime/components/files/View.vue")['default']>
    'LazyListAtomsFiltersMenu': LazyComponent<typeof import("../../src/runtime/components/list/atoms/FiltersMenu.vue")['default']>
    'LazyListAtomsResetButton': LazyComponent<typeof import("../../src/runtime/components/list/atoms/ResetButton.vue")['default']>
    'LazyListAtomsSearchInput': LazyComponent<typeof import("../../src/runtime/components/list/atoms/SearchInput.vue")['default']>
    'LazyListAtomsSearchItem': LazyComponent<typeof import("../../src/runtime/components/list/atoms/SearchItem.vue")['default']>
    'LazyListAtomsSearchString': LazyComponent<typeof import("../../src/runtime/components/list/atoms/SearchString.vue")['default']>
    'LazyListAtomsSortMenu': LazyComponent<typeof import("../../src/runtime/components/list/atoms/SortMenu.vue")['default']>
    'LazyListAtomsViewMenu': LazyComponent<typeof import("../../src/runtime/components/list/atoms/ViewMenu.vue")['default']>
    'LazyListInputsAutoComplete': LazyComponent<typeof import("../../src/runtime/components/list/inputs/AutoComplete.vue")['default']>
    'LazyListInputsBooleanSwitch': LazyComponent<typeof import("../../src/runtime/components/list/inputs/BooleanSwitch.vue")['default']>
    'LazyListInputsCheckbox': LazyComponent<typeof import("../../src/runtime/components/list/inputs/Checkbox.vue")['default']>
    'LazyListInputsSelect': LazyComponent<typeof import("../../src/runtime/components/list/inputs/Select.vue")['default']>
    'LazyListMoleculesFilters': LazyComponent<typeof import("../../src/runtime/components/list/molecules/Filters.vue")['default']>
    'LazyListMoleculesHeader': LazyComponent<typeof import("../../src/runtime/components/list/molecules/Header.vue")['default']>
    'LazyListMoleculesPagination': LazyComponent<typeof import("../../src/runtime/components/list/molecules/Pagination.vue")['default']>
    'LazyListOrganismsList': LazyComponent<typeof import("../../src/runtime/components/list/organisms/List.vue")['default']>
    'LazyListOrganismsSlider': LazyComponent<typeof import("../../src/runtime/components/list/organisms/Slider.vue")['default']>
    'LazyListViewsDense': LazyComponent<typeof import("../../src/runtime/components/list/views/Dense.vue")['default']>
    'LazyListViewsExpanded': LazyComponent<typeof import("../../src/runtime/components/list/views/Expanded.vue")['default']>
    'LazyListViewsGrid': LazyComponent<typeof import("../../src/runtime/components/list/views/Grid.vue")['default']>
    'LazyListViewsRows': LazyComponent<typeof import("../../src/runtime/components/list/views/Rows.vue")['default']>
    'LazyListViewsSlider': LazyComponent<typeof import("../../src/runtime/components/list/views/Slider.vue")['default']>
    'LazyListViewsTable': LazyComponent<typeof import("../../src/runtime/components/list/views/Table.vue")['default']>
    'LazyMailingExpandedItem': LazyComponent<typeof import("../../src/runtime/components/mailing/ExpandedItem.vue")['default']>
    'LazyMailingRowsItem': LazyComponent<typeof import("../../src/runtime/components/mailing/RowsItem.vue")['default']>
    'LazyMailingView': LazyComponent<typeof import("../../src/runtime/components/mailing/View.vue")['default']>
    'LazyMiscAtomsDateStamp': LazyComponent<typeof import("../../src/runtime/components/misc/atoms/DateStamp.vue")['default']>
    'LazyMiscAtomsImageContainer': LazyComponent<typeof import("../../src/runtime/components/misc/atoms/ImageContainer.vue")['default']>
    'LazyMiscAtomsShareMenu': LazyComponent<typeof import("../../src/runtime/components/misc/atoms/ShareMenu.vue")['default']>
    'LazyMiscAtomsSocials': LazyComponent<typeof import("../../src/runtime/components/misc/atoms/Socials.vue")['default']>
    'LazyMiscMoleculesChipContainer': LazyComponent<typeof import("../../src/runtime/components/misc/molecules/ChipContainer.vue")['default']>
    'LazyMiscMoleculesRelated': LazyComponent<typeof import("../../src/runtime/components/misc/molecules/Related.vue")['default']>
    'LazyMiscMoleculesRelatedItems': LazyComponent<typeof import("../../src/runtime/components/misc/molecules/RelatedItems.vue")['default']>
    'LazyMiscMoleculesSearchItem': LazyComponent<typeof import("../../src/runtime/components/misc/molecules/SearchItem.vue")['default']>
    'LazyNewsDenseItem': LazyComponent<typeof import("../../src/runtime/components/news/DenseItem.vue")['default']>
    'LazyNewsExpandedItem': LazyComponent<typeof import("../../src/runtime/components/news/ExpandedItem.vue")['default']>
    'LazyNewsHeader': LazyComponent<typeof import("../../src/runtime/components/news/Header.vue")['default']>
    'LazyNewsRelatedItem': LazyComponent<typeof import("../../src/runtime/components/news/RelatedItem.vue")['default']>
    'LazyNewsRowsItem': LazyComponent<typeof import("../../src/runtime/components/news/RowsItem.vue")['default']>
    'LazyNewsView': LazyComponent<typeof import("../../src/runtime/components/news/View.vue")['default']>
    'LazyPeopleDenseItem': LazyComponent<typeof import("../../src/runtime/components/people/DenseItem.vue")['default']>
    'LazyPeopleExpandedItem': LazyComponent<typeof import("../../src/runtime/components/people/ExpandedItem.vue")['default']>
    'LazyPeopleGroupBadges': LazyComponent<typeof import("../../src/runtime/components/people/GroupBadges.vue")['default']>
    'LazyPeopleRelatedItem': LazyComponent<typeof import("../../src/runtime/components/people/RelatedItem.vue")['default']>
    'LazyPeopleRowsItem': LazyComponent<typeof import("../../src/runtime/components/people/RowsItem.vue")['default']>
    'LazyPeopleView': LazyComponent<typeof import("../../src/runtime/components/people/View.vue")['default']>
    'LazyProjectsExpandedItem': LazyComponent<typeof import("../../src/runtime/components/projects/ExpandedItem.vue")['default']>
    'LazyProjectsRelatedItem': LazyComponent<typeof import("../../src/runtime/components/projects/RelatedItem.vue")['default']>
    'LazyProjectsRowsItem': LazyComponent<typeof import("../../src/runtime/components/projects/RowsItem.vue")['default']>
    'LazyProjectsView': LazyComponent<typeof import("../../src/runtime/components/projects/View.vue")['default']>
    'LazyPublicationsRelatedItem': LazyComponent<typeof import("../../src/runtime/components/publications/RelatedItem.vue")['default']>
    'LazyPublicationsRowsItem': LazyComponent<typeof import("../../src/runtime/components/publications/RowsItem.vue")['default']>
    'LazyPublicationsView': LazyComponent<typeof import("../../src/runtime/components/publications/View.vue")['default']>
    'LazyTagsExpandedItem': LazyComponent<typeof import("../../src/runtime/components/tags/ExpandedItem.vue")['default']>
    'LazyTagsRowsItem': LazyComponent<typeof import("../../src/runtime/components/tags/RowsItem.vue")['default']>
    'LazyTagsView': LazyComponent<typeof import("../../src/runtime/components/tags/View.vue")['default']>
    'LazyProseA': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']>
    'LazyProseBlockquote': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']>
    'LazyProseCode': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue")['default']>
    'LazyProseEm': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']>
    'LazyProseH1': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']>
    'LazyProseH2': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']>
    'LazyProseH3': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']>
    'LazyProseH4': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']>
    'LazyProseH5': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']>
    'LazyProseH6': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']>
    'LazyProseHr': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']>
    'LazyProseImg': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']>
    'LazyProseLi': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']>
    'LazyProseOl': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']>
    'LazyProseP': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']>
    'LazyProsePre': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue")['default']>
    'LazyProseScript': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']>
    'LazyProseStrong': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']>
    'LazyProseTable': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']>
    'LazyProseTbody': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']>
    'LazyProseTd': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']>
    'LazyProseTh': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']>
    'LazyProseThead': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']>
    'LazyProseTr': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']>
    'LazyProseUl': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']>
    'LazyNuxtWelcome': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
    'LazyNuxtLayout': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
    'LazyNuxtErrorBoundary': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
    'LazyClientOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
    'LazyDevOnly': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
    'LazyServerPlaceholder': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
    'LazyNuxtLink': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
    'LazyNuxtLoadingIndicator': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
    'LazyNuxtRouteAnnouncer': LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
    'LazyNuxtImg': LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
    'LazyNuxtPicture': LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
    'LazyNuxtLinkLocale': LazyComponent<typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
    'LazySwitchLocalePathLink': LazyComponent<typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
    'LazyMDC': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']>
    'LazyMDCRenderer': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']>
    'LazyMDCSlot': LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']>
    'LazyNuxtPage': LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
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

export const Footer: typeof import("../components/Footer.vue")['default']
export const ActionsExpandedItem: typeof import("../../src/runtime/components/actions/ExpandedItem.vue")['default']
export const ActionsRowsItem: typeof import("../../src/runtime/components/actions/RowsItem.vue")['default']
export const ActionsView: typeof import("../../src/runtime/components/actions/View.vue")['default']
export const AffiliationsExpandedItem: typeof import("../../src/runtime/components/affiliations/ExpandedItem.vue")['default']
export const AffiliationsRowsItem: typeof import("../../src/runtime/components/affiliations/RowsItem.vue")['default']
export const AffiliationsView: typeof import("../../src/runtime/components/affiliations/View.vue")['default']
export const DisciplinesExpandedItem: typeof import("../../src/runtime/components/disciplines/ExpandedItem.vue")['default']
export const DisciplinesRowsItem: typeof import("../../src/runtime/components/disciplines/RowsItem.vue")['default']
export const DisciplinesView: typeof import("../../src/runtime/components/disciplines/View.vue")['default']
export const EventsBadges: typeof import("../../src/runtime/components/events/Badges.vue")['default']
export const EventsDateTimePlace: typeof import("../../src/runtime/components/events/DateTimePlace.vue")['default']
export const EventsDenseItem: typeof import("../../src/runtime/components/events/DenseItem.vue")['default']
export const EventsExpandedItem: typeof import("../../src/runtime/components/events/ExpandedItem.vue")['default']
export const EventsRegisterModal: typeof import("../../src/runtime/components/events/RegisterModal.vue")['default']
export const EventsRelatedItem: typeof import("../../src/runtime/components/events/RelatedItem.vue")['default']
export const EventsRowsItem: typeof import("../../src/runtime/components/events/RowsItem.vue")['default']
export const EventsView: typeof import("../../src/runtime/components/events/View.vue")['default']
export const FellowshipsBadges: typeof import("../../src/runtime/components/fellowships/Badges.vue")['default']
export const FellowshipsDenseItem: typeof import("../../src/runtime/components/fellowships/DenseItem.vue")['default']
export const FellowshipsExpandedItem: typeof import("../../src/runtime/components/fellowships/ExpandedItem.vue")['default']
export const FellowshipsRegisterModal: typeof import("../../src/runtime/components/fellowships/RegisterModal.vue")['default']
export const FellowshipsRowsItem: typeof import("../../src/runtime/components/fellowships/RowsItem.vue")['default']
export const FellowshipsView: typeof import("../../src/runtime/components/fellowships/View.vue")['default']
export const FilesExpandedItem: typeof import("../../src/runtime/components/files/ExpandedItem.vue")['default']
export const FilesRowsItem: typeof import("../../src/runtime/components/files/RowsItem.vue")['default']
export const FilesView: typeof import("../../src/runtime/components/files/View.vue")['default']
export const ListAtomsFiltersMenu: typeof import("../../src/runtime/components/list/atoms/FiltersMenu.vue")['default']
export const ListAtomsResetButton: typeof import("../../src/runtime/components/list/atoms/ResetButton.vue")['default']
export const ListAtomsSearchInput: typeof import("../../src/runtime/components/list/atoms/SearchInput.vue")['default']
export const ListAtomsSearchItem: typeof import("../../src/runtime/components/list/atoms/SearchItem.vue")['default']
export const ListAtomsSearchString: typeof import("../../src/runtime/components/list/atoms/SearchString.vue")['default']
export const ListAtomsSortMenu: typeof import("../../src/runtime/components/list/atoms/SortMenu.vue")['default']
export const ListAtomsViewMenu: typeof import("../../src/runtime/components/list/atoms/ViewMenu.vue")['default']
export const ListInputsAutoComplete: typeof import("../../src/runtime/components/list/inputs/AutoComplete.vue")['default']
export const ListInputsBooleanSwitch: typeof import("../../src/runtime/components/list/inputs/BooleanSwitch.vue")['default']
export const ListInputsCheckbox: typeof import("../../src/runtime/components/list/inputs/Checkbox.vue")['default']
export const ListInputsSelect: typeof import("../../src/runtime/components/list/inputs/Select.vue")['default']
export const ListMoleculesFilters: typeof import("../../src/runtime/components/list/molecules/Filters.vue")['default']
export const ListMoleculesHeader: typeof import("../../src/runtime/components/list/molecules/Header.vue")['default']
export const ListMoleculesPagination: typeof import("../../src/runtime/components/list/molecules/Pagination.vue")['default']
export const ListOrganismsList: typeof import("../../src/runtime/components/list/organisms/List.vue")['default']
export const ListOrganismsSlider: typeof import("../../src/runtime/components/list/organisms/Slider.vue")['default']
export const ListViewsDense: typeof import("../../src/runtime/components/list/views/Dense.vue")['default']
export const ListViewsExpanded: typeof import("../../src/runtime/components/list/views/Expanded.vue")['default']
export const ListViewsGrid: typeof import("../../src/runtime/components/list/views/Grid.vue")['default']
export const ListViewsRows: typeof import("../../src/runtime/components/list/views/Rows.vue")['default']
export const ListViewsSlider: typeof import("../../src/runtime/components/list/views/Slider.vue")['default']
export const ListViewsTable: typeof import("../../src/runtime/components/list/views/Table.vue")['default']
export const MailingExpandedItem: typeof import("../../src/runtime/components/mailing/ExpandedItem.vue")['default']
export const MailingRowsItem: typeof import("../../src/runtime/components/mailing/RowsItem.vue")['default']
export const MailingView: typeof import("../../src/runtime/components/mailing/View.vue")['default']
export const MiscAtomsDateStamp: typeof import("../../src/runtime/components/misc/atoms/DateStamp.vue")['default']
export const MiscAtomsImageContainer: typeof import("../../src/runtime/components/misc/atoms/ImageContainer.vue")['default']
export const MiscAtomsShareMenu: typeof import("../../src/runtime/components/misc/atoms/ShareMenu.vue")['default']
export const MiscAtomsSocials: typeof import("../../src/runtime/components/misc/atoms/Socials.vue")['default']
export const MiscMoleculesChipContainer: typeof import("../../src/runtime/components/misc/molecules/ChipContainer.vue")['default']
export const MiscMoleculesRelated: typeof import("../../src/runtime/components/misc/molecules/Related.vue")['default']
export const MiscMoleculesRelatedItems: typeof import("../../src/runtime/components/misc/molecules/RelatedItems.vue")['default']
export const MiscMoleculesSearchItem: typeof import("../../src/runtime/components/misc/molecules/SearchItem.vue")['default']
export const NewsDenseItem: typeof import("../../src/runtime/components/news/DenseItem.vue")['default']
export const NewsExpandedItem: typeof import("../../src/runtime/components/news/ExpandedItem.vue")['default']
export const NewsHeader: typeof import("../../src/runtime/components/news/Header.vue")['default']
export const NewsRelatedItem: typeof import("../../src/runtime/components/news/RelatedItem.vue")['default']
export const NewsRowsItem: typeof import("../../src/runtime/components/news/RowsItem.vue")['default']
export const NewsView: typeof import("../../src/runtime/components/news/View.vue")['default']
export const PeopleDenseItem: typeof import("../../src/runtime/components/people/DenseItem.vue")['default']
export const PeopleExpandedItem: typeof import("../../src/runtime/components/people/ExpandedItem.vue")['default']
export const PeopleGroupBadges: typeof import("../../src/runtime/components/people/GroupBadges.vue")['default']
export const PeopleRelatedItem: typeof import("../../src/runtime/components/people/RelatedItem.vue")['default']
export const PeopleRowsItem: typeof import("../../src/runtime/components/people/RowsItem.vue")['default']
export const PeopleView: typeof import("../../src/runtime/components/people/View.vue")['default']
export const ProjectsExpandedItem: typeof import("../../src/runtime/components/projects/ExpandedItem.vue")['default']
export const ProjectsRelatedItem: typeof import("../../src/runtime/components/projects/RelatedItem.vue")['default']
export const ProjectsRowsItem: typeof import("../../src/runtime/components/projects/RowsItem.vue")['default']
export const ProjectsView: typeof import("../../src/runtime/components/projects/View.vue")['default']
export const PublicationsRelatedItem: typeof import("../../src/runtime/components/publications/RelatedItem.vue")['default']
export const PublicationsRowsItem: typeof import("../../src/runtime/components/publications/RowsItem.vue")['default']
export const PublicationsView: typeof import("../../src/runtime/components/publications/View.vue")['default']
export const TagsExpandedItem: typeof import("../../src/runtime/components/tags/ExpandedItem.vue")['default']
export const TagsRowsItem: typeof import("../../src/runtime/components/tags/RowsItem.vue")['default']
export const TagsView: typeof import("../../src/runtime/components/tags/View.vue")['default']
export const ProseA: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']
export const ProseBlockquote: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']
export const ProseCode: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue")['default']
export const ProseEm: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']
export const ProseH1: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']
export const ProseH2: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']
export const ProseH3: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']
export const ProseH4: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']
export const ProseH5: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']
export const ProseH6: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']
export const ProseHr: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']
export const ProseImg: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']
export const ProseLi: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']
export const ProseOl: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']
export const ProseP: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']
export const ProsePre: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue")['default']
export const ProseScript: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']
export const ProseStrong: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']
export const ProseTable: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']
export const ProseTbody: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']
export const ProseTd: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']
export const ProseTh: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']
export const ProseThead: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']
export const ProseTr: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']
export const ProseUl: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']
export const NuxtPicture: typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']
export const NuxtLinkLocale: typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
export const SwitchLocalePathLink: typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
export const MDC: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']
export const MDCRenderer: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']
export const MDCSlot: typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
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
export const LazyFooter: LazyComponent<typeof import("../components/Footer.vue")['default']>
export const LazyActionsExpandedItem: LazyComponent<typeof import("../../src/runtime/components/actions/ExpandedItem.vue")['default']>
export const LazyActionsRowsItem: LazyComponent<typeof import("../../src/runtime/components/actions/RowsItem.vue")['default']>
export const LazyActionsView: LazyComponent<typeof import("../../src/runtime/components/actions/View.vue")['default']>
export const LazyAffiliationsExpandedItem: LazyComponent<typeof import("../../src/runtime/components/affiliations/ExpandedItem.vue")['default']>
export const LazyAffiliationsRowsItem: LazyComponent<typeof import("../../src/runtime/components/affiliations/RowsItem.vue")['default']>
export const LazyAffiliationsView: LazyComponent<typeof import("../../src/runtime/components/affiliations/View.vue")['default']>
export const LazyDisciplinesExpandedItem: LazyComponent<typeof import("../../src/runtime/components/disciplines/ExpandedItem.vue")['default']>
export const LazyDisciplinesRowsItem: LazyComponent<typeof import("../../src/runtime/components/disciplines/RowsItem.vue")['default']>
export const LazyDisciplinesView: LazyComponent<typeof import("../../src/runtime/components/disciplines/View.vue")['default']>
export const LazyEventsBadges: LazyComponent<typeof import("../../src/runtime/components/events/Badges.vue")['default']>
export const LazyEventsDateTimePlace: LazyComponent<typeof import("../../src/runtime/components/events/DateTimePlace.vue")['default']>
export const LazyEventsDenseItem: LazyComponent<typeof import("../../src/runtime/components/events/DenseItem.vue")['default']>
export const LazyEventsExpandedItem: LazyComponent<typeof import("../../src/runtime/components/events/ExpandedItem.vue")['default']>
export const LazyEventsRegisterModal: LazyComponent<typeof import("../../src/runtime/components/events/RegisterModal.vue")['default']>
export const LazyEventsRelatedItem: LazyComponent<typeof import("../../src/runtime/components/events/RelatedItem.vue")['default']>
export const LazyEventsRowsItem: LazyComponent<typeof import("../../src/runtime/components/events/RowsItem.vue")['default']>
export const LazyEventsView: LazyComponent<typeof import("../../src/runtime/components/events/View.vue")['default']>
export const LazyFellowshipsBadges: LazyComponent<typeof import("../../src/runtime/components/fellowships/Badges.vue")['default']>
export const LazyFellowshipsDenseItem: LazyComponent<typeof import("../../src/runtime/components/fellowships/DenseItem.vue")['default']>
export const LazyFellowshipsExpandedItem: LazyComponent<typeof import("../../src/runtime/components/fellowships/ExpandedItem.vue")['default']>
export const LazyFellowshipsRegisterModal: LazyComponent<typeof import("../../src/runtime/components/fellowships/RegisterModal.vue")['default']>
export const LazyFellowshipsRowsItem: LazyComponent<typeof import("../../src/runtime/components/fellowships/RowsItem.vue")['default']>
export const LazyFellowshipsView: LazyComponent<typeof import("../../src/runtime/components/fellowships/View.vue")['default']>
export const LazyFilesExpandedItem: LazyComponent<typeof import("../../src/runtime/components/files/ExpandedItem.vue")['default']>
export const LazyFilesRowsItem: LazyComponent<typeof import("../../src/runtime/components/files/RowsItem.vue")['default']>
export const LazyFilesView: LazyComponent<typeof import("../../src/runtime/components/files/View.vue")['default']>
export const LazyListAtomsFiltersMenu: LazyComponent<typeof import("../../src/runtime/components/list/atoms/FiltersMenu.vue")['default']>
export const LazyListAtomsResetButton: LazyComponent<typeof import("../../src/runtime/components/list/atoms/ResetButton.vue")['default']>
export const LazyListAtomsSearchInput: LazyComponent<typeof import("../../src/runtime/components/list/atoms/SearchInput.vue")['default']>
export const LazyListAtomsSearchItem: LazyComponent<typeof import("../../src/runtime/components/list/atoms/SearchItem.vue")['default']>
export const LazyListAtomsSearchString: LazyComponent<typeof import("../../src/runtime/components/list/atoms/SearchString.vue")['default']>
export const LazyListAtomsSortMenu: LazyComponent<typeof import("../../src/runtime/components/list/atoms/SortMenu.vue")['default']>
export const LazyListAtomsViewMenu: LazyComponent<typeof import("../../src/runtime/components/list/atoms/ViewMenu.vue")['default']>
export const LazyListInputsAutoComplete: LazyComponent<typeof import("../../src/runtime/components/list/inputs/AutoComplete.vue")['default']>
export const LazyListInputsBooleanSwitch: LazyComponent<typeof import("../../src/runtime/components/list/inputs/BooleanSwitch.vue")['default']>
export const LazyListInputsCheckbox: LazyComponent<typeof import("../../src/runtime/components/list/inputs/Checkbox.vue")['default']>
export const LazyListInputsSelect: LazyComponent<typeof import("../../src/runtime/components/list/inputs/Select.vue")['default']>
export const LazyListMoleculesFilters: LazyComponent<typeof import("../../src/runtime/components/list/molecules/Filters.vue")['default']>
export const LazyListMoleculesHeader: LazyComponent<typeof import("../../src/runtime/components/list/molecules/Header.vue")['default']>
export const LazyListMoleculesPagination: LazyComponent<typeof import("../../src/runtime/components/list/molecules/Pagination.vue")['default']>
export const LazyListOrganismsList: LazyComponent<typeof import("../../src/runtime/components/list/organisms/List.vue")['default']>
export const LazyListOrganismsSlider: LazyComponent<typeof import("../../src/runtime/components/list/organisms/Slider.vue")['default']>
export const LazyListViewsDense: LazyComponent<typeof import("../../src/runtime/components/list/views/Dense.vue")['default']>
export const LazyListViewsExpanded: LazyComponent<typeof import("../../src/runtime/components/list/views/Expanded.vue")['default']>
export const LazyListViewsGrid: LazyComponent<typeof import("../../src/runtime/components/list/views/Grid.vue")['default']>
export const LazyListViewsRows: LazyComponent<typeof import("../../src/runtime/components/list/views/Rows.vue")['default']>
export const LazyListViewsSlider: LazyComponent<typeof import("../../src/runtime/components/list/views/Slider.vue")['default']>
export const LazyListViewsTable: LazyComponent<typeof import("../../src/runtime/components/list/views/Table.vue")['default']>
export const LazyMailingExpandedItem: LazyComponent<typeof import("../../src/runtime/components/mailing/ExpandedItem.vue")['default']>
export const LazyMailingRowsItem: LazyComponent<typeof import("../../src/runtime/components/mailing/RowsItem.vue")['default']>
export const LazyMailingView: LazyComponent<typeof import("../../src/runtime/components/mailing/View.vue")['default']>
export const LazyMiscAtomsDateStamp: LazyComponent<typeof import("../../src/runtime/components/misc/atoms/DateStamp.vue")['default']>
export const LazyMiscAtomsImageContainer: LazyComponent<typeof import("../../src/runtime/components/misc/atoms/ImageContainer.vue")['default']>
export const LazyMiscAtomsShareMenu: LazyComponent<typeof import("../../src/runtime/components/misc/atoms/ShareMenu.vue")['default']>
export const LazyMiscAtomsSocials: LazyComponent<typeof import("../../src/runtime/components/misc/atoms/Socials.vue")['default']>
export const LazyMiscMoleculesChipContainer: LazyComponent<typeof import("../../src/runtime/components/misc/molecules/ChipContainer.vue")['default']>
export const LazyMiscMoleculesRelated: LazyComponent<typeof import("../../src/runtime/components/misc/molecules/Related.vue")['default']>
export const LazyMiscMoleculesRelatedItems: LazyComponent<typeof import("../../src/runtime/components/misc/molecules/RelatedItems.vue")['default']>
export const LazyMiscMoleculesSearchItem: LazyComponent<typeof import("../../src/runtime/components/misc/molecules/SearchItem.vue")['default']>
export const LazyNewsDenseItem: LazyComponent<typeof import("../../src/runtime/components/news/DenseItem.vue")['default']>
export const LazyNewsExpandedItem: LazyComponent<typeof import("../../src/runtime/components/news/ExpandedItem.vue")['default']>
export const LazyNewsHeader: LazyComponent<typeof import("../../src/runtime/components/news/Header.vue")['default']>
export const LazyNewsRelatedItem: LazyComponent<typeof import("../../src/runtime/components/news/RelatedItem.vue")['default']>
export const LazyNewsRowsItem: LazyComponent<typeof import("../../src/runtime/components/news/RowsItem.vue")['default']>
export const LazyNewsView: LazyComponent<typeof import("../../src/runtime/components/news/View.vue")['default']>
export const LazyPeopleDenseItem: LazyComponent<typeof import("../../src/runtime/components/people/DenseItem.vue")['default']>
export const LazyPeopleExpandedItem: LazyComponent<typeof import("../../src/runtime/components/people/ExpandedItem.vue")['default']>
export const LazyPeopleGroupBadges: LazyComponent<typeof import("../../src/runtime/components/people/GroupBadges.vue")['default']>
export const LazyPeopleRelatedItem: LazyComponent<typeof import("../../src/runtime/components/people/RelatedItem.vue")['default']>
export const LazyPeopleRowsItem: LazyComponent<typeof import("../../src/runtime/components/people/RowsItem.vue")['default']>
export const LazyPeopleView: LazyComponent<typeof import("../../src/runtime/components/people/View.vue")['default']>
export const LazyProjectsExpandedItem: LazyComponent<typeof import("../../src/runtime/components/projects/ExpandedItem.vue")['default']>
export const LazyProjectsRelatedItem: LazyComponent<typeof import("../../src/runtime/components/projects/RelatedItem.vue")['default']>
export const LazyProjectsRowsItem: LazyComponent<typeof import("../../src/runtime/components/projects/RowsItem.vue")['default']>
export const LazyProjectsView: LazyComponent<typeof import("../../src/runtime/components/projects/View.vue")['default']>
export const LazyPublicationsRelatedItem: LazyComponent<typeof import("../../src/runtime/components/publications/RelatedItem.vue")['default']>
export const LazyPublicationsRowsItem: LazyComponent<typeof import("../../src/runtime/components/publications/RowsItem.vue")['default']>
export const LazyPublicationsView: LazyComponent<typeof import("../../src/runtime/components/publications/View.vue")['default']>
export const LazyTagsExpandedItem: LazyComponent<typeof import("../../src/runtime/components/tags/ExpandedItem.vue")['default']>
export const LazyTagsRowsItem: LazyComponent<typeof import("../../src/runtime/components/tags/RowsItem.vue")['default']>
export const LazyTagsView: LazyComponent<typeof import("../../src/runtime/components/tags/View.vue")['default']>
export const LazyProseA: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseA.vue")['default']>
export const LazyProseBlockquote: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseBlockquote.vue")['default']>
export const LazyProseCode: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseCode.vue")['default']>
export const LazyProseEm: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseEm.vue")['default']>
export const LazyProseH1: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH1.vue")['default']>
export const LazyProseH2: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH2.vue")['default']>
export const LazyProseH3: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH3.vue")['default']>
export const LazyProseH4: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH4.vue")['default']>
export const LazyProseH5: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH5.vue")['default']>
export const LazyProseH6: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseH6.vue")['default']>
export const LazyProseHr: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseHr.vue")['default']>
export const LazyProseImg: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseImg.vue")['default']>
export const LazyProseLi: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseLi.vue")['default']>
export const LazyProseOl: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseOl.vue")['default']>
export const LazyProseP: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseP.vue")['default']>
export const LazyProsePre: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProsePre.vue")['default']>
export const LazyProseScript: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseScript.vue")['default']>
export const LazyProseStrong: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseStrong.vue")['default']>
export const LazyProseTable: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTable.vue")['default']>
export const LazyProseTbody: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTbody.vue")['default']>
export const LazyProseTd: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTd.vue")['default']>
export const LazyProseTh: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTh.vue")['default']>
export const LazyProseThead: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseThead.vue")['default']>
export const LazyProseTr: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseTr.vue")['default']>
export const LazyProseUl: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/prose/ProseUl.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtImg.vue")['default']>
export const LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/@nuxt/image/dist/runtime/components/NuxtPicture.vue")['default']>
export const LazyNuxtLinkLocale: LazyComponent<typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
export const LazySwitchLocalePathLink: LazyComponent<typeof import("../../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
export const LazyMDC: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDC.vue")['default']>
export const LazyMDCRenderer: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCRenderer.vue")['default']>
export const LazyMDCSlot: LazyComponent<typeof import("../node_modules/@nuxtjs/mdc/dist/runtime/components/MDCSlot.vue")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
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
