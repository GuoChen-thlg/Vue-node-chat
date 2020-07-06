<template>
  <div class="headtop-outer">
    <div class="but back" v-if="isShowBack" @click="()=>{$router.go(-1)}">
      <i class="el-icon-arrow-left"></i>
    </div>
    <p class="title">{{title}}</p>
    <div class="more-box">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Headtop',
  props: ['isShowBack','title']
}

</script>

<style scoped>
.headtop-outer {
  position: relative;
  height: 0.4rem;
  line-height: 0.4rem;
  background-color: var(--theme_color);
  text-align: center;
  color: #fff;
}
.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 0.3rem;
}
.more-box {
  position: absolute;
  top: 0;
  right: 0;
  width: 0.3rem;
}
</style>