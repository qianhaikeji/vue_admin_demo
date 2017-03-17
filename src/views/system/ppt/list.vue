<!--
 * @author zhangle<3230877975@qq.com>
-->
<template>
  <div class="list">
    <el-row class="list-top-bar" :gutter="20">
      <el-col :span="2"><el-button type="primary" @click="addItem()">新建</el-button></el-col>
      <el-col :span="2"><el-button type="primary" @click="fetchData()">刷新</el-button></el-col>
    </el-row>

    <el-table :data="listData" v-loading="loading" stripe border fit class="list-table" >
      <el-table-column inline-template fixed="left" label="操作" width="120">
        <div>
          <el-button @click="modifyItem(row)" size="mini" type="info">编辑</el-button>
          <el-button @click="deleteItem($index, row)" size="mini" type="danger">删除</el-button>
        </div>
      </el-table-column>
      <el-table-column prop="title" label="标题" min-width="80"></el-table-column>
      <el-table-column inline-template prop="url" label="图片" min-width="80">
        <div :style="{backgroundImage: 'url(' + row.url + ')'}" class="ppt-preview"></div>
      </el-table-column>

      <!--
      <el-table-column prop="rank" label="排序" min-width="50" ></el-table-column>
      -->
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      loading: 'loading',
      listData: 'ppts'
    })
  },
  methods: {
    ...mapActions([
      'loadPPTs',
      'deletePPT'
    ]),
    ...mapMutations({
      loadProfile: 'VIEW_PPT',
      viewProfile: 'GO_TO_PROFILE'
    }),
    fetchData: function () {
      this.loadPPTs()
    },
    modifyItem: function (row) {
      this.loadProfile(row)
      this.viewProfile({mode: 'modify'})
    },
    addItem: function (row) {
      this.loadProfile({rank: 0})
      this.viewProfile({mode: 'add'})
    },
    deleteItem: function (index, row) {
      this.$confirm(`确认删除Banner ${row.title} ?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deletePPT(row.id)
      }).catch(() => {
        // Do nothing
      })
    }
  },
  created: function () {
    this.fetchData()
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
.ppt-preview {
  width: 230px;
  height: 150px;
  background-position: center;
  background-size: cover;
  background-repeat:no-repeat;
  margin: auto
}

</style>
