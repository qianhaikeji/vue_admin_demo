import * as types from 'store/mutation-types'
import dataService from 'services/dataService'
import { Notification } from 'element-ui'
import Vue from 'vue'

const localStorage = window.localStorage

const state = {
  logined: false,
  token: null,
  profile: {
    id: null,
    username: null,
    perms: []
  }
}

// getters
const getters = {
  auth: state => state
}

// actions
const actions = {
  login ({ commit }, {username, password, callback}) {
    dataService.login(username, password).then(data => {
      Notification({
        title: '成功',
        message: `恭喜 ${username} 登录成功`,
        type: 'success'
      })
      commit(types.LOGIN, data.body)
      localStorage.setItem('auth', JSON.stringify({token: state.token, profile: data.body.profile}))

      if (callback && (callback instanceof Function)) {
        callback()
      }
    })
  },
  logout ({ commit }, callback) {
    commit(types.LOGOUT)
    if (callback && (callback instanceof Function)) {
      callback()
    }
  },
  reloadAuth ({ dispatch, commit }) {
    let auth = JSON.parse(localStorage.getItem('auth'))
    if (auth !== null && auth !== '') {
      return new Promise((resolve, reject) => {
        console.info(auth)
        commit(types.LOGIN, auth)
        resolve()
      })
    }
  },
  loadLoginUser ({ commit, state }, callback) {
    dataService.getAdmin(state.profile.id).then(data => {
      commit(types.LOAD_LOGIN_USER, data.body)
      if (callback && (callback instanceof Function)) {
        callback(data.body)
      }
    })
  },
  updateLoginUser ({ commit, state }, data) {
    dataService.modifyAdmin(state.profile.id, data).then(res => {
      Notification({
        title: '成功',
        message: `修改信息成功`,
        type: 'success'
      })
      commit(types.UPDATE_LOGIN_USER, data)
    })
  },
  resetPassword ({ commit, state }, {oldPwd, newPwd}) {
    dataService.modifyAdminPass(state.profile.id, {oldPassword: oldPwd, newPassword: newPwd}).then(data => {
      Notification({
        title: '成功',
        message: `重置密码成功`,
        type: 'success'
      })
    })
  }
}

// mutations
const mutations = {
  [types.LOGIN]: (state, data) => {
    state.logined = true
    state.profile = data.profile
    state.token = data.token

    Vue.http.headers.common['Authorization'] = 'Basic ' + state.token
  },
  [types.LOGOUT]: (state) => {
    state.logined = false
    state.profile = {}
    state.token = null

    localStorage.setItem('auth', null)
    Vue.http.headers.common['Authorization'] = 'Basic '
  },
  [types.LOAD_LOGIN_USER]: (state, data) => {
    state.profile = data
  },
  [types.UPDATE_LOGIN_USER]: (state, data) => {
    state.profile = Object.assign({}, data)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
