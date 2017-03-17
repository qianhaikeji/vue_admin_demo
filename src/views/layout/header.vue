<template>
  <div class="zy-header">
    <div class="title"><router-link :to="'/'">架势影聚管理后台</router-link></div>
    <div class="auth" v-show="auth.logined">
      <span @click="view" class="account">欢迎，{{auth.profile.username}}</span>
      <span @click="doLogout" class="logout">退出</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'header',
  computed: {
    ...mapGetters({
      auth: 'auth'
    })
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    view () {
      this.$router.push({path: '/profile'})
    },
    doLogout () {
      this.logout(() => this.$router.push({name: 'login'}))
    }
  }
}
</script>

<style scoped>
.zy-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: #324057;
  z-index: 100;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 2px solid #1f2f3d;
}

.zy-header .title {
  text-align: left;
  line-height: 40px;
  float: left;
}

.zy-header .title a {
  color: white;
  font-size: 18px;
}

.zy-header .auth {
  float: right;
  color: white;
  line-height: 40px;
  cursor: pointer;
}

.zy-header .auth .account {
  font-size: 16px;
  margin-right: 20px;
}

.zy-header .auth .logout {
  font-size: 13px;
}
</style>