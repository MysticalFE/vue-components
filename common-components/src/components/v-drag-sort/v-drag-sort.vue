<template>
  <transition-group name="flip"
                    tag="div"
                    class="v-drag-sort">
    <div v-for="(item, i) in list"
         :key="item.data[idKey]"
         :class="['item-box', itemBoxClass, dragSrc && dragSrc[idKey] === item.data[idKey] && draging ? ghostClass : '']"
         @dragstart="onDragStart($event, item)"
         @dragover="onDragOver($event, item)"
         @dragend="onDragEnd($event, item)"
         @drop="onDrop($event, item)"
         :draggable="!disabled">
      <div v-if="!disabled"
           class="handle-box"
           @mousedown="onHandleMousedown(item)">
        <!-- 手柄插槽 -->
        <slot name="handle">
          <div class="handle">
            <i class="fa fa-navicon"></i>
          </div>
        </slot>
      </div>
      <!-- 拖拽项插槽 -->
      <slot name="item"
            :item="item.data"
            :index="i" />
    </div>
  </transition-group>
</template>

<script src="./v-drag-sort.ts" />
<style lang="scss" src="./v-drag-sort.scss" scoped />
