<template>
  <div class="back-outer">
    <el-container>
      <el-aside>
        <el-col>
          <el-menu
            default-active="1-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>用户中心</span>
              </template>
              <el-menu-item-group>
                <template slot="title">总览</template>
                <el-menu-item index="1-1">全部用户</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-s-tools"></i>
              <span slot="title">设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header></el-header>
        <el-main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Admin',
  data () {
    return {
    }
  },
  methods: {
    handleOpen (key,keyPath) {
      console.log(key,keyPath);
    },
    handleClose (key,keyPath) {
      console.log(key,keyPath);
    }
  }
}
</script>

<style scoped>
ul[role='menubar'] {
  height: 100vh;
}
</style>