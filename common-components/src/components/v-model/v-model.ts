import type { Dialog } from 'element-ui';
import type { VueConfiguration, VueConstructor } from 'vue/types/vue';
import { Component, Prop, Ref, Vue } from 'vue-property-decorator';

@Component({
  name: "VModel"
})
export default class VModal extends Vue {
  @Ref() readonly body!: Vue & {
    onOk?(modal: VModal): any;
    onCancel?(modal: VModal): any;
  };
  @Ref() readonly modal!: Dialog;
  @Prop() readonly props!: object;
  @Prop() readonly data!: { [key: string]: any };
  @Prop() readonly resolve!: (value: any) => void;
  @Prop({ type: [Vue, Function, Object] }) readonly childComponent!: Vue | VueConstructor | VueConfiguration;
  @Prop() readonly classes!: string[];

  visible = false;
  loading = false;
  resultValue: any;
  isOk = false;

  close(value?: any, isOk = false) {
    this.visible = false;
    this.resultValue = value;
    this.isOk = isOk;
  }

  onHidden() {
    if (this.isOk) {
      this.resolve(this.resultValue);
    } else {
      this.resolve(Promise.reject(this.resultValue == null ? 'cancel' : this.resultValue));
    }
  }

  onOk() {
    const result = this.body.onOk ? this.body.onOk(this) : this.body;
    if (result && typeof result.then === 'function') {
      this.loading = true;
      Promise.resolve(result)
        .then(value => this.close(value, true))
        .finally(() => this.loading = false);
    } else {
      this.close(result);
      this.isOk = true;
    }
  }

  onCancel() {
    if (this.body.onCancel) {
      this.body.onCancel(this);
    } else {
      this.close('cancel');
    }
  }

  mounted() {
    this.$nextTick(() => this.visible = true);
  }
}
