<template>
  <div class="login">
    <div class="d-flex justify-content-center" style="height: 100vh">
      <div class="rounded p-3" style="width: 380px; margin-top: 25vh; height: max-content; background-color: #e8eaec">
        <!-- 上方装饰 -->
        <div class="d-flex flex-column align-items-center justify-content-center mb-4">
          <div class="d-flex align-items-center mb-3">
            <Icon type="md-briefcase" size="55" color="#2d8cf0" />
            <h3 class="text-muted ms-2">涂涂の网盘</h3>
          </div>
          <span class="text-muted small">企业级网盘解决方案</span>
        </div>
        <!-- 登录/注册模块 -->
        <iForm ref="formRef" :label-width="0" :model="formItem" :rules="rules">
          <FormItem prop="username">
            <Input v-model="formItem.username" placeholder="请输入用户名..."></Input>
          </FormItem>
          <FormItem prop="password">
            <Input v-model="formItem.password" placeholder="请输入密码..." type="password"></Input>
          </FormItem>
          <FormItem prop="repassword" v-if="status === 'reg'">
            <Input v-model="formItem.repassword" placeholder="请输入确认密码..." type="password"></Input>
          </FormItem>
          <div class="d-flex align-items-center mb-2">
            <a href="#" class="small ms-auto" @click="changeStatus">{{ status === 'login' ? '注册账户' : '登录账户' }}</a>
          </div>
          <FormItem>
            <Button type="primary" long @click="handleSubmit">{{ status === 'login' ? '登 录' : '注 册' }}</Button>
          </FormItem>
        </iForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useStore } from 'vuex';
import { Message } from 'view-ui-plus';
import { useRouter } from 'vue-router';
import { login, register } from '../service/user';

const router = useRouter();
const store = useStore();

const formRef: Ref<any> = ref(null);
const status = ref('login');
const formItem = ref({ username: 'wtututu', password: '1234', repassword: '' });

// 校验规则
const rules = {
  username: [
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
  ],
  password: [
    {
      required: true,
      message: '密码不能为空！',
      trigger: 'blur',
    },
    {
      min: 4,
      message: '密码不能少于4位！',
      trigger: 'blur',
    },
  ],
  repassword: [
    {
      required: true,
      message: '确认密码不能为空！',
      trigger: 'blur',
    },
    {
      min: 4,
      message: '确认密码不能少于4位！',
      trigger: 'blur',
    },
  ],
};
// 提交事件
const handleSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (!valid) return;
    if (status.value === 'login')
      login(formItem.value)
        .then((res) => {
          store.dispatch('userModule/userLogin', res?.data);
          Message.success('登录成功');
          router.push({ path: '/wangpan' });
        })
        .catch((err) => {
          if (err.data) Message.error(err?.data);
        });
    else {
      register(formItem.value).then(() => {
        Message.success('注册成功，请先登录');
        status.value = 'login';
      });
    }
  });
};

// 切换登录/注册
const changeStatus = () => (status.value = status.value === 'login' ? 'reg' : 'login');
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
