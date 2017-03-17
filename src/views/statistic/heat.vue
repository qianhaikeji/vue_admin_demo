<!--
 * @author Ling<i@zeroling.com>
-->
<template>
  <div class="page-stat-heat">
    <div class="stat-user">
      <h2>用户浏览数 TOP10</h2>
      <el-table
        :data="tableDataUser"
        border>
        <el-table-column
          type="index"
          label="排名"
          width="65">
        </el-table-column>
        <el-table-column
          prop="avatar"
          label="头像"
          width="138">
          <template scope="scope">
            <div class="avatar"
                 :style="{ backgroundImage: 'url(' + scope.row.avatar + ')' }"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="viewCount"
          label="点击次数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="120">
        </el-table-column>
        <el-table-column
          label="职业"
          width="100">
          <template scope="scope">
            <span v-if="scope.row.type === 0">化妆师</span>
            <span v-else-if="scope.row.type === 1">道具师</span>
            <span v-else-if="scope.row.type === 2">服装师</span>
            <span v-else="scope.row.type === 2">未知</span>
          </template>
        </el-table-column>
        <el-table-column
          label="技能"
          width="180">
          <template scope="scope">
            {{ scope.row.skills ? scope.row.skills.map(s => s.name).join(', ') : '' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="160">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="180">
        </el-table-column>
        <el-table-column
          prop="wechat"
          label="微信"
          width="180">
        </el-table-column>
        <el-table-column
          label="城市"
          width="180">
          <template scope="scope">
            {{ scope.row.province + ' ' + scope.row.city }}
          </template>
        </el-table-column>
        <el-table-column
          prop="lastLoginDate"
          label="上次登录"
          width="180">
        </el-table-column>
      </el-table>
    </div>

    <div class="stat-movie">
      <h2>电影浏览数 TOP10</h2>
      <el-table
        :data="tableDataMovie"
        border>
        <el-table-column
          type="index"
          label="排名"
          width="65">
        </el-table-column>
        <el-table-column
          label="缩略图"
          width="138">
          <template scope="scope">
            <div class="avatar"
                 :style="{ backgroundImage: 'url(' + scope.row.thumbUrl + ')' }"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="viewCount"
          label="点击次数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="score"
          label="豆瓣评分"
          width="120">
        </el-table-column>
        <el-table-column
          label="链接"
          width="180">
          <template scope="scope">
            <a :href="scope.row.link" target="_blank">{{ scope.row.link }}</a>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="stat-video">
      <h2>视频浏览数 TOP10</h2>
      <el-table
        :data="tableDataVideo"
        border>
        <el-table-column
          type="index"
          label="排名"
          width="65">
        </el-table-column>
        <el-table-column
          label="缩略图"
          width="138">
          <template scope="scope">
            <div class="avatar"
                 :style="{ backgroundImage: 'url(' + scope.row.thumbUrl + ')' }"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="viewCount"
          label="点击次数"
          width="120">
        </el-table-column>
        <el-table-column
          label="播放链接"
          width="180">
          <template scope="scope">
            <el-button type="primary" size="small" @click="playVideo(scope.row)">点击播放</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="stat-picture">
      <h2>图片浏览数 TOP10</h2>
      <el-table
        :data="tableDataPicture"
        border>
        <el-table-column
          type="index"
          label="排名"
          width="65">
        </el-table-column>
        <el-table-column
          label="缩略图"
          width="138">
          <template scope="scope">
            <div class="avatar"
                 :style="{ backgroundImage: 'url(' + scope.row.thumbUrl + ')' }"
            ></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="viewCount"
          label="点击次数"
          width="120">
        </el-table-column>
        <el-table-column
          label="链接"
          width="120">
          <template scope="scope">
            <a :href="scope.row.url" target="_blank">点击打开</a>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <video-player v-model="showPlayPanel" :video="currentVideo" v-if="showPlayPanel"></video-player>
  </div>
</template>

<script>
import dataService from 'services/dataService'
import videoPlayer from 'components/videoPlayer'
export default {
  components: { videoPlayer },
  data () {
    return {
      tableDataUser: [],
      tableDataMovie: [],
      tableDataVideo: [],
      tableDataPicture: [],

      currentVideo: {},
      showPlayPanel: false
    }
  },
  computed: {
  },
  methods: {
    playVideo (video) {
      this.currentVideo = video
      this.showPlayPanel = true
    }
  },
  created () {
    Promise.all([
      dataService.getHotUsers(),
      dataService.getHotPictures(),
      dataService.getHotMovies(),
      dataService.getHotVideos()
    ]).then(results => {
      this.tableDataUser = results[0].body
      this.tableDataPicture = results[1].body
      this.tableDataMovie = results[2].body
      this.tableDataVideo = results[3].body
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/less" lang="less">
  .page-stat-heat {
    &>div {
      margin-bottom: 45px;
    }
    h2 {
      text-align: center;
    }
    .avatar {
      width: 45px;
      height: 45px;
      background: no-repeat center;
      background-size: cover;
      margin: 10px 0;
      border: 1px solid #eee;
      border-radius: 2px;
    }
    .dialog-play {
      text-align: center;
      .el-dialog {
        width: 750px;
        height: auto;
      }
      video {
        width: 640px;
      }
    }
  }
</style>
