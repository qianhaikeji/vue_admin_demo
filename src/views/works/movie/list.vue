<!-- 
 * @author miracle_dan<denghan@qianhaikeji.cn> 
-->
<template>
  <div class="list">
    <el-table :data="listData" v-loading="loading" @sort-change="sortChange" fit stripe border class="list-table">
      <el-table-column inline-template fixed="left" label="操作" min-width="80">
        <div>
          <el-button @click="modify(row)" size="mini" type="info">查看</el-button>
        </div>
      </el-table-column>
      <el-table-column prop="id" label="编号" min-width="100" sortable></el-table-column>
      <el-table-column prop="username" label="作者" min-width="100"></el-table-column>
      <el-table-column label="电影封面" min-width="120" inline-template>
          <img :src="row.thumbUrl" alt="" class="tb-img">
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="120"></el-table-column>
      <el-table-column prop="score" label="评分" min-width="100"></el-table-column>
      <el-table-column prop="viewCount" label="浏览量" min-width="120" sortable></el-table-column>
      <el-table-column prop="createdAt" label="创建时间" min-width="120" :formatter="formatTime" sortable></el-table-column>
    </el-table>
    <page ref="page" :fetch-data="fetchData" :total="total"></page>
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
      queryCond: {
        fuzzy: '',
        sort: '',
        sortDirection: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      listData: 'movieList',
      loading: 'loading',
      total: 'movieTotal'
    })
  },
  methods: {
    ...mapActions([
      'loadMovieList'
    ]),
    ...mapMutations({
      loadProfile: 'VIEW_MOVIE',
      viewProfile: 'GO_TO_PROFILE'
    }),
    fetchData: function (pageParams) {
      let queryParams = Object.assign({}, this.queryCond, pageParams)
      this.loadMovieList(queryParams)
    },
    fetchByCond: function () {
      this.$refs.page.reset()
    },
    sortChange: function (data) {
      this.queryCond.sort = data.prop
      this.queryCond.sortDirection = (data.order === 'ascending' ? 'asc' : 'desc')
      this.fetchByCond()
    },
    modify: function (row) {
      this.loadProfile(row)
      this.viewProfile({mode: 'modify'})
    },
    formatTime: function (row, column) {
      return this.$moment(row.regDate).format('YYYY-MM-DD')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tb-img{
    height: 45px;
    width: 45px;
  }
</style>
