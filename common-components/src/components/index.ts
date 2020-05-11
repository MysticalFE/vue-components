import Vue from "vue";

import { Tooltip } from "./tooltip";
import { RTabset } from "./r-tabset";

Object.entries({
  Tooltip,
  RTabset,
}).forEach(([name, component]) => Vue.component(name, component));

export { Tooltip, RTabset };
