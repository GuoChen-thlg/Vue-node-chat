import Vue from "vue";
import Router from "vue-router";
import Index from "@/pages/view/Index";
import Login from "@/pages/view/Login";
import Register from "@/pages/view/Register";
import Info from "@/pages/view/Info";
import List from "@/pages/view/List";
import My from "@/pages/view/My";
import Chat from "@/pages/view/Chat";
import Find from "@/pages/view/Find";
import Admin from "@/pages/back/Admin";

Vue.use(Router);
import store from "@/store";
const router = new Router({
  routes: [
    {
      path: "/",
      component: Index,
      meta: {
        isShowNav: false,
        isConnect: false,
        isLogin: false
      }
    },
    {
      path: "/index",
      name: "index",
      component: Index,
      meta: {
        isShowNav: false,
        isConnect: false,
        isLogin: false
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        isShowNav: false,
        isConnect: true,
        isLogin: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        isShowNav: false,
        isConnect: false,
        isLogin: false
      }
    },
    {
      path: "/info",
      name: "info",
      component: Info,
      meta: {
        isShowNav: true,
        isConnect: true,
        isLogin: true
      }
    },
    {
      path: "/list",
      name: "list",
      component: List,
      meta: {
        isShowNav: true,
        isConnect: true,
        isLogin: true
      }
    },
    {
      path: "/my",
      name: "my",
      component: My,
      meta: {
        isShowNav: true,
        isConnect: true,
        isLogin: true
      }
    },
    {
      path: "/chat",
      name: "chat",
      component: Chat,
      meta: {
        isShowNav: false,
        isConnect: true,
        isLogin: true
      }
    },
    {
      path: "/find",
      name: "find",
      component: Find,
      meta: {
        isShowNav: false,
        isConnect: true,
        isLogin: true
      }
    },

    {
      path: "/admin",
      name: "admin",
      component: Admin,
      meta: {
        isShowNav: false,
        isConnect: false,
        isLogin: false
      }
    }
  ]
});
router.beforeEach((to, from, next) => {
  console.log(to.meta.isLogin && store.state.user.isLogin);
  if (to.meta.isLogin&&!store.state.user.isLogin) {
    localStorage.setItem("fullPath", to.fullPath);
    next("/login");
  } else {
    next();
  }
});

export default router;
