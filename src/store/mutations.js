// 【类似redux的reducer】
import * as types from './mutation-types'
import { LIST_PROFILE_MODE_TYPES } from '../consts'

const mutations = {
  [types.GO_TO_PROFILE]: (state, { mode, profileInParam }) => {
    state.listAndProfile.currentMode = mode
    state.listAndProfile.profileInParam = Object.assign({}, profileInParam)
  },
  [types.BACK_TO_LIST]: (state, { mode, profileOutParam }) => {
    state.listAndProfile.currentMode = mode
    state.listAndProfile.profileOutParam = Object.assign({}, profileOutParam)
  },
  [types.INIT_LIST_AND_PROFILE]: (state) => {
    state.listAndProfile.currentMode = LIST_PROFILE_MODE_TYPES.LIST
    state.profileInParam = {}
    state.profileOutParam = {}
  },
  [types.QUERY_LIST]: (state, {loading}) => {
    state.query.loading = loading
  },
  [types.CHANGE_ROUTER]: (state, routerPath) => {
    state.currentRouter = routerPath
  }
}

export default mutations
