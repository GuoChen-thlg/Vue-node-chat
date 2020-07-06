// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueSocketIO from "vue-socket.io";
import store from './store'
Vue.use(
  new VueSocketIO({
    // debug: true,
    connection: "http://localhost:3001"
  })
);
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>",
});
