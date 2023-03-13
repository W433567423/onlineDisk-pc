<template>
  <div class="index">
    <Layout style="height: 100vh">
      <!-- 顶部布局 -->
      <Header class="bg-white p-0" style="height: 60px; line-height: 60px">
        <Menu mode="horizontal" theme="light" :active-name="topMuneIndex" @on-select="handleTopMune" class="d-flex align-items-center justify-content-start ps-4">
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
                <Avatar src="https://i.loli.net/2017/08/21/599a521472424.jpg" />
                管理员
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <template #list>
                <DropdownMenu>
                  <DropdownItem>个人资料</DropdownItem>
                  <DropdownItem>修改密码</DropdownItem>
                  <DropdownItem>安全退出</DropdownItem>
                </DropdownMenu>
              </template>
            </Dropdown>
          </div>
        </Menu>
      </Header>
      <Layout>
        <!-- 侧边布局 -->
        <Sider hide-trigger style="background-color: #ebf0f1">
          <Menu theme="light" :active-name="siderMuneIndex" width="200px" style="background-color: #ebf0f1" @on-select="handleSiderMune">
            <MenuGroup :title="item.category" v-for="(item, index) in siderMuneList" :key="index">
              <MenuItem :name="x.name" v-for="(x, i) in item.list" :key="i">
                <Icon :type="x.icon" />
                {{ x.title }}
              </MenuItem>
            </MenuGroup>
          </Menu>
        </Sider>
        <!-- 内容区域 -->
        <Content class="bg-white">Content</Content>
      </Layout>
      <!-- 底部布局 -->
      <Footer class="bg-white d-flex p-0">
        <div class="bg-light" style="width: 200px; height: 50px">空间信息</div>
        <div>分页</div>
      </Footer>
    </Layout>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// 顶部导航
const topMuneIndex = ref(3);
const topMuneList = ref([
  { icon: 'md-cloud', name: 1, title: '网盘' },
  { icon: 'md-share', name: 2, title: '分享' },
  { icon: 'md-keypad', name: 3, title: '更多' },
]);
const handleTopMune = (e: any) => {
  console.log(e);
};

// 侧边导航
const siderMuneIndex = ref(2);
const siderMuneList = ref([
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
]);
const handleSiderMune = (e: any) => {
  console.log(e);
};
</script>

<style lang="less" scoped></style>
