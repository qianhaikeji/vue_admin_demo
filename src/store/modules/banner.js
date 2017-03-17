import * as types from 'store/mutation-types'
import dataService from 'services/dataService'
import { Notification } from 'element-ui'

const state = {
  list: [],
  total: 0,
  profile: {}
}

// getters
const getters = {
  bannerList: state => state.list,
  bannerTotal: state => state.list,
  banner: state => state.profile
}

// actions
const actions = {
  loadBannerList ({ commit }, params) {
    commit(types.QUERY_LIST, {loading: true})
    return dataService.getBannerList(params).then(data => {
      commit(types.LOAD_BANNER_LIST, data.body)
      commit(types.QUERY_LIST, {loading: false})
    }, data => {
      commit(types.QUERY_LIST, {loading: false})
    })
  },
  updateBanner ({ commit }, profile) {
    return dataService.modifyBanner(profile.id, profile).then(data => {
      Notification({
        title: '成功',
        message: `修改协议成功`,
        type: 'success'
      })
      commit(types.UPDATE_BANNER, profile)
    })
  }
}

// mutations

const mutations = {
  [types.LOAD_BANNER_LIST]: (state, data) => {
    state.list = data.content
    state.total = data.totalElements
  },
  [types.VIEW_BANNER]: (state, defaultValue) => {
    state.profile = defaultValue
  },
  [types.UPDATE_BANNER]: (state, data) => {
    state.profile = Object.assign({}, data)
    let index = state.list.findIndex(ele => ele.id === state.profile.id)
    if (index !== -1) {
      state.list.splice(index, 1, state.profile)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
