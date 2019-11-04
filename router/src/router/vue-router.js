//声明路由类
// 由routes: [
//   { path: "/home", component: Home },
//   { path: "/about", component: About }
// ]
//转变为{"/home": Home, "/about": About} 方便后续
class Router {
  constructor(options) {
    this.mode = options.mode || "hash"; //mode
    this.routes = options.routes || []; //路由表
    this.routersMap = this.createMap(this.routes);
    console.log(this.routersMap);
  }
  //对原始路由表的处理
  createMap(r) {
    return r.reduce((acc, cur) => {
      acc[cur.path] = cur.component;
      return acc;
    }, {});
  }
}

//路由注入install方法，拿到vue实例
Router.install = function(Vue, options) {
  console.log(Vue, options);

  //注册两个组件
  Vue.component("router-link", () => {});
  Vue.component("router-view", () => {});
};
export default Router;
