<template>
  <div class="wangpan">
    <div class="border-bottom d-flex px-3 py-2" style="position: absolute; top: 0; left: 0; right: 0; height: 50px">
      <Button type="primary" icon="md-cloud-upload" class="me-2">上传</Button>
      <Button icon="md-add" class="me-2">新建文件夹</Button>
      <Button icon="md-cloud-download" class="me-2">下载</Button>
      <Button icon="md-share" class="me-2">分享</Button>
      <Button icon="md-md-brush" class="me-2">重命名</Button>
      <Button icon="md-trash" class="me-2">删除</Button>
      <Input search enter-button placeholder="请输入关键词..." class="ms-auto" style="width: 200px" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less"></style>
