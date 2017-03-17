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
          <td colspan="2">
            <el-form-item label="视频">
              <el-button type="primary" @click="showPlayPanel=true">点击预览</el-button>
            </el-form-item>
          </td>
       </tr>
       <tr>
          <td><el-form-item label="编号"><el-input :readonly="true" class="readonly" v-model="profile.id"></el-input></el-form-item></td>
          <td><el-form-item label="标题"><el-input :readonly="true" class="readonly" v-model="profile.title"></el-input></el-form-item></td>
          <td><el-form-item label="创建时间"><el-input :readonly="true" class="readonly" v-model="createdAt"></el-input></td>
       </tr>
       <tr>
          <td><el-form-item label="简介"><el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="profile.brief" :readonly="true"></el-input></el-form-item></td>
          <td><el-form-item label="浏览量"><el-input :readonly="true" class="readonly" v-model="profile.viewCount"></el-input></td>
       </tr>
      </table>
    </el-form>

    <video-player v-model="showPlayPanel" :video="video" v-if="showPlayPanel"></video-player>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import backToList from 'components/backToList'
import videoPlayer from 'components/videoPlayer'

export default {
  components: { backToList, videoPlayer },
  data () {
    return {
      showPlayPanel: false
    }
  },
  computed: {
    ...mapGetters({
      video: 'video'
    }),
    profile: function () {
      return Object.assign({}, this.video)
    },
    createdAt: function () {
      return this.$moment(this.profile.createdAt).format('YYYY-MM-DD')
    },
    isFlash () {
      return /\.swf/.test(this.profile.url)
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