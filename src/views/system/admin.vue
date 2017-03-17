<!--
 * @author zhangle<3230877975@qq.com>
-->
<template>
  <div>
    <h2>管理员</h2>
    <h3>管理员密码修改</h3>
    <el-form ref="form" :model="form" label-width="100px" class="form">

      <el-form-item label="旧密码">
        <el-input v-model="oldPassword" placeholder="旧密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="newPassword" placeholder="新密码" type="password"></el-input>
      </el-form-item>
      <el-form-item label="重输新密码">
        <el-input v-model="newPasswordRepeat" placeholder="再次输入新密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :disabled="!passwordConfirmed">提交</el-button>
      </el-form-item>
      <el-form-item>
        <el-alert v-if="!passwordConfirmed" :closable="false" type="error" title="两次输入的密码不一致，请检查后再试"></el-alert>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import dataService from 'services/dataService'
export default {
  components: {
  },
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      newPasswordRepeat: ''
    }
  },
  computed: {
    passwordConfirmed: function () {
      return this.newPassword === this.newPasswordRepeat
    }
  },
  methods: {
    onSubmit () {
      dataService.updateAdminPassword({oldPassword: this.oldPassword, newPassword: this.newPassword}).then(data => {
        this.$notify({
          title: '成功',
          message: '密码修改成功',
          type: 'success'
        })
        this.oldPassword = this.newPassword = this.newPasswordRepeat = ''
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form{
  width:500px
}
</style>
