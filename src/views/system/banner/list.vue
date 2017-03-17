<template>
  <div class="banners-list">
    <el-table :data="listData" v-loading="loading" stripe border class="banners-list-table">
      <el-table-column inline-template label="操作" fixed="left" width="80">
        <el-button size="mini" @click="modifyBanners(row)" type="info">编辑</el-button>
      </el-table-column>
      <el-table-column prop="k" label="位置"></el-table-column>
      <el-table-column inline-template prop="url" label="图片" min-width="80">
        <div :style="{backgroundImage: 'url(' + row.url + ')'}" class="ppt-preview"></div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import page from 'components/page'
export default {
  components: {
    page
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      listData: 'bannerList',
      total: 'bannerTotal',
      loading: 'loading'
    })
  },
  methods: {
    ...mapActions([
      'loadBannerList'
    ]),
    ...mapMutations({
      loadProfile: 'VIEW_BANNER',
      viewProfile: 'GO_TO_PROFILE'
    }),
    fetchData: function (pageParams) {
      let queryParams = Object.assign({}, pageParams)
      this.loadBannerList(queryParams)
    },
    fetchByCond: function () {
      this.$refs.page.reset()
    },
    modifyBanners: function (row) {
      this.loadProfile(row)
      this.viewProfile({mode: 'modify'})
    }
  },
  created: function () {
    this.fetchData()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banners-list {
  width: 60%;
}
.banners-list-top-bar .el-button {
  width: 100%;
}
.banners-list-table {
  margin-top: 20px;
}
.el-pagination {
  margin-top: 20px;
}
.ppt-preview {
  width: 230px;
  height: 150px;
  background-position: center;
  background-size: cover;
  background-repeat:no-repeat;
  margin: auto
}
</style>
