<!--
 * @author zl<3230877975@qq.com>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
