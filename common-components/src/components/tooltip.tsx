import Popper from "popper.js";
import "reflect-metadata";
import { Component, Vue, Prop } from "vue-property-decorator";

export interface TooltipModelProp {
  content: string;
  target: HTMLElement;
  popperClass: string;
  effect: "dark" | "light";
  placement: Popper.Placement;
}

@Component({
  name: "Tooltip",
})
export class Tooltip extends Vue implements TooltipModelProp {
  @Prop() public content: string = "";
  @Prop() public target!: HTMLElement;
  @Prop() public popperClass: string = "";
  @Prop() public effect: "dark" | "light" = "dark";
  @Prop() public placement: Popper.Placement = "top";
  popper!: Popper;

  public mounted() {
    this.popper = new Popper(this.target, this.$el, {
      placement: this.placement,
      modifiers: {
        preventOverflow: { enabled: false },
        hide: { enabled: false },
      },
    });
  }

  public beforeDestroy() {
    this.popper.destroy();
  }

  public render() {
    return (
      <div
        role="tooltip"
        hidden={this.content == null}
        style={{ zIndex: 9999, whiteSpace: "pre-line" }}
        class="{['el-tooltip__popper', 'is-' + this.effect, this.popperClass]}"
      >
        <div class="popper__arrow" x-arrow="" />
        {this.content}
      </div>
    );
  }
}
