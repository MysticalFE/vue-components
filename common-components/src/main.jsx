import Vue from "vue";
import "reflect-metadata";

import "./directives";
import { Tooltip, VLoading, VProgressbar, VModel } from "./components";
import { _updateVueInstance } from "./services";
import APP from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  data() {
    return {
      modals: [],
      tooltips: [],
      notifys: [],
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
        {this.notifys.map(attrs => <top-notify {...{ attrs }} />)}
        <APP />
        <VProgressbar ref="progressbar" />
        {this.modals.map((attrs) => (
          <VModel {...{ attrs }} />
        ))}
        {this.tooltips.map((attrs) => (
          <Tooltip {...{ attrs }} />
        ))}
        {this.loading.status > 0 ? <VLoading /> : null}
      </div>
    );
  },
}).$mount("#app");
