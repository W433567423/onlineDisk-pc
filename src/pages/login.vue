<template>
  <div class="login">
    <div class="d-flex justify-content-center" style="height: 100vh">
      <div class="rounded p-3" style="width: 380px; margin-top: 50px; height: max-content; background-color: #e8eaec">
        <!-- 上方装饰 -->
        <div class="d-flex flex-column align-items-center justify-content-center">
          <div class="d-flex align-items-center">
            <Icon type="md-briefcase" size="55" color="#2d8cf0" />
            <h3 class="text-muted ms-2">涂涂の网盘</h3>
          </div>
          <span class="text-muted small mx-3 mb-3">企业级网盘解决方案</span>
        </div>
        <!-- 登录模块 -->
        <Login @on-submit="handleSubmit">
          <UserName v-model="formItem.username" name="username" />
          <Password v-model="formItem.password" name="password" />
          <div class="demo-auto-login">
            <Checkbox v-model="formItem.isKeepLoading" size="large">自动登录</Checkbox>
            <a>忘记密码</a>
          </div>
          <Submit />
        </Login>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const formItem = ref({ username: "", password: "", isKeepLoading: true });
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100%;
  background: url("../assets/img/login-bg.svg");
  background-size: contain;
  // background-color: red;
}
</style>
