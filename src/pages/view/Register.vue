<template>
  <div class="outer">
    <Headtop :title="title" />
    <div class="info">
      <el-input
        type="text"
        v-model="phone.val"
        maxlength="11"
        placeholder="请输入手机号"
        @input="phoneTest"
      ></el-input>
      <el-alert
        v-show="!phone.test"
        title="手机号格式不正确"
        type="error"
        :closable="false"
        center
        show-icon
      />
      <div class="code_box">
        <el-input
          type="text"
          maxlength="6"
          v-model="code.val"
          placeholder="请输入验证码"
          @input="codeTest()"
        ></el-input>
        <el-button type="success" @click="getCode()" :disabled="!code.is_no">{{code.code_txt}}</el-button>
      </div>
      <el-alert v-show="!code.test" title="验证码不正确" type="error" :closable="false" center show-icon />
      <el-input
        type="password"
        v-model="password.first_passwore"
        placeholder="请输入密码"
        :show-password="true"
        @input="pwd_test"
      ></el-input>
      <el-alert
        v-show="!password.first_text"
        title="密码格式不正确(不少于6位不超过16位)"
        type="error"
        :closable="false"
        center
        show-icon
      />
      <el-input
        type="password"
        v-model="password.last_password"
        placeholder="请再次输入密码"
        :show-password="true"
        @input="last_pwd_test()"
      ></el-input>
      <el-alert
        v-show="!password.last_text"
        title="与第一次的密码不同"
        type="error"
        :closable="false"
        center
        show-icon
      />
      <el-button type="success" @click="register()">注册</el-button>
      <p class="auth_code">{{auth_code_note}}</p>
    </div>
  </div>
</template>

<script>
import Headtop from '@/components/viewComponents/Headtop'
import Api from '@/api/axios'
export default {
  name: 'Register',
  data () {
    return {
      title: '注册',
      code_: '',
      phone: {
        val: null,
        test: true,
      },
      code: {
        val: null,
        code_txt: '接收验证码',
        is_no: false,
        test: true
      },
      password: {
        first_passwore: null,
        first_text: true,
        last_password: null,
        last_text: true,
      },
      auth_code_note: ''
    }
  },
  methods: {
    getRandom (n,m) { return Math.floor(Math.random()*(m-n+1)+n) },
    getCode () {
      let ss=60,code=this.getRandom(111111,999999)
      this.code_=code
      const times=setInterval(() => {
        this.code.is_no=false
        ss-=1
        this.code.code_txt=ss
        if(ss==55||ss==52||ss==49||ss==47) {
          this.auth_code_note='请接收验证码'
        }
        if(ss==54||ss==51||ss==48||ss==46) {
          this.auth_code_note=null
        }
        if(ss==45) {
          this.auth_code_note=code
        }
        if(ss==0) {
          this.code.is_no=true
          code=null
          this.auth_code_note=null
          this.code.code_txt='接收验证码'
          clearInterval(times)
        }
      },1000)
    },
    phoneTest () {
      if(/^1[3456789]\d{9}$/.test(this.phone.val)) {
        this.phone.test=true
        this.code.is_no=true
      } else {
        this.phone.test=false
        this.code.is_no=false
      }
    },
    codeTest () {
      if(this.code_==this.code.val) {
        this.code.test=true
      } else {
        this.code.test=false
      }
    },
    pwd_test () {
      if(/^[\w_-]{6,16}$/.test(this.password.first_passwore)) {
        this.password.first_text=true
      } else {
        this.password.first_text=false
      }
    },
    last_pwd_test () {
      if(this.password.first_passwore==this.password.last_password) {
        this.password.last_text=true
      } else {
        this.password.last_text=false
      }
    },
    /** 注册
     */
    register () {      this.$router.push({ name: 'login',params: { phone: this.phone.val } })
      // this.phoneTest()
      // this.codeTest()
      // this.pwd_test()
      // this.last_pwd_test()

      // if(this.phone.test&&this.code.test&&this.password.first_text&&this.password.last_text) {
      //   // 注册请求
      //   Api({
      //     method: 'POST',
      //     url: '/api/register',
      //     data: {
      //       phone: this.phone.val,
      //       password: this.password.first_passwore
      //     }
      //   }).then((data => {
      //     if(data.code==200) {
      //       this.$router.push({ name: 'login',params: { phone: this.phone.val } })
      //     } else {
      //       console.error(data.hint);
      //     }
      //   }))
      // }
    }
  },
  components: {
    Headtop
  }
}
</script>

<style scoped>
.info {
  margin-top: 60%;
  padding: 0 0.4rem;
  text-align: center;
}
.code_box {
  display: flex;
  justify-content: space-between;
}
.auth_code {
  text-align: center;
  margin-top: 20%;
}
</style>