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
    console.log();
    let data = {};
    const route = this.$route,
      router = this.$router;
    const { mode } = router,
      href = mode === "hash" ? `#${this.to}` : this.to,
      on = {
        click: e => {
          if (this.to === route.path) {
            e.preventDefault();
            return;
          }
          mode === "hash"
            ? (location.hash = this.to)
            : history.pushState(
                {
                  path: this.to
                },
                null,
                this.to
              );
        }
      };
    if (this.tag === "a") {
      data["on"] = on;
      data["attrs"] = { href };
    } else {
      data["on"] = on;
    }
    return h(this.tag, data, this.$slots.default);
    // };
  }
};
