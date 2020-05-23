import Vue from "vue";

export interface Root extends Vue {
  tooltips: import("../components/tooltip").TooltipModelProp[];
  modals?: import("../services/model").ModalPropModel[];
  loading: {
    status: number;
    text: string;
  };
}
