<template>
  <div class="wangpan">
    <!-- 顶部选项 -->
    <div class="border-bottom d-flex px-3 flex-column justify-content-center" style="position: absolute; top: 0; left: 0; right: 0; height: 90px">
      <div class="d-flex align-items-center">
        <Button type="primary" icon="md-cloud-upload" class="me-2">上传</Button>
        <Button icon="md-add" class="me-2">新建文件夹</Button>
        <Button icon="md-cloud-download" class="me-2">下载</Button>
        <Button icon="md-share" class="me-2">分享</Button>
        <Button icon="md-brush" class="me-2">重命名</Button>
        <Button icon="md-trash" class="me-2">删除</Button>

        <Input search enter-button placeholder="请输入关键词..." class="ms-auto" style="width: 200px; height: 30px" />
      </div>
      <div style="height: 35px" class="d-flex align-items-center">
        <Checkbox size="small" />
        <span class="ms-3">全选</span>
      </div>
    </div>
    <!-- 列表部分 -->
    <div style="position: absolute; top: 90px; left: 0; right: 0; bottom: 55px; overflow-y: auto">
      <div class="border-bottom px-3 py-2">
        <Row>
          <iCol span="14" class="d-flex align-items-center">
            <Checkbox class="mb-0 me-3" size="small" />
            <Icon type="md-folder" size="30" color="#ffa609" class="me-2" />
            我的笔记
            <div class="ms-auto text-primary">
              <Tooltip content="bbbbb"></Tooltip>
              <Icon type="md-share" size="20" class="mx-2" />
              <Icon type="md-cloud-download" size="20" class="mx-2" />
              <Icon type="md-more" size="20" class="mx-2" />
            </div>
          </iCol>
          <iCol span="6">-</iCol>
          <iCol span="4">
            <span class="text-secondary">2023-3-14</span>
          </iCol>
        </Row>
      </div>
    </div>
    <!-- 底部 -->
    <div style="position: absolute; bottom: 0px; left: 0; right: 0; height: 55px" class="d-flex align-items-center justify-content-center border-top">
      <Page :total="100" show-sizer />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

let list = ref([
  { type: 'image', name: '风景.jpg', data: '/static/logo.png', create_time: '2023-03-11 12:37', checked: false },
  { type: 'dir', name: '我的笔记', data: '', create_time: '2023-03-11 12:37', checked: false },
  { type: 'image', name: '风景.jpg', data: '/static/logo.png', create_time: '2023-03-11 12:37', checked: false },
  { type: 'video', name: '小视频.mp4', data: '/static/210710122716702150.mp4', create_time: '2023-03-11 12:37', checked: false },
  { type: 'text', name: '记事本.txt', data: '', create_time: '2023-03-11 12:37', checked: false },
  { type: 'image', name: '风景.jpg', data: '/static/logo.png', create_time: '2023-03-11 12:37', checked: false },
  { type: 'image', name: '风景.jpg', data: '/static/logo.png', create_time: '2023-03-11 12:37', checked: false },
  { type: 'none', name: '压缩包.zip', data: '', create_time: '2023-03-11 12:37', checked: false },
])
const icons = ref([{ icon: 'md-folder' }])
</script>

<style scoped lang="less"></style>
