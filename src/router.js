/**
 * 路由定义
 *
 * @date     2016-11-27
 * @author   曹宏涛<caohongtao@qianhaikeji.cn>
 */
import VueRouter from 'vue-router'
import store from './store'

import Login from './views/login'
import NotFound from './views/404'

import Header from './views/layout/header'
import Body from './views/layout/body'
import Footer from './views/layout/footer'

import statOverall from './views/statistic/overall'
import statUsers from './views/statistic/users'
import statHeat from './views/statistic/heat'
import statPv from './views/statistic/pv'

import systemPPT from './views/system/ppt/index'
import systemBanner from './views/system/banner/index'
import systemBase from './views/system/base'
import systemAdmin from './views/system/admin'

import tag from './views/tag/index'

import user from './views/user'

import worksPhoto from './views/works/photo'
import worksVideo from './views/works/video'
import worksMovie from './views/works/movie'

import message from './views/message'

const routers = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/login',
      components: {
        body: Login
      },
      name: 'login'
    },
    {
      path: '/',
      components: {
        header: Header,
        body: Body,
        footer: Footer
      },
      children: [
        {
          path: '',
          name: 'home',
          component: statOverall
        },
        {
          path: 'statistic/users',
          name: '统计-用户',
          component: statUsers
        },
        {
          path: 'statistic/heat',
          name: '统计-热度',
          component: statHeat
        },
        {
          path: 'statistic/pv',
          name: '统计-pv',
          component: statPv
        },
        {
          path: 'system/ppt',
          name: '系统管理-ppt',
          component: systemPPT
        },
        {
          path: 'system/banner',
          name: '系统管理-banner',
          component: systemBanner
        },
        {
          path: 'system/base',
          name: '系统管理-基础功能',
          component: systemBase
        },
        {
          path: 'tag/:type',
          name: '标签管理-服装师',
          component: tag
        },
        {
          path: 'user',
          name: '用户管理-用户列表',
          component: user
        },
        {
          path: 'works/photo',
          name: '作品管理-摄影作品',
          component: worksPhoto
        },
        {
          path: 'works/video',
          name: '作品管理-视频作品',
          component: worksVideo
        },
        {
          path: 'works/movie',
          name: '作品管理-电影作品',
          component: worksMovie
        },
        {
          path: 'message',
          name: '消息管理-消息列表',
          component: message
        },
        {
          path: 'profile',
          name: '管理员',
          component: systemAdmin
        }
      ]
    },
    {
      path: '*',
      components: {
        header: Header,
        body: NotFound,
        footer: Footer
      },
      name: '404'
    }
  ]
})

routers.beforeEach((to, from, next) => {
  // let logined = store.state.auth.logined
  // if (!logined) {
  //   store.dispatch('reloadAuth').then(() => {
  //     logined = store.state.auth.logined

  //     if (!logined && to.name !== 'login') {
  //       next({name: 'login'})
  //       return
  //     }

  //     if (logined && to.name === 'login') {
  //       next({name: 'home'})
  //       return
  //     }

  //     next()
  //   })

  //   next(false)
  // } else {
  //   next()
  // }
  next()
})

routers.afterEach(router => {
  store.commit('CHANGE_ROUTER', router.path)
})

export default routers
