<template>
  <div class="login">
    <div class="d-flex justify-content-center" style="height: 100vh">
      <div class="rounded p-3" style="width: 380px; margin-top: 50px; height: max-content; background-color: #e8eaec">
        <!-- 上方装饰 -->
        <div class="d-flex flex-column align-items-center justify-content-center mb-4">
          <div class="d-flex align-items-center mb-3">
            <Icon type="md-briefcase" size="55" color="#2d8cf0" />
            <h3 class="text-muted ms-2">涂涂の网盘</h3>
          </div>
          <span class="text-muted small">企业级网盘解决方案</span>
        </div>
        <!-- 登录模块 -->
        <Login @on-submit="handleSubmit">
          <UserName v-model="formItem.username" name="username" :rules="usernameRule" :ref="usernameRef" />
          <Password v-model="formItem.password" :rules="passwordRule" name="password" :ref="passwordRef" />
          <div class="d-flex align-items-center mb-3">
            <Checkbox v-model="formItem.isAutoLogin" size="large">自动登录</Checkbox>
            <a href="#" class="small ms-auto">忘记密码</a>
            <span class="mx-1">|</span>
            <a href="#" class="small">立即注册</a>
          </div>
          <Submit />
        </Login>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const formItem = ref({ username: '', password: '', isAutoLogin: true });
// 校验规则
const usernameRule = ref([
  {
    required: true,
    message: '用户名不能为空！',
    trigger: 'blur',
  },
  {
    min: 4,
    message: '账号不能少于4位！',
    trigger: 'blur',
  },
]);
const passwordRule = ref([
  {
    required: true,
    message: '密码不能为空！',
    trigger: 'blur',
  },
  {
    min: 6,
    message: '密码不能少于6位！',
    trigger: 'blur',
  },
]);
const passwordRef = ref(null);
const usernameRef = ref(null);
const handleSubmit = (e: boolean) => {
  if (!e) return;
  console.log('提交');
};
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100%;
  background: url('../assets/img/login-bg.svg');
  background-size: contain;
  // background-color: red;
}
</style>
