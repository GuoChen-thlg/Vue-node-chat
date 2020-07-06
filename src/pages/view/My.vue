<template>
  <div class="outer">
    <Headtop :title="title" :isShowBack="false" />
    <div class="user-info">
      <div class="left">
        <p class="uesr-name">{{this.$store.state.user.name}}</p>
      </div>
      <div class="uesr-head">
        <img :src="userinfo.head" alt v-if="userinfo.head" />
        <el-avatar v-else icon="el-icon-user-solid" :size="60" />
      </div>
    </div>
    <div class="list-box">
      <div class="list-item" v-for=" (item,i) in list" :key="i">
        <router-link tag="div" to>
          <span>{{item.title}}</span>
          <i class="el-icon-arrow-right" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Headtop from '@/components/viewComponents/Headtop'
export default {
  name: 'My',
  data () {
    return {
      title: '个人中心',
      userinfo: {
        head: ''
      },
      list: [
        {
          toPath: 'setting',
          title: '设置'
        },
      ]
    }
  },
  mounted(){
    console.log(this.$store.state.user);
    
  },
  components: { Headtop }
}
</script>

<style scoped>
.user-info {
  display: flex;
  padding: 0.2rem 0;
  background-color: #fff;
  margin-bottom: 0.2rem;
}
.left {
  flex-grow: 1;
  padding: 0 .2rem;
}
.uesr-head {
  padding: 0 0.2rem;
}
.uesr-head span {
  font-size: 0.3rem;
}
.uesr-name {
  /* text-align: right; */
}
.list-item {
  padding: 0.2rem;
  background-color: #fff;
  margin-bottom: 1px;
}
.list-item div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>