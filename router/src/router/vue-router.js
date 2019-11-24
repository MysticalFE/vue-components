//声明路由类
// 由routes: [
//   { path: "/home", component: Home },
//   { path: "/about", component: About }
// ]
//转变为{"/home": Home, "/about": About} 方便后续
import { HashHistory } from "./hash";
import { HTML5History } from "./history";
import Link from "./Link";
import View from "./View";
class Router {
  constructor(options) {
    this.mode = options.mode || "hash"; //mode
    this.routes = options.routes || []; //路由表
    this.options = options;
    this.history = Object.create(null);
    this.routersMap = this.createMap(this.routes);
    console.log(this.routersMap);
    // this.history = new HistoryRoute();
    this.init();
  }
  //页面路由初始化操作
  init() {
    //首先判断路由模式
    if (this.mode === "hash") {
      this.history = new HashHistory(this);
    } else {
      this.history = new HTML5History(this);
    }
  }
  //对原始路由表的处理
  createMap(r) {
    return r.reduce((acc, cur) => {
      acc[cur.path] = cur.component;
      return acc;
    }, {});
  }
  addRoutes() {}
  afterEach() {}
  back() {}
  beforeEach() {}
  beforeResolve() {}
  forward() {}
  go() {}
  match() {}
  onError() {}
  onReady() {}
  push() {}
  replace() {}
  resolve() {}
}

//路由注入install方法，拿到vue实例
Router.install = function(Vue) {
  // console.log(Vue, options);
  Vue.mixin({
    beforeCreate() {
      // console.log(3442432);
      // console.log(this.$options);
      if (this.$options && this.$options.router) {
        //判断是否是根实例
        this._root = this;
        this._router = this.$options.router;
        Vue.observable(this._router.history); //使当前history对象变为响应式对象
        // Vue.util.defineReactive(this, "xxx", this._router.history);
        console.log(this._root);
      } else {
        this._root = this.$parent._root;
      }
      Object.defineProperty(this, "$router", {
        get() {
          return this._root._router;
        },
        set() {}
      });
      Object.defineProperty(this, "$route", {
        get() {
          return {
            path: this._root._router.history.path
          };
        },
        set() {}
      });
    }
  });
  //注册两个组件
  Vue.component("router-link", Link);
  Vue.component("router-view", View);
};
export default Router;
