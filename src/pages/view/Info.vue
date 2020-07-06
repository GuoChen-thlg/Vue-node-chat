<template>
  <div class="outer">
    <Headtop :title="title" :isShowBack="false">
      <router-link tag="div" to="/find">
        <i class="el-icon-search"></i>
      </router-link>
    </Headtop>
  </div>
</template>

<script>
import Headtop from '@/components/viewComponents/Headtop'
export default {
  name: 'Info',
  data () {
    return {
      title: '信息'
    }
  },
  components: {
    Headtop
  }
}
</script>

<style>
</style>