<!-- 
 * @author miracle_dan<denghan@qianhaikeji.cn> 
-->
<template>
  <div>
    <back-to-list></back-to-list>
    <el-form ref="form" :model="form" label-width="100px">
      <table>
       <tr>
          <td><el-form-item label="封面"><img :src="profile.thumbUrl" class="det-img-wrap"></el-form-item></td>
       </tr> 
       <tr>
          <td><el-form-item label="编号"><el-input :readonly="true" class="readonly" v-model="profile.id"></el-input></el-form-item></td>
          <td><el-form-item label="作者"><el-input :readonly="true" class="readonly" v-model="profile.uid"></el-input></el-form-item></td>
          <td><el-form-item label="创建时间"><el-input :readonly="true" class="readonly" v-model="createdAt"></el-input></td>
       </tr>
       <tr>
          <td><el-form-item label="评分"><el-input :readonly="true" class="readonly" v-model="profile.score"></el-input></el-form-item></td>
          <td><el-form-item label="浏览量"><el-input :readonly="true" class="readonly" v-model="profile.viewCount"></el-input></td>
          <td><el-form-item label="链接"><el-input :readonly="true" class="readonly" v-model="profile.link"></el-input></td>
       </tr>
       <tr>
          <td><el-form-item label="简介"><el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="profile.brief" :readonly="true"></el-input></el-form-item></td>
       </tr>
       <tr>
       </tr>
      </table>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import backToList from 'components/backToList'

export default {
  components: {
    backToList
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      movie: 'movie'
    }),
    profile: function () {
      return Object.assign({}, this.movie)
    },
    createdAt: function () {
      return this.$moment(this.profile.createdAt).format('YYYY-MM-DD')
    }

  },
  methods: {
    ...mapActions([
      'updateUser'
    ]),
    submit: function () {
      this.updateUser({id: this.profile.id, info: {rank: this.profile.rank}})
    },
    formatTime: function (time) {
      return this.$moment(time).format('YYYY-MM-DD')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  width: 100%;
}

td {
  width: 33%;
}

.el-form {
  min-width: 800px;
  max-width: 1200px;
  margin-top: 20px;
}

.det-img-wrap{
  width: 50%;
}


</style>