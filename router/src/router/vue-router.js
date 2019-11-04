//声明路由类
// 由routes: [
//   { path: "/home", component: Home },
//   { path: "/about", component: About }
// ]
//转变为{"/home": Home, "/about": About} 方便后续

class HistoryRoute {
  constructor() {
    this.current = null;
  }
}
class Router {
  constructor(options) {
    this.mode = options.mode || "hash"; //mode
    this.routes = options.routes || []; //路由表
    this.routersMap = this.createMap(this.routes);
    console.log(this.routersMap);
    this.history = new HistoryRoute();
    this.init();
  }
  //页面路由初始化操作
  init() {
    //首先判断路由模式
    if (this.mode === "hash") {
      if (!location.hash) location.hash = "/";
      const hashPath = location.hash.slice(1);
      this.addEvent("load", hashPath);
      this.addEvent("hashchange", hashPath);
    } else {
      let historyPath = location.pathname;
      if (!historyPath) historyPath = "/";
      this.addEvent("load", historyPath);
      this.addEvent("popstate", historyPath);
    }
  }
  //路由事件注册
  addEvent(type, path) {
    window.addEventListener(type, () => {
      this.history.current = path;
    });
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
