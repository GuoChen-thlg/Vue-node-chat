<template>
  <div class="outer">
    <Headtop :title="title" :isShowBack="false"></Headtop>
    <ul class="friendslist">
      <li v-for="(item,i ) in list" :key="i" @click="chat(item)" class="item">
        <div>
          <img src alt v-if="item.friendHead" />
          <el-avatar v-else icon="el-icon-user-solid" :size="40" />
          <p>{{item.friendName}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Headtop from '@/components/viewComponents/Headtop'
import Api from '@/api/axios'
export default {
  name: 'List',
  data () {
    return {
      title: '列表',
      list: []
    }
  },
  mounted () {
    // 请求好友列表
    this.getFriendslist()
  },
  methods: {
    /** 请求好友列表
     */
    getFriendslist () {
      Api({
        method: 'POST',
        url: '/api/getallfriend',
        data: {
          phone: this.$store.state.user.phone
        }
      }).then(data => {
        if(data.code==200) {
          this.list=data.data
        }
      })
    },
    chat (friend) {
      console.log(friend);
      this.$router.push({ name: 'chat',params: { firend: {...friend} } })
    }
  },

  components: { Headtop }
}
</script>

<style socped>
.friendslist .item {
  background-color: #fff;
  margin-bottom: 3px;
}
.friendslist .item div {
  display: flex;
  padding: 0.1rem;
  align-items: center;
}
.friendslist .item div p {
  padding-left: 0.2rem;
}
</style>