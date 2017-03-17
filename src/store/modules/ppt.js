import * as types from 'store/mutation-types'
import dataService from 'services/dataService'
import { Notification } from 'element-ui'

const state = {
  list: [],
  profile: {},
  total: 0
}

const getters = {
  ppts: state => state.list,
  ppt: state => state.profile
}

const actions = {
  loadPPTs ({ commit }) {
    commit(types.QUERY_LIST, {loading: true})
    dataService.getPPTList().then(data => {
      commit(types.LOAD_PPT, data.body)
      commit(types.QUERY_LIST, {loading: false})
    }, data => {
      commit(types.QUERY_LIST, {loading: false})
    })
  },
  addPPT ({ commit }, profile) {
    dataService.addPPT(profile).then(data => {
      Notification({
        title: '成功',
        message: `添加banner成功`,
        type: 'success'
      })
    })
    commit(types.ADD_PPT, profile)
  },
  updatePPT ({ commit }, profile) {
    dataService.modifyPPT(profile.id, profile).then(data => {
      Notification({
        title: '成功',
        message: `修改banner成功`,
        type: 'success'
      })
      commit(types.UPDATE_PPT, profile)
    })
  },
  deletePPT ({ commit }, id) {
    dataService.deletePPT(id).then(data => {
      Notification({
        title: '成功',
        message: `删除banner成功`,
        type: 'success'
      })
      commit(types.DELETE_PPT, id)
    })
  }
}

const mutations = {
  [types.LOAD_PPT]: (state, data) => {
    // Bug
    state.list = data
    state.total = data.length
  },
  [types.VIEW_PPT]: (state, defaultValue) => {
    state.profile = defaultValue
  },
  [types.ADD_PPT]: (state, data) => {
    state.list.push(data)
  },
  [types.DELETE_PPT]: (state, id) => {
    let index = state.list.findIndex(ele => ele.id === id)
    if (index !== -1) {
      state.list.splice(index, 1)
    }
  },
  [types.UPDATE_PPT]: (state, data) => {
    state.profile = Object.assign({}, data)
    let index = state.list.findIndex(ele => ele.id === state.profile.id)
    if (index !== -1) {
      // 只有splice才可以出发vue的检测。参考“https://vuefe.cn/v2/guide/list.html#注意事项”
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
