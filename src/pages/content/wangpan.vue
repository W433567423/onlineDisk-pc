<template>
  <div class="wangpan">
    <!-- 顶部选项 -->
    <div
      class="border-bottom d-flex px-3 flex-column justify-content-center"
      style="position: absolute; top: 0; left: 0; right: 0"
      :style="file_id === 0 ? 'height: 90px' : 'height: 130px'"
    >
      <div class="d-flex align-items-center">
        <Button type="primary" icon="md-cloud-upload" class="me-2" @click="upload">上传</Button>
        <Button icon="md-add" class="me-2" v-if="checkedCount == 0" @click="handleClickMkdir">新建文件夹</Button>
        <Button icon="md-cloud-download" class="me-2" v-if="checkedCount">下载</Button>
        <Button icon="md-share" class="me-2" v-if="checkedCount">分享</Button>
        <Button icon="md-brush" class="me-2" v-if="checkedCount == 1" @click="HandleClickRename(-1)">重命名</Button>
        <Button icon="md-trash" class="me-2" v-if="checkedCount" @click="HandleClickDelete(-1)">删除</Button>

        <Input search enter-button placeholder="请输入关键词..." class="ms-auto" style="width: 200px; height: 30px" @on-search="HandleSearchFiles" />
      </div>
      <div
        style="height: 30px; margin: 5px -10px; background-color: gainsboro; border-radius: 5px; padding-left: 5px; line-height: 30px"
        v-if="file_id !== 0"
      >
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item active" aria-current="page" v-for="(item, index) in dirs" :key="index">
              <a href="#" @click="handleGoRoot(item.id)">{{ item.name }}</a>
            </li>
          </ol>
        </nav>
      </div>
      <div style="height: 35px" class="d-flex align-items-center">
        <Checkbox size="small" @on-change="handleSelectAll" :model-value="isSelectAll" />
        <span class="ms-3">全选</span>
        {{ dirs[dirs.length - 1].name }}
      </div>
    </div>
    <!-- 列表部分 -->
    <div style="position: absolute; left: 0; right: 0; bottom: 0px; overflow-y: auto" :style="file_id === 0 ? 'top: 90px' : 'top: 130px'">
      <template v-for="(item, index) in list" :key="index">
        <div class="border-bottom px-3 py-2 media-list">
          <Row @dblclick="handleClickListItem(item)" style="cursor: pointer">
            <iCol span="15" class="d-flex align-items-center">
              <Checkbox
                class="mb-0 me-3"
                size="small"
                :model-value="item.checked"
                @on-change="handleChangeItem({ method: 'check', item: item, index: index, value: !item.checked })"
              />
              <Icon :type="icons[item?.type]?.icon" size="40" :class="icons[item?.type]?.color" class="me-2" />
              <span>{{ item.name }}</span>
              <div class="ms-auto text-primary hide">
                <Tooltip content="分享">
                  <Icon type="md-share" size="20" class="mx-2" style="cursor: pointer" />
                </Tooltip>
                <Tooltip content="下载">
                  <Icon type="md-cloud-download" size="20" class="mx-2" style="cursor: pointer" />
                </Tooltip>
                <Dropdown>
                  <a href="javascript:void(0)">
                    <Icon type="md-more" size="20" class="mx-2" style="cursor: pointer" />
                  </a>
                  <template #list>
                    <DropdownMenu>
                      <DropdownItem @click="HandleClickRename(item.id)">重命名</DropdownItem>
                      <DropdownItem @click="HandleClickDelete(item.id)">删除</DropdownItem>
                    </DropdownMenu>
                  </template>
                </Dropdown>
              </div>
            </iCol>
            <iCol span="3" style="height: 40px; line-height: 40px">-</iCol>
            <iCol span="6">
              <span class="text-secondary" style="height: 40px; line-height: 40px">{{ item.created_time }}</span>
            </iCol>
          </Row>
        </div>
      </template>

      <div v-if="list.length === 0" class="text-center text-secondary pt-5 mt-5" style="font-size: 18px; font-weight: 600">暂无数据</div>
    </div>
    <!-- 上传文件 -->
    <Modal
      v-model="uploadModal"
      title="上传文件"
      fullscreen
      footer-hide
      @on-cancel="
        () => {
          FlashList();
        }
      "
    >
      <Upload
        :headers="{
          token,
        }"
        multiple
        type="drag"
        :onSuccess="Message.success('上传成功')"
        :action="'https://aod.wtututu.top/file/upload?file_id=' + file_id"
      >
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
          <p>单击或拖动文件上传</p>
        </div>
      </Upload>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from 'vue';
import { Message, Modal, Input } from 'view-ui-plus';
import { api as viewApi } from 'v-viewer';
import { getFileList, mkDir, renameFile, deleteFile, searchFiles } from '../../service/file';
import { useStore } from 'vuex';

import { IListItem, IEmitElement, IDirs } from '../type';
import { IRawlistItem } from '../../store/type';
import router from '../../router';

const store = useStore();

const list: Ref<Array<IListItem>> = ref([]);

