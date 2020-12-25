import { Component, Prop, Vue } from 'vue-property-decorator';

interface ItemModel<T> {
  _draggable: boolean;
  data: T;
}

@Component({
  name: 'VDragSort'
})
export default class VDragSort<T> extends Vue {
  @Prop() readonly value!: T[];
  @Prop({ default: 'id' }) readonly idKey!: string;
  @Prop({ default: 'drag_item__ghost' }) readonly ghostClass!: string;
  @Prop() readonly itemBoxClass!: string;
  @Prop({ default: false }) readonly disabled!: boolean;

  dragSrc: any = null;
  draging = false;
  dropTarget: any = null;

  get list() {
    return this.value.map(x => ({
      _draggable: false,
      data: x,
    }));
  }

  /**
   * 开始拖拽被拖拽元素
   */
  onDragStart(e: DragEvent, item: ItemModel<T>) {
    if (!item._draggable) {
      e.preventDefault();
      return;
    }

    this.dragSrc = { ...item.data };
    this.draging = true;
  }

  /**
   * 拖拽结束
   */
  onDragEnd(e: DragEvent, item: ItemModel<T>) {
    item._draggable = false;
    this.draging = false;
  }

  /**
   * 拖拽到元素上面
   */
  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  /**
   * 拖拽到元素上面松开鼠标
   */
  onDrop(e: DragEvent, item: ItemModel<T>) {
    e.preventDefault();
    this.changeList(item.data);
  }

  /**
   * 鼠标在手柄处按下
   */
  onHandleMousedown(item: ItemModel<T>) {
    item._draggable = true;
  }

  /**
   * 改变列表数据
   */
  changeList(target: T) {
    const { value, idKey } = this;

    this.dropTarget = { ...target };
    if (this.dropTarget[idKey] === this.dragSrc[idKey]) {
      return;
    }

    const srcIndex = value.findIndex(item => item[idKey] === this.dragSrc[idKey]);
    const targetIndex = value.findIndex(item => item[idKey] === this.dropTarget[idKey]);

    this.$emit('update:value', this.sortHanlder(srcIndex, targetIndex));
    this.$emit('change', srcIndex, targetIndex, value);
  }

  /**
   * 处理数组排序
   */
  sortHanlder(srcIndex: number, targetIndex: number) {
    const list = [...this.value];
    const src = list.splice(srcIndex, 1);
    list.splice(targetIndex, 0, ...src);
    return list;
  }
}
