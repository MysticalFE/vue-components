import { Progressbar } from "../components/v-progressbar";
import { $root } from "./root";

export const $progress = {} as Progressbar;

["start", "set", "inc", "dec", "hide", "pause", "done", "fail"].forEach(
  (key) => {
    $progress[key] = (...args: any[]) => {
      if (!$root || !$root.$refs) return;
      $root.$refs.progressbar[key](...args);
    };
  }
);
