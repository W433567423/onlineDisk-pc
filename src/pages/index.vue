<template>
  <div class="index">
    <Layout style="height: 100vh">
      <!-- 顶部布局 -->
      <Header class="bg-white p-0" style="height: 60px; line-height: 60px; z-index: 99">
        <Menu
          mode="horizontal"
          theme="light"
          :active-name="topMuneIndex"
          @on-select="handleTopMune"
          class="d-flex align-items-center justify-content-start ps-4"
        >
          <!--  左侧导航部分-->
          <div style="width: 200px; font-size: 25px; font-weight: bold">tutuの网盘</div>
          <MenuItem :name="item.name" v-for="(item, index) in topMuneList" :key="index">
            <Icon :type="item.icon" />
            {{ item.title }}
          </MenuItem>
          <!-- 右侧下拉菜单-->
          <div class="ms-md-auto me-4">
            <Dropdown>
              <a href="javascript:void(0)">
                <Avatar :src="user.avatar || 'https://i.loli.net/2017/08/21/599a521472424.jpg'" />
                {{ user.nickname || user.username }}
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <template #list>
                <DropdownMenu>
                  <DropdownItem>个人资料</DropdownItem>
                  <DropdownItem>修改密码</DropdownItem>
                  <DropdownItem @click="handleClickLogout">安全退出</DropdownItem>
                </DropdownMenu>
              </template>
            </Dropdown>
          </div>
        </Menu>
      </Header>
      <Layout>
        <!-- 侧边布局 -->
        <Sider hide-trigger style="background-color: #ebf0f1; position: relative">
          <Menu theme="light" :active-name="siderMuneIndex" width="200px" style="background-color: #ebf0f1" @on-select="handleSiderMune">
            <MenuGroup :title="item.category" v-for="(item, index) in siderMuneList" :key="index">
              <MenuItem :name="x.name" v-for="(x, i) in item.list" :key="i">
                <Icon :type="x.icon" />
                {{ x.title }}
              </MenuItem>
            </MenuGroup>
          </Menu>
          <!-- 底部布局 -->
          <div style="width: 200px; height: 55px; background-color: #ebf0f1; position: absolute; bottom: 0" class="px-3">
            <Progress hide-info :percent="90" :stroke-color="['#108ee9', '#87d068']" />
            <div class="d-flex justify-content-between mt-2">
              <span>总共100TB</span>
              <span class="text-warning">已用80TB</span>
            </div>
          </div>
        </Sider>
        <!-- 内容区域 -->
        <Content class="bg-white" style="position: relative">
          <div style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; overflow-y: auto"><router-view /></div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, ComputedRef } from 'vue';
import { useStore } from 'vuex';
import router from '../router';
import { Message } from 'view-ui-plus';
import { logout } from '../service/user';

import { IUser } from '../store/type';

const store = useStore();

const siderMuneList = [
  {
    category: '全部文件',
    list: [
      { icon: 'md-image', name: 1, title: '图片' },
      { icon: 'md-film', name: 2, title: '视频' },
      { icon: 'md-musical-notes', name: 3, title: '音乐' },
      { icon: 'md-document', name: 4, title: '其他' },
    ],
  },
  {
    category: '其他操作',
    list: [
      { icon: 'md-share', name: 5, title: '我的分享' },
      { icon: 'md-trash', name: 6, title: '回收站' },
    ],
  },
];
const topMuneList = [
  { icon: 'md-cloud', name: 1, title: '网盘' },
  { icon: 'md-share', name: 2, title: '分享' },
  { icon: 'md-keypad', name: 3, title: '更多' },
];
const topMuneIndex = ref(1);
const siderMuneIndex = ref(2);

const user: ComputedRef<IUser> = computed(() => store.state.userModule.user || {});

// 处理顶部点击事件
const handleTopMune = (e: any) => {
  console.log(e);
};

// 处理侧边点击事件
const handleSiderMune = (e: any) => {
  console.log(e);
};
const handleClickLogout = () => {
  logout().then((res) => {
    Message.success(res.data);
    // 清除登录状态和本地存储
    store.commit('userModule/clearStatus');
    router.push({ path: '/login' });
  });
};
</script>

<style lang="less">
.ivu-progress-inner {
  border: 1px solid #eee;
  background-color: white;
}
</style>
