<template>
  <div class="wangpan">
    <!-- 顶部选项 -->
    <div class="border-bottom d-flex px-3 flex-column justify-content-center" style="position: absolute; top: 0; left: 0; right: 0; height: 90px">
      <div class="d-flex align-items-center">
        <Button type="primary" icon="md-cloud-upload" class="me-2">上传</Button>
        <Button icon="md-add" class="me-2" v-if="checkedCount == 0">新建文件夹</Button>
        <Button icon="md-cloud-download" class="me-2" v-if="checkedCount">下载</Button>
        <Button icon="md-share" class="me-2" v-if="checkedCount">分享</Button>
        <Button icon="md-brush" class="me-2" v-if="checkedCount == 1" @click="isShowModalRename = true">重命名</Button>
        <Button icon="md-trash" class="me-2" v-if="checkedCount">删除</Button>

        <Input search enter-button placeholder="请输入关键词..." class="ms-auto" style="width: 200px; height: 30px" />
      </div>
      <div style="height: 35px" class="d-flex align-items-center">
        <Checkbox size="small" @on-change="handleSelectAll" :model-value="isSelectAll" />
        <span class="ms-3">全选</span>
      </div>
    </div>
    <!-- 列表部分 -->
    <div style="position: absolute; top: 90px; left: 0; right: 0; bottom: 55px; overflow-y: auto">
      <mediaList v-for="(item, index) in list" :key="index" :item="item" :index="index" @changeListItem="handleChangeItem" />
    </div>
    <!-- 底部 -->
    <div style="position: absolute; bottom: 0px; left: 0; right: 0; height: 55px" class="d-flex align-items-center justify-content-center border-top">
      <Page :total="100" show-sizer />
    </div>
    <!-- 由于view-ui-plus未提供compositionAPI导致该组件无法使用 -->
    <!-- <Message :ref="messageRef" /> -->
    <!-- 重命名对话框 -->
    <Modal
      title="提示"
      v-model="isShowModalRename"
      @on-cancel="() => {}"
      @on-ok="handleChangeItem({ method: 'rename', item: checkedList[0], newName, index: checkedIndex })"
    >
      <Input placeholder="请输入新的文件名" autofocus v-model="newName"></Input>
    </Modal>
  </div>
  <!-- 图片预览 -->
  <Modal v-model="isShowModalImg" fullscreen footer-hide mask @click="isShowModalImg = false">
    <div style="width: 60%; margin: 10% auto">
      <img :src="showImgUrl" />
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from 'vue';
import { Message } from 'view-ui-plus';

import mediaList from '../../components/media-list.vue';
import { getFileList } from '../../service/file';

import { IEmitElement } from './type';
import { IListItem } from '../type';
import { IRawlistItem } from '../../store/type';

const list: Ref<Array<IListItem>> = ref([]);
const checkedList = computed(() => list.value.filter((item) => item.checked));
const checkedIndex = computed(() => list.value.findIndex((item) => item.checked));
const checkedCount = computed(() => checkedList.value.length);
const isSelectAll = computed(() => checkedList.value.length == list.value.length);

// 重命名
const isShowModalRename = ref(false);
const newName = checkedList.value[0]?.name;
// const newName = '';
//图片
// const ViewImgRef = ref(null)
const isShowModalImg = ref(false);
const showImgUrl = ref('');

// 获取数据并初始化
getFileList(0).then(({ data }) => (list.value = formatListDate(data?.rows as Array<IRawlistItem>)));
// 格式化列表数据
const formatListDate = (rawListDate: Array<IRawlistItem>): Array<IListItem> =>
  rawListDate.map((item) => {
    let type;
    if (item.isdir === 1) {
      type = 'dir';
    } else {
      type = item.ext.split('/')[0] || 'none';
    }
    return {
      type,
      checked: false,
      name: item.name,
      url: 'https://' + item.url,
      created_time: item.created_time,
      id: item.id,
      size: item.size,
    };
  });

// 子组件事件
const handleChangeItem = (e: IEmitElement) => {
  switch (e.method) {
    case 'delete':
      list.value.splice(e.index as number, 1);
      Message.success('删除成功');
      break;
    case 'check':
      list.value[e.index as number].checked = e.value as boolean;
      break;
    case 'rename':
      list.value[e.index as number].name = e.newName as string;
      break;
    case 'image':
      if (typeof e.value == 'string' && e.value.length > 0) {
        isShowModalImg.value = true;
        showImgUrl.value = e.value as string;
      }
      break;
    default:
      break;
  }
};
//全选/选择
const handleSelectAll = (e: boolean) => list.value.forEach((item) => (item.checked = e));
</script>

<style scoped lang="less"></style>
