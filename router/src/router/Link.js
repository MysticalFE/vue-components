export default {
  name: "RouterLink",
  props: {
    to: {
      type: String || Object,
      required: true
    },
    tag: {
      type: String,
      default: "a"
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: String || Object,
      default: "click"
    }
  },
  render(h) {
    console.log(this.event, "---------");
    let data = {};
    const on = { click: guardEvent };
    const route = this.$route,
      router = this.$router;
    const { mode } = router;
    console.log(route);
    // const handler = e => {
    //   if(guardEvent(e)) {
    //     this.replace ? router.replace()
    //   }

    // };
    // if (Array.isArray(this.event)) {
    //   this.event.forEach(e => {
    //     on[e] = handler;
    //   });
    // } else {
    //   on[this.event] = handler;
    // }
    if (this.tag === "a") {
      data["on"] = on;
      data["attrs"] = {
        href: mode === "hash" ? `#${this.to}` : this.to
      };
    } else {
      data["on"] = on;
    }
    return h(this.tag, data, this.$slots.default);
    // };
  }
};

/**
 *对在link上的事件进行拦截处理
 * @param {*} e
 * @returns
 */
function guardEvent(e) {
  // don't redirect with control keys 键盘事件
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) return;
  // don't redirect when preventDefault called
  if (e.defaultPrevented) return;
  // don't redirect on right click 区分是否是鼠标右键
  if (e.button !== undefined && e.button !== 0) return;
  // don't redirect if `target="_blank"` 如果有`target="_blank"`属性，并且有事件，则事件不执行
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target)) return;
  }
  // this may be a Weex event which doesn't have this method 阻止事件默认行为，一般指a标签
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true;
}
