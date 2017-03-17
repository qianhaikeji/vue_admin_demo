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
  users: state => state.list,
  userTotal: state => state.total,
  user: state => state.profile
}

// actions
const actions = {
  loadUserList ({ commit }, params) {
    commit(types.QUERY_LIST, {loading: true})
    dataService.getUserList(params).then(data => {
      commit(types.LOAD_USER_LIST, data.body)
      commit(types.QUERY_LIST, {loading: false})
    }, data => {
      commit(types.QUERY_LIST, {loading: false})
    })
  },
  loadUser ({ commit }, id) {
    dataService.getShow(id).then(data => {
      commit(types.VIEW_USER, data.body)
    })
  },
  addUser ({ commit }, {profile, callback}) {
    dataService.addFakeUser(profile).then(data => {
      Notification({
        title: '成功',
        message: `增加用户成功`,
        type: 'success'
      })
      commit('VIEW_USER', data.body)
      commit(types.ADD_USER, data.body)
      if (callback && (callback instanceof Function)) {
        callback()
      }
    })
  },
  updateUser ({ commit }, {id, info}) {
    dataService.updateUser(id, info).then(data => {
      Notification({
        title: '成功',
        message: `修改会员资料成功`,
        type: 'success'
      })
      commit(types.UPDATE_USER, info)
    })
  },
  deleteUser ({ commit }, id) {
    dataService.deleteUser(id).then(data => {
      Notification({
        title: '成功',
        message: `删除用户成功`,
        type: 'success'
      })
      commit(types.DELETE_USER, id)
    })
  },
  checkUser ({ commit }, { id }) {
    dataService.updateUserChecked(id).then(data => {
      Notification({
        title: '成功',
        message: `审核成功`,
        type: 'success'
      })
      commit(types.CHECK_USER, id)
    })
  },
  uncheckUser ({ commit }, { id }) {
    dataService.updateUserUnchecked(id).then(data => {
      Notification({
        title: '成功',
        message: `反审核成功`,
        type: 'success'
      })
      commit(types.UNCHECK_USER, id)
    })
  },
  batchCheckUser ({ commit }, users) {
    dataService.updateUserBatchChecked(users).then(data => {
      Notification({
        title: '成功',
        message: `审核用户成功`,
        type: 'success'
      })
      commit('BATCH_CHECK_USER', users)
    })
  },
  batchUncheckUser ({ commit }, users) {
    dataService.updateUserBatchUnchecked(users).then(data => {
      Notification({
        title: '成功',
        message: `反审核用户成功`,
        type: 'success'
      })
      commit('BATCH_UNCHECK_USER', users)
    })
  },
  recommendUser ({ commit }, { id }) {
    dataService.updateUserRecommend(id).then(data => {
      Notification({
        title: '成功',
        message: `置顶成功`,
        type: 'success'
      })
      commit(types.RECOMMEND_USER, id)
    })
  },
  unrecommendUser ({ commit }, { id }) {
    dataService.updateUserUnrecommend(id).then(data => {
      Notification({
        title: '成功',
        message: `取消置顶成功`,
        type: 'success'
      })
      commit(types.UNRECOMMEND_USER, id)
    })
  }
}

// mutations
const mutations = {
  [types.LOAD_USER_LIST]: (state, data) => {
    state.list = data.content
    state.total = data.totalElements
  },
  [types.VIEW_USER]: (state, defaultValue) => {
    state.profile = defaultValue
  },
  [types.ADD_USER]: (state, data) => {
    state.list.push(data)
  },
  [types.UPDATE_USER]: (state, data) => {
    state.profile = Object.assign({}, state.profile, data)
    let index = state.list.findIndex(ele => ele.id === state.profile.id)
    if (index !== -1) {
      state.list.splice(index, 1, state.profile)
    }
  },
  [types.DELETE_USER]: (state, id) => {
    let index = state.list.findIndex(ele => ele.id === id)
    if (index !== -1) {
      state.list.splice(index, 1)
    }
  },
  [types.CHECK_USER]: (state, id) => {
    let item = state.list.find(ele => ele.id === state.profile.id)
    if (item) {
      item.checked = true
    }
  },
  [types.UNCHECK_USER]: (state, data) => {
    let item = state.list.find(ele => ele.id === state.profile.id)
    if (item) {
      item.checked = false
    }
  },
  [types.BATCH_CHECK_USER]: (state, users) => {
    for (let userId of users) {
      let index = state.list.findIndex(ele => ele.id === userId)
      state.list[index].checked = true
    }
  },
  [types.BATCH_UNCHECK_USER]: (state, users) => {
    for (let userId of users) {
      let index = state.list.findIndex(ele => ele.id === userId)
      state.list[index].checked = false
    }
  },
  [types.RECOMMEND_USER]: (state, id) => {
    let item = state.list.find(ele => ele.id === state.profile.id)
    if (item) {
      item.recommend = true
    }
  },
  [types.UNRECOMMEND_USER]: (state, data) => {
    let item = state.list.find(ele => ele.id === state.profile.id)
    if (item) {
      item.recommend = false
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
