import Vue from "vue";

import "./directives";
import { CreateElement, VNode } from "vue/types/umd";
import { Tooltip } from "./components";

Vue.config.productionTip = false;

new Vue({
  data() {
    return {
      tooltips: [],
    };
  },
  render(h: CreateElement): VNode {
    return h();
  },
}).$mount("#app");
