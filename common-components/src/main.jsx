import Vue from "vue";

import "./directives";
import { Tooltip, VLoading } from "./components";
import { _updateVueInstance } from "./services";
import APP from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  data() {
    return {
      tooltips: [],
      loading: {
        status: 0,
        text: "",
      },
    };
  },
  created() {
    _updateVueInstance(this);
  },
  render() {
    return (
      <div id="app">
        <APP />
        {this.tooltips.map((attrs) => (
          <Tooltip {...{ attrs }} />
        ))}
        {this.loading.status > 0 ? <VLoading /> : null}
      </div>
    );
  },
}).$mount("#app");
