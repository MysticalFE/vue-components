import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component({
  name: "NumberAnimation",
})
export class NumberAnimation extends Vue {
  @Prop() readonly value: number = 0;
  @Prop() readonly postfix: string = "";
  @Prop() readonly animationDuration: number = 500;
  @Prop() readonly useKw: boolean = false;
  @Prop() readonly use99: boolean = false;

  raf: number = 0;

  mounted() {
    this.setValue(this.value);
  }

  private setValue(value: number) {
    let curPostfix = "";
    if (this.useKw) {
      if (value >= 1000) {
        if (value >= 10000) {
          value = Math.min(~~(value / 10000), 9);
          curPostfix = "w+";
        }
      } else {
        value = ~~(value / 1000);
        curPostfix = "k+";
      }
    }
    if (this.use99) {
      if (value > 99) {
        value = 99;
        curPostfix = "+";
      }
    }
    const postfix = curPostfix ? curPostfix : this.postfix;
    this.$el.innerHTML = `${value}<i class="font-postfix">${postfix}</i>`;
  }

  @Watch("value")
  valueChange(value: number, oldValue = 0) {
    if (this.raf) cancelAnimationFrame(this.raf);
    let start: number;
    const pointIndex = String(value).indexOf(".");
    const round = pointIndex > -1 ? String(value).length - pointIndex - 1 : 0;
    const step = (time: number) => {
      start = start || time;
      if (time - start >= this.animationDuration) {
        this.setValue(value);
        cancelAnimationFrame(this.raf);
      } else {
        this.setValue(
          +(
            oldValue +
            ((value - oldValue) * (time - start)) / this.animationDuration
          ).toFixed(round)
        );
        this.raf = requestAnimationFrame(step);
      }
    };
    this.raf = requestAnimationFrame(step);
  }
  beforeDestroy() {
    if (this.raf) cancelAnimationFrame(this.raf);
  }
  render() {
    return <span class="font-mono"></span>;
  }
}
