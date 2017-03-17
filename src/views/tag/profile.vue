<!--
 * @author zl<3230877975@qq.com>
-->
<template>
  <div>
    <back-to-list></back-to-list>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="分类名称">
        <el-input v-model="profile.name"></el-input>
      </el-form-item>

      <el-form-item label="是否置顶">
        <el-checkbox v-model="profile.recommend"></el-checkbox>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit" size="large">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import dataService from 'services/dataService'
import zySelect from 'components/zySelect'
import backToList from 'components/backToList'

export default {
  components: {
    zySelect,
    backToList
  },
  data () {
    return {
      profile: Object.assign({}, this.$store.state.tag.profile)
    }
  },
  computed: {
    ...mapGetters({
      currentMode: 'currentMode'
    })
  },
  methods: {
    ...mapActions([
      'addTag',
      'updateTag'
    ]),
    submit: function () {
      if (this.currentMode === 'add') {
        this.addTag(this.profile)
      } else {
        this.updateTag(this.profile)
      }
    }
  },
  created: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-form {
  margin-top: 20px;
}
</style>
