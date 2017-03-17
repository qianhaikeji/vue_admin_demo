<!-- 
 * @author miracle_dan<denghan@qianhaikeji.cn> 
-->
<template>
  <div>
    <keep-alive>
      <list v-if="showList"></list>
    </keep-alive>
    <profile v-if="!showList"></profile>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import list from './list'
import profile from './profile'
export default {
  computed: {
    ...mapGetters({
      showList: 'isListMode'
    })
  },
  components: {
    list,
    profile
  },
  methods: {
    ...mapMutations({
      initListProfile: 'INIT_LIST_AND_PROFILE'
    })
  },
  mounted () {
    this.initListProfile()
  }
}
</script>

<style scoped>
</style>
