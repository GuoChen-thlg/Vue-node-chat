<template>
  <div class="outer">
    <Headtop :title="title" />
    <div class="login_box">
      <el-input
        type="text"
        v-model="phone.val"
        maxlength="11"
        placeholder="请输入手机号"
        @input="phoneTest"
      />
      <el-alert
        v-show="!phone.test"
        title="手机号格式不正确"
        type="error"
        :closable="false"
        center
        show-icon
      />
      <el-input type="password" v-model="password.val" placeholder="请输入密码" :show-password="true"></el-input>
      <el-alert
        v-show="!password.text"
        title="账号或密码不正确"
        type="error"
        :closable="false"
        center
        show-icon
      />
      <el-button type="success" @click="login()">登录</el-button>
    </div>
  </div>
</template>

<script>
import Headtop from '@/components/viewComponents/Headtop'
import Api from '@/api/axios'
export default {
  name: 'Login',
  data () {
    return {
      title: '登录',
      phone: {
        val: this.$route.params.phone||'',
        test: true,
      },
      password: {
        val: null,
        text: true,
      },
    }
  },
  methods: {
    phoneTest () {
      if(/^1[3456789]\d{9}$/.test(this.phone.val)) {
        this.phone.test=true
      } else {
        this.phone.test=false
      }
    },
    /** 登录
     */
    login () {
      this.phoneTest()
      if(this.phone.test&&this.password.val.length>=6) {
        // 登录查询
        Api({
          method: 'POST',
          url: '/api/login',
          data: {
            phone: this.phone.val,
            password: this.password.val
          }
        }).then((data => {
          if(data.code==200) {
            console.log(data);

            this.$store.commit('setUser',{ phone: data.user.phone,isLogin: true,name:data.user.name,head:data.user.head })
            this.$router.push({ name: 'info' })
          } else {
            this.password.text=false
            console.error(data.hint);
          }
        }))
      }
    }
  },
  components: {
    Headtop
  }
}
</script>

<style socped>
.login_box {
  width: 80%;
  margin: 50% auto 0;
  text-align: center;
}
</style>