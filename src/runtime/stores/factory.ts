import { defineStore } from "pinia"
import { reactive, toRefs } from "vue"
export const createDynamicStore = (storeName: string, moduleState: object) => {
  return defineStore(storeName, () => {
    const state = reactive({
      loading: false,
      total: 0,
      skip: 0,
      page: 1,
      numberOfPages: 0,
      search: "",
      error: null as string | null,
      currentSort: null as string | null,
      ...moduleState,
    })
    return {
      ...toRefs(state),
    }
  })
}
