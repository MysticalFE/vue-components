import Vue from "vue";

import "./directives";
import { Tooltip } from "./components";
import { _updateVueInstance } from "./services";

Vue.config.productionTip = false;

new Vue({
  data() {
    return {
      tooltips: [],
    };
  },
  created() {
    _updateVueInstance(this);
  },
  render() {
    return (
      <div id="app">
        {this.tooltips.map((attrs) => (
          <Tooltip {...{ attrs }} />
        ))}
      </div>
    );
  },
}).$mount("#app");