// 处理图标相关
const icons: { [key: string]: any } = {
  dir: { icon: 'md-folder', color: 'text-warning' },
  image: { icon: 'md-image', color: 'text-success' },
  video: { icon: 'md-film', color: 'text-primary' },
  text: { icon: 'md-paper', color: 'text-info' },
  none: { icon: 'md-document', color: 'text-muted' },
};
const dirs: Ref<Array<IDirs>> = ref(JSON.parse(window.localStorage.getItem('dirs') as string) || [{ id: 0, name: '根目录' }]);
const uploadModal = ref(false);
const fileType = ref('all');
const file_id = computed(() => dirs.value[dirs.value.length - 1].id);
const token = computed(() => store.state.userModule.token);
const checkedList = computed(() => list.value.filter((item) => item.checked));
const checkedCount = computed(() => checkedList.value.length);
const isSelectAll = computed(() => checkedList.value.length == list.value.length);

// 获取数据并初始化
const FlashList = () => {
  getFileList(file_id.value).then(({ data }) => (list.value = formatListDate(data?.rows as Array<IRawlistItem>)));
};
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
//全选/选择
const handleSelectAll = (e: boolean) => list.value.forEach((item) => (item.checked = e));
// 新建文件夹
const handleClickMkdir = () => {
  let newDirName: string;
  Modal.confirm({
    title: '新建文件夹',
    render: (h: any) => {
      return h(Input, {
        size: 'large',
        autofocus: true,
        value: '',
        placeholder: '请输入新的文件夹名称',
        onInput: (event: any) => {
          newDirName = event.target.value;
        },
      });
    },
    onOk: () => {
      mkDir(file_id.value, newDirName).then(() => {
        FlashList();
        Message.success('文件夹新建成功');
      });
    },
  });
};
// 上传文件
const upload = () => {
  uploadModal.value = true;
};
// 重命名
const HandleClickRename = (id: number) => {
  let rename: string;
  Modal.confirm({
    title: '重命名',
    render: (h: any) => {
      return h(Input, {
        size: 'large',
        autofocus: true,
        value: '',
        placeholder: '请输入新的名称',
        onInput: (event: any) => {
          rename = event.target.value;
        },
      });
    },
    onOk: () => {
      let renameId: number;
      if (id !== -1) renameId = id;
      else renameId = checkedList.value[0].id;
      renameFile(file_id.value, renameId, rename).then(() => {
        Message.success('重命名成功');
        FlashList();
      });
    },
  });
};
// 删除
const HandleClickDelete = (id: number) => {
  console.log(id);
  Modal.confirm({
    title: '提示',
    content: '确认删除?',
    cancelText: '取消',
    onOk: () => {
      let ids = checkedList.value.map((item) => item.id).join(',');
      if (id !== -1) ids = String(id);
      console.log(ids);
      deleteFile(ids).then(() => {
        Message.success('删除成功');
        FlashList();
      });
    },
  });
};
// 搜索
const HandleSearchFiles = (e: string) => {
  searchFiles(e).then((data) => {
    list.value = formatListDate(data.data as Array<IRawlistItem>);
  });
};
// 事件
const handleChangeItem = (e: IEmitElement) => {
  switch (e.method) {
    case 'delete':
      if (e.id) {
        deleteFile(String(e.id));
        Message.success('删除成功');
        router.go(0);
      }
      break;
    case 'check':
      list.value[e.index as number].checked = e.value as boolean;
      break;
    case 'rename':
      renameFile(file_id.value, e.id as number, e.newName as string);
      Message.success('重命名成功');
      router.go(0);
      break;
    case 'image':
      if (typeof e.value == 'string' && e.value.length > 0) viewApi({ images: [e.value] });

      break;
    default:
      break;
  }
};
// 双击列表
const handleClickListItem = (item: IListItem) => {
  if (item.type === 'image') handleChangeItem({ method: 'image', value: item.url });
  else if (item.type === 'dir') {
    dirs.value.push({ id: item.id, name: item.name });
    window.localStorage.setItem('dirs', JSON.stringify(dirs.value));
    getFileList(item.id).then(({ data }) => (list.value = formatListDate(data?.rows as Array<IRawlistItem>)));
  }
};
// 点击面包屑
const handleGoRoot = (id: number) => {
  const msg = Message.loading({
    content: 'Loading...',
    duration: 0,
  });
  getFileList(id).then(({ data }) => {
    list.value = formatListDate(data?.rows as Array<IRawlistItem>);
    msg();
  });
  if (id === 0) dirs.value = [{ id: 0, name: '根目录' }];
  else {
    let i = dirs.value.findIndex((v) => v.id === id);
    if (i !== -1) {
      dirs.value = dirs.value.filter((v, index) => {
        return index <= i;
      });
    }
  }
  window.localStorage.setItem('dirs', JSON.stringify(dirs.value));
};

store.dispatch('fileModule/onUpdateList', (type: any) => {
  fileType.value = type;
  getFileList(file_id.value, type).then(({ data }) => (list.value = formatListDate(data?.rows as Array<IRawlistItem>)));
});
FlashList();
</script>

<style scoped lang="less"></style>
