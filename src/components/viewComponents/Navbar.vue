<template>
  <nav class="navbar-outer">
    <ul class="nav-link-list">
      <router-link tag="li" v-for="(o,i) in nav_list" :key="i" :to="o.link" active-class="active">
        <i :class="o.icon"></i>
        <br />
        {{o.name}}
      </router-link>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data () {
    return {
      nav_list: [{
        name: '消息',
        icon: 'el-icon-chat-dot-round',
        link: '/info',
        isActive: true
      },
      {
        name: '好友圈',
        icon: 'el-icon-s-grid',
        link: '/list',
        isActive: false
      },
      // {
      //   name: '消息',
      //   icon: '',
      //   link: '/message'
      // },
      {
        name: '我的',
        icon: 'el-icon-s-custom',
        link: '/my',
        isActive: false
      }]
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.navbar-outer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.45rem;
  background-color: #fff;
}
.nav-link-list {
  display: flex;
  justify-content: center;
}
.nav-link-list li {
  flex-grow: 1;
  text-align: center;
}
.nav-link-list .active {
  color: var(--nav_active);
}
</style>