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
  tags: state => state.list,
  tag: state => state.profile,
  total: state => state.total
}

// actions
const actions = {
  loadTags ({ commit }, params) {
    commit(types.QUERY_LIST, {loading: true})
    dataService.getTagList(params).then(data => {
      commit(types.LOAD_TAGS, data.body)
      commit(types.QUERY_LIST, {loading: false})
    }, data => {
      commit(types.QUERY_LIST, {loading: false})
    })
  },
  addTag ({ commit }, profile) {
    dataService.addTag(profile).then(data => {
      Notification({
        title: '成功',
        message: `增加手艺标签成功`,
        type: 'success'
      })
      commit(types.ADD_TAG, profile)
    })
  },
  updateTag ({ commit }, profile) {
    dataService.modifyTag(profile.id, profile).then(data => {
      Notification({
        title: '成功',
        message: `修改手艺标签成功`,
        type: 'success'
      })
      commit(types.UPDATE_TAG, profile)
    })
  },
  deleteTag ({ commit }, id) {
    dataService.deleteTag(id).then(data => {
      Notification({
        title: '成功',
        message: `删除手艺标签成功`,
        type: 'success'
      })
      commit(types.DELETE_TAG, id)
    })
  }
}

// mutations
const mutations = {
  [types.LOAD_TAGS]: (state, data) => {
    state.list = data.content
    state.total = data.totalElements
  },
  [types.VIEW_TAG]: (state, defaultValue) => {
    state.profile = defaultValue
  },
  [types.ADD_TAG]: (state, data) => {
    state.list.push(data)
  },
  [types.DELETE_TAG]: (state, id) => {
    let index = state.list.findIndex(ele => ele.id === id)
    if (index !== -1) {
      state.list.splice(index, 1)
    }
  },
  [types.UPDATE_TAG]: (state, data) => {
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
