import Vue, { ComponentOptions, VueConstructor } from "vue";

import { ModalModel } from "../models/model";
import { $root } from "./root";

export interface ModalPropModel {
  childComponent: Vue | VueConstructor<Vue> | ComponentOptions<any>;
  data: any;
  props: any;
  resolve: () => void;
}

function formatParams(
  { component: childComponent, data = {}, props = {} }: ModalModel,
  modalList: ModalPropModel[]
) {
  if (!childComponent) {
    throw new TypeError("Field component is required");
  }

  if (props.cancelText === undefined) {
    props.cancelText = "取消";
  }
  if (props.okText === undefined) {
    props.okText = props.cancelText === null ? "关闭" : "确定";
  }

  const modalProp: ModalPropModel = {
    childComponent,
    data,
    props,
    resolve,
  };

  return new Promise<any>((resolve: () => void) => {
    modalProp.resolve = resolve;
    modalList.push(modalProp);
  }).finally(() => {
    modalList.splice(modalList.indexOf(modalProp), 1);
  });
}

export function $modal(args: ModalModel) {
  if (typeof args?.props?.width === "number")
    args.props.width = args.props.width + "px";
  return formatParams(args, $root.modals);
}
