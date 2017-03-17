import * as types from 'store/mutation-types'
import dataService from 'services/dataService'
import { Notification } from 'element-ui'

const state = {
  list: [],
  profile: {},
  total: 0
}

// getters
const getters = {
  videoList: state => state.list,
  videoTotal: state => state.total,
  video: state => state.profile
}

// actions
const actions = {
  loadVideoList ({ commit }, params) {
    commit(types.QUERY_LIST, {loading: true})
    dataService.getVideoList(params).then(data => {
      commit(types.LOAD_VIDEO_LIST, data.body)
      commit(types.QUERY_LIST, {loading: false})
    }, data => {
      commit(types.QUERY_LIST, {loading: false})
    })
  }
}

// mutations
const mutations = {
  [types.LOAD_VIDEO_LIST]: (state, data) => {
    state.list = data.content
    state.total = data.totalElements
  },
  [types.VIEW_VIDEO]: (state, defaultValue) => {
    state.profile = defaultValue
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
