import { IUser } from './type';
const userModule = {
  namespaced: true,
  state() {
    return {
      user: null,
      token: '',
    };
  },
  mutations: {
    changeUser(state: any, user: IUser) {
      state.user = user;
    },
    changeToken(state: any, token: string) {
      state.token = token;
    },
  },
  actions: {
    // 用户登录
    userLogin(context: any, user: IUser) {
      context.commit('changeUser', user);
      context.commit('changeToken', user.token);
      window.localStorage.setItem('user', JSON.stringify(user));
      window.localStorage.setItem('token', user.token);
    },

    // 清除登录状态
    clearStatus(context: any) {
      context.state.user = null;
      context.state.token = '';
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
    },

    // 初始化数据
    initUser(context: any) {
      const user = window.localStorage.getItem('user');
      if (typeof user === 'string') {
        context.commit('changeUser', JSON.parse(user));
        context.commit('changeToken', window.localStorage.getItem('token'));
      }
    },
  },
};
export default userModule;
