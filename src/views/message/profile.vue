<!-- 
 * @author 曹宏涛<caohongtao@qianhaikeji.cn> 
-->
<template>
  <div class="message-profile-page">
    <back-to-list></back-to-list>
    <el-form ref="form" :model="profile" label-width="100px">
      <el-form-item label="缩略图">
        <div class="thumb">
          <file-upload :preview-url="profile.thumbUrl" @uploaded="thumbnailUploaded"></file-upload>
        </div>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="profile.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="profile.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit" size="large">确认</el-button>
        <el-button v-if="currentMode==='modify'" type="primary" @click="sendDialogVisible=true" size="large">发送</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="发送消息" v-model="sendDialogVisible">
      <el-table :data="users" v-loading="loading" @selection-change="tableSelectionChanged" fit stripe border class="list-table">
        <el-table-column type="selection" fixed="left" width="50"></el-table-column>
        <el-table-column prop="id" label="编号" min-width="100"></el-table-column>
        <el-table-column prop="username" label="用户名" min-width="100"></el-table-column>
        <el-table-column prop="phone" label="手机号" min-width="150"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="200"></el-table-column>
      </el-table>
      <pagination ref="pagination" :fetch-data="fetchUsers" @fetched="usersFetched"></pagination>
      <div class="send-buttons">
        <el-button type="primary" @click="sendToAll">发送所有人</el-button>
        <el-button type="primary" @click="sentToSelected">发送选中用户</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import fileUpload from 'components/fileUpload'
import backToList from 'components/backToList'
import pagination from 'components/pagination'
import dataService from 'services/dataService'

export default {
  components: {
    backToList,
    fileUpload,
    pagination
  },
  data () {
    return {
      profile: Object.assign({}, this.$store.getters.message),

      sendDialogVisible: false,
      users: []
    }
  },
  computed: {
    ...mapGetters({
      currentMode: 'currentMode'
    })
  },
  methods: {
    ...mapActions([
      'updateMessage',
      'addMessage'
    ]),
    ...mapMutations({
      viewProfile: 'GO_TO_PROFILE'
    }),
    thumbnailUploaded (file) {
      this.profile.thumbUrl = file.url
    },
    submit: function () {
      if (this.currentMode === 'add') {
        this.addMessage({profile: this.profile, callback: () => this.viewProfile({mode: 'modify'})})
      } else {
        this.updateMessage(this.profile)
      }
    },

    fetchUsers: function (pageParams) {
      this.loading = true
      return dataService.getUserList(pageParams)
    },
    usersFetched: function (users) {
      this.users = users
      this.loading = false
    },
    tableSelectionChanged: function (val) {
      this.multipleSelection = val
    },
    sendToAll: function () {
      dataService.addMessageToAllUser(this.profile.id).then(res => {
        this.$notify({
          title: '成功',
          message: '发送成功',
          type: 'success'
        })
      })
    },
    sentToSelected: function () {
      let users = []
      for (let user of this.multipleSelection) {
        users.push(user.id)
      }
      dataService.addMessageToUserList(this.profile.id, users).then(res => {
        this.$notify({
          title: '成功',
          message: '发送成功',
          type: 'success'
        })
      })
    }
  },
  watch: {
    '$store.getters.message': function () {
      this.profile = Object.assign({}, this.$store.getters.message)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form {
  min-width: 600px;
  max-width: 800px;
  margin-top: 20px;
}
.thumb {
  width: 150px;
  height: 150px;
}
.send-buttons {
  margin-top: 25px;
  text-align: center;
}
.send-buttons .el-button {
  text-align: center;
  width: 120px;
}
</style>