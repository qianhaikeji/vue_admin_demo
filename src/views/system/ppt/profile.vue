<!--
 * @author zhangle<3230877975@qq.com>
-->
<template>
  <div>
    <back-to-list></back-to-list>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="profile.title"></el-input>
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
      <!--
      <el-form-item label="排序">
        <el-input-number v-model="profile.rank"></el-input-number>
      </el-form-item>
      -->
      <el-form-item>
        <el-button type="primary" @click="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import dataService from 'services/dataService'
import zySelect from 'components/zySelect'
import backToList from 'components/backToList'
import config from 'config'

export default {
  components: {
    zySelect,
    backToList
  },
  data () {
    console.log(this)
    return {
      profile: Object.assign({}, this.$store.state.ppt.profile),
      uploadURL: config.server + '/upload/image',
      fileList: [{url: this.$store.state.ppt.profile.url}]
    }
  },
  computed: {
    ...mapGetters({
      currentMode: 'currentMode'
    })
  },
  methods: {
    ...mapActions([
      'addPPT',
      'updatePPT'
    ]),
    submit () {
      if (this.currentMode === 'add') {
        this.addPPT(this.profile)
      } else {
        this.updatePPT(this.profile)
      }
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
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form {
  margin-top: 20px;
  width: 250px;
}

</style>
