import { Component, Vue } from "vue-property-decorator";

function preventScrolling(e: MouseWheelEvent) {
  e.preventDefault();
}

@Component
export default class VLoading extends Vue {
  mounted() {
    document.body.addEventListener("wheel", preventScrolling, {
      passive: false,
      capture: true,
    });
  }

  beforeDestroy() {
    document.body.removeEventListener("wheel", preventScrolling, {
      capture: true,
    });
  }
}
