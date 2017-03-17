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
  movieList: state => state.list,
  movieTotal: state => state.total,
  movie: state => state.profile
}

// actions
const actions = {
  loadMovieList ({ commit }, params) {
    commit(types.QUERY_LIST, {loading: true})
    dataService.getMovieList(params).then(data => {
      commit(types.LOAD_MOVIE_LIST, data.body)
      commit(types.QUERY_LIST, {loading: false})
    }, data => {
      commit(types.QUERY_LIST, {loading: false})
    })
  }
}

// mutations
const mutations = {
  [types.LOAD_MOVIE_LIST]: (state, data) => {
    state.list = data.content
    state.total = data.totalElements
  },
  [types.VIEW_MOVIE]: (state, defaultValue) => {
    state.profile = defaultValue
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
