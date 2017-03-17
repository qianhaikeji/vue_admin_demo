<template>
  <div class="zy-content">
      <div class="zy-side-nav">
        <el-menu router class="el-menu-vertical-demo" :default-active="currentRouter" theme="dark">
          <el-submenu v-for="nav in navs" :index="nav.title">
            <template slot="title">{{ nav.title }}</template>
            <el-menu-item v-for="subnav in nav.subnavs" :index="subnav.router">{{ subnav.title }}</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>

      <div class="zy-main">
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
      </div>
  </div>
</template>

<script>
import { ENUM_CATEGORY_TYPES } from 'consts'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      navs: [
        {
          title: '统计分析',
          subnavs: [
            {title: '总体分析', router: '/'},
            {title: '用户分析', router: '/statistic/users'},
            {title: '热度分析', router: '/statistic/heat'},
            {title: '网站PV', router: '/statistic/pv'}
          ]
        },
        {
          title: '系统管理',
          subnavs: [
            {title: '基础功能', router: '/system/base'},
            {title: '随机banner', router: '/system/ppt'},
            {title: '普通banner', router: '/system/banner'}
          ]
        },
        {
          title: '标签管理',
          subnavs: [
            {title: '化妆师', router: '/tag/dresser'},
            {title: '道具师', router: '/tag/propMaster'},
            {title: '服装师', router: '/tag/costumer'}
          ]
        },
        {
          title: '用户管理',
          subnavs: [
            {title: '用户列表', router: '/user'}
          ]
        },
        {
          title: '作品管理',
          subnavs: [
            {title: '摄影作品', router: '/works/photo'},
            {title: '视频作品', router: '/works/video'},
            {title: '电影作品', router: '/works/movie'}
          ]
        },
        {
          title: '消息管理',
          subnavs: [
            {title: '消息列表', router: '/message'}
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      currentRouter: 'currentRouter'
    })
  }
}
</script>

<style>
.zy-content {
  min-height: 500px;
}
.zy-side-nav {
  position: fixed;
  top: 40px;
  left: 0;
  bottom: 0;
  width: 200px;
  background: #324057;
  overflow: scroll;
}
.zy-side-nav .el-menu {
  width: 100%;
}
.zy-main {
  margin-top: 40px;
  margin-left: 200px;
  padding: 20px;
}
.zy-main h2{
    font-size: 18px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    margin-bottom:10px;
}
.zy-main h3{
    font-size: 16px;
    padding-bottom: 8px;
    margin-bottom: 8px;
}
</style>
