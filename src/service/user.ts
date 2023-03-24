/* eslint-disable @typescript-eslint/no-namespace */
import { IUser } from '../store/type';
import axios from './';
namespace Login {
  // 用户登录表单
  export interface LoginReqForm {
    username: string;
    password: string;
  }
  // 登录成功后返回的token
  export interface LoginResData {
    msg: string;
    data: IUser;
  }
}
namespace Reg {
  // 用户注册表单
  export interface RegReqForm {
    username: string;
    password: string;
    repassword: string;
  }
  // 登录成功后返回的token
  export interface RegResData {
    msg: string;
    data: IUser;
  }
}
namespace Logout {
  // 退出登录成功后返回的数据
  export interface LogoutResData {
    msg: string;
    data: string;
  }
}

// 用户登录
const login = (params: Login.LoginReqForm) => {
  // 返回的数据格式可以和服务端约定
  return axios.post<Login.LoginResData>('/user/login', params);
};

// 用户登录
const register = (params: Reg.RegReqForm) => {
  // 返回的数据格式可以和服务端约定
  return axios.post<Reg.RegResData>('/user/reg', params);
};

// 用户退出登录
const logout = () => {
  // 返回的数据格式可以和服务端约定
  return axios.get<Logout.LogoutResData>('/user/logout', { token: true });
};

export { login, register, logout };
