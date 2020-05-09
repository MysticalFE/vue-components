import Vue from "vue";

export interface Root extends Vue {
  tooltips: import("../components/tooltip").TooltipModelProp[];
  loading: {
    status: number;
    text: string;
  };
}
