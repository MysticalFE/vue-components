import Vue from "vue";

import { Tooltip } from "./tooltip";
import { RTabset } from "./r-tabset";
import { NumberAnimation } from "./number-animation";
import { VProgressbar } from "./v-progressbar";
import { VModel } from "./v-model";

Object.entries({
  Tooltip,
  RTabset,
  NumberAnimation,
  VProgressbar,
  VModel,
}).forEach(([name, component]) => Vue.component(name, component));

export { Tooltip, RTabset, NumberAnimation, VProgressbar, VModel };
