<template>
  <div class="border-bottom px-3 py-2 media-list">
    <Row>
      <iCol span="14" class="d-flex align-items-center">
        <Checkbox
          class="mb-0 me-3"
          size="small"
          :model-value="item.checked"
          @on-change="emit('changeListItem', { method: 'check', item: porps.item, index: porps.index, value: !item.checked })"
        />
        <Icon :type="iconType" size="40" :class="iconColor" class="me-2" />
        {{ item.name }}
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
                <DropdownItem @click="isShowModalRename = true">重命名</DropdownItem>
                <DropdownItem @click="isShowModalDel = true">删除</DropdownItem>
              </DropdownMenu>
            </template>
          </Dropdown>
        </div>
      </iCol>
      <iCol span="6" style="height: 40px; line-height: 40px">-</iCol>
      <iCol span="4">
        <span class="text-secondary" style="height: 40px; line-height: 40px">{{ item.create_time }}</span>
      </iCol>
    </Row>
    <!-- 弹出对话框 -->
    <Modal
      title="提示"
      v-model="isShowModalDel"
      @on-cancel="() => {}"
      @on-ok="emit('changeListItem', { method: 'delete', item: porps.item, index: porps.index })"
    >
      <div>是否删除该文件</div>
    </Modal>
    <Modal
      title="提示"
      v-model="isShowModalRename"
      @on-cancel="() => {}"
      @on-ok="emit('changeListItem', { method: 'rename', index: porps.index, newName })"
    >
      <Input placeholder="请输入新的文件名" autofocus v-model="newName"></Input>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IListItem } from '../pages/type'
import { Modal } from 'view-ui-plus'
const porps = defineProps<{
  item: IListItem
  index: number
}>()
// 处理图标相关
const icons: { [key: string]: any } = {
  dir: { icon: 'md-folder', color: 'text-warning' },
  image: { icon: 'md-image', color: 'text-success' },
  video: { icon: 'md-film', color: 'text-primary' },
  text: { icon: 'md-paper', color: 'text-info' },
  none: { icon: 'md-document', color: 'text-muted' },
}
const iconType = computed(() => icons[porps.item.type].icon)
const iconColor = computed(() => icons[porps.item.type].color)
// 处理操作
// 删除
const emit = defineEmits(['changeListItem'])
const isShowModalDel = ref(false)
const isShowModalRename = ref(false)
// 重命名
const newName = ref(porps.item.name)
</script>

<style scoped lang="less">
.media-list {
  .hide {
    display: none;
  }
  &:hover {
    background-color: rgba(45, 140, 240, 0.1);
    // background-color: red;
    .hide {
      display: block;
    }
  }
}
</style>
