<template>
<div>
  <back-to-list></back-to-list>
  <el-form ref="form" label-width="80px" class="banner-file-form">
    <el-form-item label="关键字">
      <el-input v-model="profile.k" :disabled="true"></el-input>
    </el-form-item>

    <el-form-item label="图片">
      <el-upload
        :action="uploadURL"
        type="drag"
        :thumbnail-mode="true"
        :on-remove="handleRemove"
        :on-preview="handlePreview"
        :on-success="handleUploadSuccess"
        :default-file-list="fileList"
      >
        <i class="el-icon-upload"></i>
        <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" size="large" @click="submitBanner">确认</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import backToList from 'components/backToList'
import zyRichEditor from 'components/zyRichEditor'
import config from 'config'

export default {
  props: ['data'],
  components: {
    backToList,
    zyRichEditor
  },
  data () {
    return {
      uploadURL: config.server + '/upload/image',
      profile: {}
    }
  },
  computed: {
    ...mapGetters({
      banner: 'banner'
    })
  },
  methods: {
    ...mapActions([
      'updateBanner'
    ]),
    submitBanner () {
      this.updateBanner(this.profile)
    },
    handlePreview (file) {
      window.open(file.url)
    },
    handleRemove (file) {
      this.profile.url = ''
    },
    handleUploadSuccess (file) {
      this.profile.url = file.url
    }
  },
  mounted () {
    this.profile = Object.assign({}, this.banner)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner-file-form {
  margin-top:20px;
  width: 60%;
}
</style>
