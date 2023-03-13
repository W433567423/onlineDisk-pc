<template>
  <div class="login">
    <div class="d-flex justify-content-center" style="height: 100vh">
      <div
        class="rounded p-3"
        style="
          width: 380px;
          margin-top: 50px;
          height: max-content;
          background-color: #e8eaec;
        ">
        <div
          class="d-flex flex-column align-items-center justify-content-center">
          <div class="d-flex align-items-center">
            <Icon type="md-briefcase" size="55" color="#2d8cf0" />
            <h3 class="text-muted ms-2">涂涂の网盘</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.login {
  height: 100vh;
  width: 100%;
  background: url('../assets/img/login-bg.svg');
  background-size: contain;
  // background-color: red;
}
</style>
