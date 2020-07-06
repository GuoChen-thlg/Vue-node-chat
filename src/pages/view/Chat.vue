<template>
  <div class="outer">
    <Headtop :isShowBack="true" :title="title" />
    <div class="message-box" id="message-box">
      <ul class="message-list">
        <li v-for="(item,index) in infoList" :key="index">
          <Message :isSelf="item.isSelf" :message="item.info" />
        </li>
      </ul>
    </div>
    <div class="edit-info-box">
      <el-input type="text" v-model="info.val"></el-input>
      <el-button type="success" @click="emit()">发送</el-button>
    </div>
  </div>
</template>
<script>
import Headtop from '@/components/viewComponents/Headtop'
import Message from '@/components/viewComponents/Message'
export default {
  name: 'Chat',
  data () {
    return {
      info: {
        val: '',
        sender: '',
        receiver: ''
      },
      title: '',
      infoList: [],
    }
  },
  mounted () {
    if(!this.$route.params.firend) {
      this.$router.push({ name: 'list' })
    }
    this.info.sender=this.$store.state.user.phone
    this.info.receiver=this.$route.params.firend.friendPhone
    this.title=this.$route.params.firend.friendName
    this.infoList=this.$store.getters.getInfoSet[this.$route.params.firend.friendPhone]

  },
  updated () {
    var div=document.getElementById('message-box');
    div.scrollTop=div.scrollHeight;
  },
  beforeDestroy () {
  },
  methods: {
    emit () {
      if(''!==this.info.val) {
        this.$socket.emit('send',{
          info: this.info.val,
          sender: this.info.sender,
          receiver: this.info.receiver,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString()
        })
        this.$store.commit('setInfoSet',{
          info: this.info.val,
          receiver: this.info.sender,
          sender: this.info.receiver,
          isSelf: true
        })
      }
      this.info.val=''
    }
  },
  components: {
    Headtop,
    Message
  },
  watch: {

  }
}
</script>

<style scoped>
.outer {
  padding-bottom: 0;
}
.message-box {
  height: calc(100vh - 0.73rem);
  overflow-y: auto;
  /* background-image: url('../../assets/back_index.jpg'); */
  background-color: #000;
  background-size: 100%;
}
.message-list li {
  margin: 0.05rem;
}
.edit-info-box {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}
</style>