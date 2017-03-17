<!--
 * @author zhangle<3230877975@qq.com>
-->
<template>
  <div>
    <h2>基础功能</h2>
    <label>用户审核功能</label>
    <el-switch
      v-model="settings.userCheck"
      on-color="#13ce66"
      off-color="#ff4949"
      on-text="开"
      off-text="关"
      @change="updateSettings">
    </el-switch>
  </div>
</template>

<script>
import dataService from 'services/dataService'
export default {
  components: {
  },
  data () {
    return {
      settings: {}
    }
  },
  computed: {
  },
  methods: {
    updateSettings: function (flag) {
      dataService.updateSystemSettingsUserCheck(flag).then(settings => {
        this.$notify({
          title: '成功',
          message: '修改设置成功',
          type: 'success'
        })
      })
    },
    getSettings: function () {
      dataService.getSystemSettings().then(settings => {
        this.settings = settings.body
      })
    }
  },
  mounted: function () {
    this.getSettings()
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
