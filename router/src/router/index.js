import Vue from "vue";
import Router from "./vue-router";

Vue.use(Router, { a: 1 });

import Home from "../components/Home.vue";
import About from "../components/About.vue";
const router = new Router({
  mode: "hash",
  routes: [
    { path: "/home", component: Home },
    { path: "/about", component: About }
  ]
});
export default router;

//mode => hash/history
//两个基本组件 router-link, router-view
//一个路由实例对象 $router; 一个当前激活路由对象 $route;
//vue.use install方法注入
