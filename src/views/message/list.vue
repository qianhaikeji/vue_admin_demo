<!-- 
 * @author 曹宏涛<caohongtao@qianhaikeji.cn> 
-->
<template>
  <div class="list">
    <el-row class="good-list-top-bar" :gutter="20">
      <el-col :span="2"><el-button type="primary" @click="addMessage()">新建</el-button></el-col>
    </el-row>
    <el-table :data="listData" v-loading="loading" fit stripe border class="list-table">
      <el-table-column inline-template fixed="left" label="操作" min-width="40">
        <div>
          <el-button @click="modifyMessage(row)" size="mini" type="info">编辑</el-button>
        </div>
      </el-table-column>
      <el-table-column prop="id" label="编号" min-width="40"></el-table-column>
      <el-table-column prop="title" label="标题" min-width="100"></el-table-column>
      <el-table-column prop="content" label="内容" min-width="200" :formatter="formatContent"></el-table-column>
      <el-table-column prop="updatedAt" label="更新日期" min-width="100" :formatter="formatTime"></el-table-column>
    </el-table>
    <page ref="page" :fetch-data="fetchData" :total="total"></page>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import page from 'components/page'
import zySelect from 'components/zySelect'

export default {
  components: {
    page,
    zySelect
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      listData: 'messages',
      loading: 'loading',
      total: 'messageTotal'
    })
  },
  methods: {
    ...mapActions([
      'loadMessages'
    ]),
    ...mapMutations({
      loadProfile: 'VIEW_MESSAGE',
      viewProfile: 'GO_TO_PROFILE'
    }),
    fetchData: function (pageParams) {
      this.loadMessages(pageParams)
    },
    fetchByCond: function () {
      this.$refs.page.reset()
    },
    addMessage: function (row) {
      this.loadProfile(null)
      this.viewProfile({mode: 'add'})
    },
    modifyMessage: function (row) {
      this.loadProfile(row)
      this.viewProfile({mode: 'modify'})
    },
    formatTime: function (row, column) {
      return this.$moment(row.regDate).format('YYYY-MM-DD')
    },
    formatContent: function (row, column) {
      let afterCut = row.content.substring(0, 50)
      if (afterCut !== row.content) {
        afterCut += '...'
      }
      return afterCut
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
