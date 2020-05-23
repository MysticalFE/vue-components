<template>
  <el-dialog
    :modal-append-to-body="false"
    :close-on-click-modal="false"
    v-bind="props"
    :visible.sync="visible"
    :class="classes"
    @closed="onHidden"
    @before-close="onCancel"
    ref="modal"
  >
    <component :is="childComponent" v-bind="data" ref="body" :modalInstance="this" />
    <template slot="footer" v-if="props.cancelText !== null || props.okText !== null">
      <el-button v-if="props.cancelText !== null" @click="onCancel">{{ props.cancelText }}</el-button>
      <el-button
        v-if="props.okText !== null"
        type="primary"
        :loading="loading"
        @click="onOk"
      >{{ props.okText }}</el-button>
    </template>
  </el-dialog>
</template>
<script lang="ts" src="./v-model.ts"></script>
<style lang="scss" scoped>
/deep/ .el-dialog__body {
  padding: 20px;
}
</style>