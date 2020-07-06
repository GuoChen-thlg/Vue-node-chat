# Chat 

## 项目介绍

基于 Vue+Nodejs+socket.io 搭建的 web 聊天室项目，

目标 
- [x]  注册&登录
- [x]  一对一聊天
- [ ]  加好友
- [ ]  多对多聊天
- [ ]  删除好友
- [ ]  后台管理



## 技术栈

* 前端
    - Vue
    - Vuex
    - Vue-router
    - axios
    - element-ui
    - vue-socket.io


* 后端
    - Node.js
    - express
    - socket.io
    - mysql


## 本地部署

#### 创建数据库

数据库文件 

#### 修改端口号

在 app.js 中修改
```js
const port = process.env.PORT || 3001;
```



在 main.js 中修改
```js
 new VueSocketIO({
    // debug: true,
    connection: "http://localhost:3001"
  })
```