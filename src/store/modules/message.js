import * as types from 'store/mutation-types'
import dataService from 'services/dataService'
import { Notification } from 'element-ui'

const state = {
  list: [],
  profile: {},
  total: 0
}

const initialMessage = {
  'content': '',
  'title': '',
  'thumbUrl': ''
}

const getters = {
  messages: state => state.list,
  message: state => state.profile,
  messageTotal: state => state.total
}

const actions = {
  loadMessages ({ commit }, params) {
    commit(types.QUERY_LIST, {loading: true})
    dataService.getMessageList(params).then(data => {
      commit(types.LOAD_MESSAGE, data.body)
      commit(types.QUERY_LIST, {loading: false})
    }, data => {
      commit(types.QUERY_LIST, {loading: false})
    })
  },
  addMessage ({ commit }, {profile, callback}) {
    dataService.addMessage(profile).then(data => {
      Notification({
        title: '成功',
        message: `添加message成功`,
        type: 'success'
      })
      commit('VIEW_MESSAGE', data.body)
      commit(types.ADD_MESSAGE, profile)
      if (callback && (callback instanceof Function)) {
        callback()
      }
    })
  },
  updateMessage ({ commit }, profile) {
    dataService.modifyMessage(profile.id, profile).then(data => {
      Notification({
        title: '成功',
        message: `修改message成功`,
        type: 'success'
      })
      commit(types.UPDATE_MESSAGE, profile)
    })
  },
  deleteMessage ({ commit }, id) {
    dataService.deleteMessage(id).then(data => {
      Notification({
        title: '成功',
        message: `删除message成功`,
        type: 'success'
      })
      commit(types.DELETE_MESSAGE, id)
    })
  }
}

const mutations = {
  [types.LOAD_MESSAGE]: (state, data) => {
    state.list = data.content
    state.total = data.totalElements
  },
  [types.VIEW_MESSAGE]: (state, defaultValue) => {
    state.profile = defaultValue || Object.assign({}, initialMessage)
  },
  [types.ADD_MESSAGE]: (state, data) => {
    state.list.push(data)
  },
  [types.DELETE_MESSAGE]: (state, id) => {
    let index = state.list.findIndex(ele => ele.id === id)
    if (index !== -1) {
      state.list.splice(index, 1)
    }
  },
  [types.UPDATE_MESSAGE]: (state, data) => {
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
