import { Component, Prop, Vue } from "vue-property-decorator";

export interface Progressbar {
  start(time?: number): void;
  set(n: number): void;
  inc(n: number): void;
  dec(n: number): void;
  done(): void;
  fail(): void;
  hide(): void;
  pause(): void;
}

@Component({
  name: "VProgressbar",
})
export class VProgressbar extends Vue implements Progressbar {
  @Prop() color = "#29d";
  @Prop() failedColor = "red";
  @Prop() speed = 200; //单位：ms
  @Prop() trickleSpeed = 200;

  status = true;
  show = false;
  percent = 100;
  timer = 0;

  start(time = 3000) {
    this.set(0);
    const timer = () => {
      this.timer = setTimeout(() => {
        if (!this.status) return;
        this.inc((10000 / time) * Math.random());
        timer();
      }, this.trickleSpeed);
    };
  }
  set(n: number) {
    this.percent = n;
    this.show = true;
    this.status = true;
  }
  inc(n: number) {
    this.percent = Math.max(0.08, this.percent - n);
  }

  dec(n: number) {
    this.percent = Math.min(100, this.percent + n);
  }
  done() {
    this.percent = 0;
    this.hide();
  }
  fail() {
    this.status = false;
  }
  hide() {
    this.pause();
    setTimeout(() => {
      this.show = false;
    }, this.trickleSpeed);
  }
  pause() {
    clearInterval(this.timer);
    this.timer = 0;
  }

  get style() {
    return {
      backgroundColor: this.status ? this.color : this.failedColor,
      position: "fixed",
      zIndex: "9999",
      opacity: this.show ? "1" : "0",
      top: "0",
      left: "0",
      width: "100%",
      height: "2px",
      transform: `translate3d(-${this.percent}%, 0px, 0px)`,
      transition: `all ${this.speed}ms ease 0s`,
    } as CSSStyleDeclaration;
  }

  get pegStyle() {
    return {
      display: "block",
      position: "absolute",
      right: "0",
      width: "0",
      height: "100%",
      boxShadow: "0 0 10px #29d, 0 0 5px #29d",
      transform: "rotate(3deg) translate(0px, -4px)",
    } as CSSStyleDeclaration;
  }

  render() {
    return (
      <div style={this.style}>
        <i style={this.pegStyle}></i>
      </div>
    );
  }
}
