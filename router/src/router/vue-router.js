//声明路由类
// 由routes: [
//   { path: "/home", component: Home },
//   { path: "/about", component: About }
// ]
//转变为{"/home": Home, "/about": About} 方便后续

class HistoryRoute {
  constructor() {
    this.path = null;
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
      // const hashPath = location.hash.slice(1);
      // this.addEvent("load", location.hash.slice(1));
      // this.addEvent("hashchange", location.hash.slice(1));
      window.addEventListener("load", () => {
        this.history.path = location.hash.slice(1);
      });
      window.addEventListener("hashchange", () => {
        this.history.path = location.hash.slice(1);
      });
    } else {
      // let historyPath = location.pathname;
      if (!location.pathname) location.pathname = "/";
      // this.addEvent("load", location.pathname);
      // this.addEvent("popstate", location.pathname);
      window.addEventListener("load", () => {
        this.history.path = location.pathname;
      });
      window.addEventListener("hashchange", () => {
        this.history.path = location.pathname;
      });
    }
  }
  //路由事件注册
  addEvent(type, path) {
    window.addEventListener(type, () => {
      this.history.path = path;
      console.log(location.hash.slice(1));
    });
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
Router.install = function(Vue, options) {
  console.log(Vue, options);
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
  Vue.component("router-link", {
    functional: true,
    props: {
      to: String,
      tag: String
    },
    render(createElement, context) {
      console.log(context, "-----");
      const to = context.props.to,
        mode = context.parent._root._router.mode;
      const href = mode === "hash" ? `#${to}` : to;
      const tag = context.tag ? context.tag : "a";
      return createElement(
        tag,
        {
          attrs: {
            href
          }
        },
        context.children
      );
    }
  });
  Vue.component("router-view", {
    render(createElement) {
      console.log(this);
      const path = this._self._root._router.history.path;
      const currentComponent = this._self._root._router.routersMap[path];
      console.log(path);
      return createElement(currentComponent);
    }
  });
};
export default Router;
