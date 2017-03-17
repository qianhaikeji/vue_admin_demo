<!--
 * @author zl<3230877975@qq.com>
-->
<template>
  <div class="list">
    <el-row class="list-top-bar" :gutter="20">
      <el-col :span="3"><el-button type="primary" @click="addItem()">新建</el-button></el-col>
      <el-col :offset="2" :span="5"><el-input v-model="queryCond.fuzzy" placeholder="请输入内容"></el-input></el-col>
      <el-col :span="2"><el-button type="primary" @click="fetchByCond()">查询</el-button></el-col>

    </el-row>

    <el-table :data="listData" @sort-change="sortChange" v-loading="loading" stripe border fit class="list-table">
      <el-table-column inline-template fixed="left" label="操作" width="120">
        <div>
          <el-button @click="modifyItem(row)" size="mini" type="info">编辑</el-button>
          <el-button @click="deleteItem($index, row)" size="mini" type="danger">删除</el-button>
        </div>
      </el-table-column>
      <el-table-column prop="id" label="id" min-width="80"></el-table-column>
      <el-table-column prop="name" label="名称" min-width="180" inline-template><div :class="{sub: row.parentId!=null}">{{ row.name }}</div></el-table-column>
      <el-table-column prop="recommend" label="置顶" min-width="80" :formatter="formatBoolean" sortable='custom'></el-table-column>
      <el-table-column prop="refCount" label="引用次数" min-width="80" sortable='custom'></el-table-column>
    </el-table>
    <page ref="page" :fetch-data="fetchData" :total="total"></page>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import page from 'components/page'
export default {
  data () {
    return {
      queryCond: {
        fuzzy: '',
        sort: null,
        sortDirection: null
      }
    }
  },
  components: {
    page
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      listData: 'tags',
      total: 'total'
    }),
    type: function () {
      let map = {
        dresser: 0,
        propMaster: 1,
        costumer: 2
      }
      return map[this.$route.params.type]
    }
  },
  methods: {
    ...mapActions([
      'loadTags',
      'deleteTag'
    ]),
    ...mapMutations({
      loadProfile: 'VIEW_TAG',
      viewProfile: 'GO_TO_PROFILE'
    }),
    fetchData: function (pageParams) {
      let queryParams = Object.assign({type: this.type}, this.queryCond, pageParams)
      this.loadTags(queryParams)
    },
    fetchByCond: function () {
      this.$refs.page.reset()
    },
    sortChange: function (data) {
      this.queryCond.sort = data.prop
      this.queryCond.sortDirection = (data.order === 'ascending' ? 'asc' : 'desc')
      this.fetchByCond()
    },
    modifyItem: function (row) {
      this.loadProfile(row)
      this.viewProfile({mode: 'modify'})
    },
    addItem: function (row) {
      this.loadProfile({type: this.type})
      this.viewProfile({mode: 'add'})
    },
    deleteItem: function (index, row) {
      this.$confirm(`确认删除手艺标签 ${row.name} ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteTag(row.id)
      }).catch(() => {
        // Do nothing
      })
    },
    formatBoolean: function (row, column) {
      return row[column.property] && '是' || '否'
    }
  },
  watch: {
    '$route': 'fetchByCond'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-top-bar .el-button {
  width: 100%;
}

.cell .sub {
  padding-left: 20px;
}
</style>
