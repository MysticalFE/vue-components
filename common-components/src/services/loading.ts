import { $root } from "../services";
export const $loading = {
  increase(text: string = "") {
    const { loading } = $root;
    loading.status++;
    loading.text = text;
  },
  decrease() {
    $root.loading.status--;
  },
};
