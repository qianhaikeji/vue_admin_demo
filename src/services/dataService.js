'use strict'
/**
 * 公共模块，请注意书写规范。
 * 1.在最下方导出你所需要的函数。不同模块之间请用空行分隔，并在初始位置写注释标明归属于哪个模块（如动态，统计，规则）。
 * 2.函数定义的顺序请与模块导出时一致，方便管理。不同函数之间请保留一个空行。
 * 3.函数命名以此规则命名：操作类型(get，add，modify，delete) + 路由(如‘stats/user’则拼为‘StatsUser’)。
 *    get方法获取的是列表，则最末尾添加List。比如获取单条动态为”getShow”，获取动态列表则为“getShowList”
 *
 * @date     2016-11-27
 * @author   曹宏涛<caohongtao@qianhaikeji.cn>
 */
import Vue from 'vue'
import VueResource from 'vue-resource'
import config from '../config'
import { Notification } from 'element-ui'

Vue.use(VueResource)
Vue.http.options.root = config.server
Vue.http.interceptors.push((request, next) => {
  // continue to next interceptor
  next((response) => {
    // modify response
    if (response.status === 400) {
      Notification.error({
        title: '错误',
        message: response.body.message
      })
    }
  })
})

// 会员
function getUserList (params) {
  return Vue.resource('users').get(params)
}

function updateUser (id, data) {
  return Vue.http.put(`users/${id}`, data)
}

function deleteUser (id) {
  return Vue.resource(`users/${id}`).remove()
}

function addFakeUser (payload) {
  return Vue.http.post('users/fake', payload)
}

function getUser (id) {
  return Vue.resource(`users/${id}`).get()
}

function updateUserChecked (id) {
  return Vue.http.patch(`users/${id}/checked`)
}

function updateUserUnchecked (id) {
  return Vue.http.patch(`users/${id}/uncheck`)
}

function updateUserBatchChecked (users) {
  return Vue.http.post('users/checked', users)
}

function updateUserBatchUnchecked (users) {
  return Vue.http.post('users/uncheck', users)
}

function updateUserRecommend (id) {
  return Vue.http.patch(`users/${id}/recommend`)
}

function updateUserUnrecommend (id) {
  return Vue.http.patch(`users/${id}/unrecommend`)
}

function login (username, password) {
  return Vue.http.post(`admin/token`, {username: username, password: password})
}

// 作品
function getPhotoList (params) {
  return Vue.resource('users/0/photos').get(params)
}

function getVideoList (params) {
  return Vue.resource('users/0/videos').get(params)
}

function getMovieList (params) {
  return Vue.resource('users/0/movies').get(params)
}

function getSystemSettings (params) {
  return Vue.resource('setting/system').get(params)
}

function updateSystemSettingsUserCheck (flag) {
  if (flag) {
    return Vue.http.patch(`setting/userCheck/on`)
  } else {
    return Vue.http.patch(`setting/userCheck/off`)
  }
}

function updateAdminPassword (passwordObj) {
  return Vue.http.patch(`admin/users/1/password`, passwordObj)
}

function getPPTList (params) {
  return Vue.resource('setting/ppts').get(params)
}

function modifyPPT (id, ppt) {
  return Vue.resource(`setting/ppts/${id}`).update(ppt)
}

function deletePPT (id) {
  return Vue.resource(`setting/ppts/${id}`).remove()
}

function addPPT (ppt) {
  return Vue.resource(`setting/ppts`).save(ppt)
}

function addTag (category) {
  return Vue.resource(`skills`).save(category)
}

function deleteTag (id) {
  return Vue.resource(`skills/${id}`).remove()
}

function modifyTag (id, category) {
  return Vue.resource(`skills/${id}`).update(category)
}

function getTagList (params) {
  return Vue.resource(`skills`).get(params)
}

function getUserRegion () {
  return Vue.http.get(`stats/user/region`)
}

function getUserTypes () {
  return Vue.http.get('stats/user/type')
}

function getUserSkills (type = 0) {
  return Vue.http.get(`stats/user/type/${type}/skill`)
}

function getMessageList (params) {
  return Vue.resource('messages').get(params)
}

function addMessage (message) {
  return Vue.resource('messages').save(message)
}

function modifyMessage (id, message) {
  return Vue.resource(`messages/${id}`).update(message)
}

function deleteMessage (id) {
  return Vue.resource(`messages/${id}`).remove()
}

function addMessageToUserList (id, users) {
  return Vue.resource(`messages/${id}/users`).save(users)
}

function addMessageToAllUser (id) {
  return Vue.resource(`messages/${id}/users/all`).save()
}

function getHotUsers () {
  return Vue.http.get(`stats/hot/user`)
}

function getHotVideos () {
  return Vue.http.get(`stats/hot/video`)
}

function getHotPictures () {
  return Vue.http.get(`stats/hot/photo`)
}

function getHotMovies () {
  return Vue.http.get(`stats/hot/movie`)
}

function getUserActivation (params) {
  return Vue.resource('stats/user/activation').get(params)
}

function getPv (params) {
  return Vue.resource('stats/pv').get(params)
}

function getBannerList (params) {
  return Vue.resource('banners').get(params)
}

function getBanner (id) {
  return Vue.resource(`banners/${id}`).get()
}

function modifyBanner (id, banner) {
  return Vue.resource(`banners/${id}`).update(banner)
}

export default {
  // 会员
  getUserList,
  updateUser,
  deleteUser,
  addFakeUser,
  getUser,
  updateUserChecked,
  updateUserUnchecked,
  updateUserBatchChecked,
  updateUserBatchUnchecked,
  updateUserRecommend,
  updateUserUnrecommend,

  // 作品
  getPhotoList,
  getVideoList,
  getMovieList,

  // auth
  login,

  // 系统管理
  getSystemSettings,
  updateSystemSettingsUserCheck,
  updateAdminPassword,

  // PPT
  getPPTList,
  addPPT,
  modifyPPT,
  deletePPT,

  // 手艺标签管理
  addTag,
  deleteTag,
  modifyTag,
  getTagList,

  // stats
  getUserActivation,
  getUserRegion,
  getUserTypes,
  getUserSkills,
  getHotUsers,
  getHotPictures,
  getHotMovies,
  getHotVideos,
  getPv,

  // 消息
  getMessageList,
  addMessage,
  modifyMessage,
  deleteMessage,
  addMessageToUserList,
  addMessageToAllUser,

  // banner
  getBannerList,
  getBanner,
  modifyBanner
}
