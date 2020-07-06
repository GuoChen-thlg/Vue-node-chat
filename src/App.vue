<template>
  <div id="app">
    <router-view />
    <Navbar v-show="!isShowNav" />
  </div>
</template>

<script>
import Navbar from '@/components/viewComponents/Navbar'
export default {
  name: 'App',
  data () {
    return {
      isShowNav: true,
    }
  },
  methods: {
    inform (friend) {
      this.$message(friend+'来消息了');
    }
  },
  created () {
    this.isShowNav=!this.$route.meta.isShowNav
  },
  computed: {
    isLogin () {
      return this.$store.state.user.isLogin
    }
  },
  watch: {
    '$route': function(to,from) {
      this.isShowNav=!to.meta.isShowNav
    },
    isLogin (val) {
      if(''!==this.$store.state.user.phone) {
        this.$socket.emit('login',{
          phone: this.$store.state.user.phone
        })
      }
    }
  },
  components: {
    Navbar
  },
  sockets: {
    connect () {
      console.log('连接成功');
    },
    receiv (data) {
      this.$store.commit('setInfoSet',data)
      if(!this.$route.params.firend) {
        this.inform(data.sender)
        return;
      }
      if(!this.$route.params.firend.friendPhone==data.sender) {
        this.inform(data.sender)
      }
    },
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
:root {
  --nav_active: #67c23a;
  --theme_color: #67c23a;
}
html {
  font-size: calc(100vw / 3.75);
}
ul,
ol,
li {
  list-style: none;
}
a {
  text-decoration: none;
}
body {
  font-size: 0.16rem;
}
.outer {
  min-height: 100vh;
  padding-bottom: 0.4rem;
  background-color: #f4f4f4;
}
.back-outer {
  font-size: 16px;
}
</style>
