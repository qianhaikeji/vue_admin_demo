<!--
 * 主页
 *
 * @date     2016-12-04
 * @author   曹宏涛<caohongtao@qianhaikeji.cn>
-->
<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <img src="~assets/logo.png">
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      form: {username: '', password: ''}
    }
  },
  computed: {
    ...mapGetters({
      auth: 'auth'
    })
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    doLogin () {
      this.login({
        username: this.form.username,
        password: this.form.password,
        callback: () => this.$router.push({path: '/'})
      })
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form img {
  width: 80px;
}

.el-form {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  width: 300px;
  height: 400px;
}

.el-button {
  width: 100%;
}
</style>
