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
  photoList: state => state.list,
  photoTotal: state => state.total,
  photo: state => state.profile
}

// actions
const actions = {
  loadPhotoList ({ commit }, params) {
    commit(types.QUERY_LIST, {loading: true})
    dataService.getPhotoList(params).then(data => {
      commit(types.LOAD_PHOTO_LIST, data.body)
      commit(types.QUERY_LIST, {loading: false})
    }, data => {
      commit(types.QUERY_LIST, {loading: false})
    })
  }
}

// mutations
const mutations = {
  [types.LOAD_PHOTO_LIST]: (state, data) => {
    state.list = data.content
    state.total = data.totalElements
  },
  [types.VIEW_PHOTO]: (state, defaultValue) => {
    state.profile = defaultValue
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
