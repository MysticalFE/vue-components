import Vue from "vue";

import { Tooltip } from "./tooltip";

Object.entries({
  Tooltip,
}).forEach(([name, component]) => Vue.component(name, component));

export { Tooltip };
