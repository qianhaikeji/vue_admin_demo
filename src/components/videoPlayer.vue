<!-- 
 * @author Reson_a<80547665@qq.com> 
 * 视频弹窗组件 * 
-->
<template>
  <el-dialog :value="value" @input="valueChanged" class="play-panel" title="视频播放" size="small">
    <div class="play-panel-content">
      <iframe v-if="videoType==='url'" :src="video.url" height=498 width=640 frameborder=0 allowfullscreen></iframe>
      <div    v-if="videoType==='dom'" v-html="video.url" class="video-palyer"></div>
    <!--
      <iframe v-if="videoType==='qq'"    :src="videoQQSource" height=498 width=640 frameborder=0 allowfullscreen></iframe>
      <iframe v-if="videoType==='youku'" :src="videoYoukuSource" height=498 width=640 frameborder=0 allowfullscreen></iframe>
      <iframe v-if="videoType==='iqiyi'" :src="video.url" height=498 width=640 frameborder=0 allowfullscreen></iframe>
    -->
    </div>
  </el-dialog>
</template>
<script>
  import _ from 'lodash'
  export default {
    props: ['value', 'video'],
    computed: {
      videoType () {
        return _.startsWith(this.video.url, 'http') ? 'url' : 'dom'
      }
      // videoType () {
      //   if (/v.qq.com/.test(this.video.url)) {
      //     return 'qq'
      //   } else if (/v.youku.com/.test(this.video.url)) {
      //     return 'youku'
      //   } else if (/www.iqiyi.com/.test(this.video.url)) {
      //     return 'iqiyi'
      //   }
      // },
      // videoQQSource () {
      //   // https://v.qq.com/x/cover/23slhnan3qz2y6y.html    只能匹配到一个pattern
      //   let patterns = this.video.url.match(/v.qq.com\/x\/cover\/([\s\S]*)\/([\s\S]*).html/)
      //   return 'https://v.qq.com/iframe/player.html?vid=' + patterns[2] + '&tiny=0&auto=0'
      // },
      // videoYoukuSource () {
      //   let patterns = this.video.url.match(/v.youku.com\/v_show\/id_([\s\S]*).html/)
      //   return 'http://player.youku.com/embed/' + patterns[1]
      // }
    },
    methods: {
      valueChanged (newVal) {
        this.$emit('input', newVal)
      }
    }
  }
</script>
<style lang="less" scoped>
.play-panel-content {
  text-align: center;
  width: 100%;
  height: 498px;
  .video-palyer {
    width: 100%;
    height: 100%;
  }
}
.play-panel .el-dialog {
  max-width: 780px;
}
</style>
