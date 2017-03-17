<!-- 
 * @author 曹宏涛<caohongtao@qianhaikeji.cn> 
-->
<template>
  <div class="list">
    <el-row class="good-list-top-bar" :gutter="20">
      <el-col :span="2"><el-button type="primary" @click="addItem()">新增</el-button></el-col>
      <el-col :span="3"><zy-select v-model="queryCond.type" :options="options.type" as-label="label" as-value="value"></zy-select></el-col>
      <el-col :span="3"><zy-select v-model="queryCond.checked" :options="options.checked" as-label="label" as-value="value"></zy-select></el-col>
      <el-col :span="4"><el-input v-model="queryCond.fuzzy" placeholder="请输入内容"></el-input></el-col>
      <el-col :span="2"><el-button type="primary" @click="fetchByCond()">查询</el-button></el-col>
      <el-col :span="3" :offset="4"><el-button type="primary" @click="batchCheck(true)">批量审核</el-button></el-col>
      <el-col :span="3"><el-button type="primary" @click="batchCheck(false)">批量反审核</el-button></el-col>
    </el-row>
    <el-table :data="listData" v-loading="loading" @selection-change="tableSelectionChanged" @sort-change="sortChange" fit stripe border class="list-table">
      <el-table-column type="selection" fixed="left" width="50"></el-table-column>
      <el-table-column inline-template fixed="left" label="操作" min-width="120">
        <div>
          <el-button @click="modifyItem(row)" size="mini" type="info">编辑</el-button>
          <el-button @click="deleteItem($index, row)" size="mini" type="danger">删除</el-button>

        </div>
      </el-table-column>
      <el-table-column prop="id" label="编号" min-width="100" sortable='custom'></el-table-column>
      <el-table-column prop="phone" label="手机号" min-width="150"></el-table-column>
      <el-table-column prop="username" label="用户名" min-width="100"></el-table-column>
      <el-table-column prop="type" label="职业" min-width="100" :formatter="formatType"></el-table-column>
      <el-table-column prop="workCount" label="作品数" min-width="100" sortable='custom'></el-table-column>
      <el-table-column prop="viewCount" label="被浏览次数" min-width="130" sortable='custom'></el-table-column>
      <el-table-column prop="recommend" label="是否置顶" min-width="120" sortable='custom' :formatter="formatBoolean"></el-table-column>
      <el-table-column prop="checked" label="是否审核" min-width="100" :formatter="formatBoolean"></el-table-column>
      <el-table-column prop="lastLoginDate" label="最后登录日期" min-width="130"></el-table-column>
      <el-table-column prop="sex" label="性别" min-width="100"></el-table-column>
      <el-table-column prop="birthday" label="生日" min-width="120" :formatter="formatBirth"></el-table-column>
      <el-table-column prop="email" label="邮箱" min-width="200"></el-table-column>
      <el-table-column prop="city" label="所在地" min-width="100"></el-table-column>
      <el-table-column prop="regDate" label="注册时间" min-width="120" :formatter="formatReg"></el-table-column>
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
      queryCond: {
        type: -1,
        checked: 'all',
        fuzzy: '',
        sort: null,
        sortDirection: null
      },
      options: {
        type: [
          {label: '全部', value: -1},
          {label: '化妆师', value: 0},
          {label: '道具师', value: 1},
          {label: '服装师', value: 2}
        ],
        checked: [
          {label: '全部', value: 'all'},
          {label: '已审核', value: 'true'},
          {label: '未审核', value: 'false'}
        ]
      }
    }
  },
  computed: {
    ...mapGetters({
      listData: 'users',
      loading: 'loading',
      total: 'userTotal'
    })
  },
  methods: {
    ...mapActions([
      'loadUserList',
      'batchCheckUser',
      'batchUncheckUser',
      'deleteUser'
    ]),
    ...mapMutations({
      loadProfile: 'VIEW_USER',
      viewProfile: 'GO_TO_PROFILE'
    }),
    fetchData: function (pageParams) {
      let queryParams = Object.assign({}, this.queryCond, pageParams)
      this.loadUserList(queryParams)
    },
    fetchByCond: function () {
      this.$refs.page.reset()
    },
    sortChange: function (data) {
      this.queryCond.sort = data.prop
      this.queryCond.sortDirection = (data.order === 'ascending' ? 'asc' : 'desc')
      this.fetchByCond()
    },
    addItem: function (row) {
      this.loadProfile({})
      this.viewProfile({mode: 'add'})
    },
    modifyItem: function (row) {
      this.loadProfile(row)
      this.viewProfile({mode: 'modify'})
    },
    deleteItem: function (index, row) {
      this.$confirm(`确认删除用户 ${row.username} ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteUser(row.id)
      }).catch(() => {
        // Do nothing
      })
    },
    tableSelectionChanged: function (val) {
      this.multipleSelection = val
    },
    batchCheck: function (checked) {
      let users = []
      for (let user of this.multipleSelection) {
        if (user.checked !== checked) {
          users.push(user.id)
        }
      }

      if (checked) {
        this.batchCheckUser(users)
      } else {
        this.batchUncheckUser(users)
      }
    },
    formatBoolean: function (row, column) {
      return row[column.property] && '是' || '否'
    },
    formatReg: function (row, column) {
      return this.$moment(row.regDate).format('YYYY-MM-DD')
    },
    formatBirth: function (row, column) {
      return this.$moment(row.birthday).format('YYYY-MM-DD')
    },
    formatType: function (row, column) {
      const map = ['化妆师', '道具师', '服装师']
      return map[row.type]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
