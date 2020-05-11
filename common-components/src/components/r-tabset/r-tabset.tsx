import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  name: "RTabset",
})
export default class RTabset extends Vue {
  @Prop() readonly keepAlive!: boolean;
  @Prop() readonly props: any;
  @Prop() readonly navStyle: any;

  render() {
    return (
      <div>
        <nav style={this.navStyle}>
          <slot />
        </nav>
        <keep-alive v-if={this.keepAlive}>
          <router-view v-bind={this.props} ref="view"></router-view>
        </keep-alive>
        <router-view v-else v-bind={this.props} ref="view"></router-view>
      </div>
    );
  }
}
