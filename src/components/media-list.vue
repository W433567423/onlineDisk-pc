<template>
  <div class="border-bottom px-3 py-2">
    <Row>
      <iCol span="14" class="d-flex align-items-center">
        <Checkbox class="mb-0 me-3" size="small" :model-value="item.checked" />
        {{ item.checked }}
        <Icon type="md-folder" size="40" color="#ffa609" class="me-2" />
        {{ item.name }}
        <div class="ms-auto text-primary">
          <Tooltip content="分享" placement="buttom">
            <Icon type="md-share" size="20" class="mx-2" style="cursor: pointer" />
          </Tooltip>
          <Tooltip content="下载" placement="buttom">
            <Icon type="md-cloud-download" size="20" class="mx-2" style="cursor: pointer" />
          </Tooltip>
          <Dropdown>
            <a href="javascript:void(0)">
              <Icon type="md-more" size="20" class="mx-2" style="cursor: pointer" />
            </a>
            <template #list>
              <DropdownMenu>
                <DropdownItem>重命名</DropdownItem>
                <DropdownItem>删除</DropdownItem>
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
  </div>
</template>

<script setup lang="ts">
// import { ref, computed } from 'vue'
import { IListItem } from '../pages/type'
const icons = {
  dir: { icon: 'md-folder', color: 'text-warning' },
  image: { icon: 'md-image', color: 'text-warning' },
  video: { icon: 'md-film', color: 'text-warning' },
  text: { icon: 'md-paper', color: 'text-warning' },
  none: { icon: 'md-document', color: 'text-warning' },
}
defineProps<{
  item: IListItem
  index: number
}>()
// const icon = computed(() => {})
</script>

<style scoped lang="less"></style>
