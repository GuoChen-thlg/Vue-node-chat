<template>
  <div class="outer">
    <h1>{{title}}</h1>
    <div class="login_box">
      <el-button type="success" size="medium " @click="$router.push('/register')">注册</el-button>
      <el-button type="success" size="medium " @click="$router.push('/login')">登录</el-button>
    </div>
  </div>
</template>

<script>
import Headtop from '@/components/viewComponents/Headtop'
export default {
  name: 'Index',
  data () {
    return {
      title: 'Chat',
    }
  },
}
</script>

<style scoped>
.outer {
  background: url('../../assets/back_index.jpg') 50% 50%;
  background-size: 100%;
}
h1 {
  padding-top: 30%;
  font-size: 0.22rem;
  text-align: center;
  z-index: 1;
  color: aliceblue;
}
.login_box {
  position: absolute;
  bottom: 6%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
}
</style>