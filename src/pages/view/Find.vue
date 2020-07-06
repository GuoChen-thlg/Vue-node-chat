<template>
  <div class="outer">
    <Headtop :title="title" :isShowBack="true" />
    <div class="find-box">
      <el-input type="text" v-model="input.val"></el-input>
      <el-button type="success" @click="find()">Find</el-button>
    </div>
    <ul>
      <li v-for="(item,i) in dataList" :key="i">
        {{item.user_name}}
        <el-button type="success" @click="addfriend(item.user_phone)">add</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
import Headtop from '@/components/viewComponents/Headtop'
import Api from '@/api/axios'
export default {
  name: 'Find',
  data () {
    return {
      title: '发现',
      input: {
        val: ''
      },
      dataList: []
    }
  },
  methods: {
    find () {
      Api({
        url: '/api/findfriend',
        method: 'POST',
        data: {
          keyword: this.input.val
        }
      }).then(data => {
        if(data.code=200) {
          this.dataList=data.data
        }
      })
    },
    addfriend (phone) {
      Api({
        url: '/api/addfriend',
        method: 'POST',
        data: {
          friend_phone: phone,
          user_phone: this.$store.state.user.phone
        }
      }).then(data => {
        if(data.code=200) {
          console.log('成功');
        }
      })
    }
  },
  components: {
    Headtop
  }
}
</script>

<style socprd>
.find-box {
  display: flex;
}
</style>