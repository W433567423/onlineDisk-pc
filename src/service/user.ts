/* eslint-disable @typescript-eslint/no-namespace */
import { IUser } from '../store/type';
import axios from './';
namespace User {
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
  // 退出登录成功后返回的数据
  export interface LogoutResData {
    msg: string;
    data: string;
  }
  // 获取容量成功后返回的数据
  export interface SizeResData {
    total_size: number;
    used_size: number;
  }
}

// 用户登录
const login = (params: User.LoginReqForm) => {
  return axios.post<User.LoginResData>('/user/login', params);
};

// 用户登录
const register = (params: User.RegReqForm) => {
  return axios.post<User.RegResData>('/user/reg', params);
};

// 用户退出登录
const logout = () => {
  return axios.get<User.LogoutResData>('/user/logout', { token: true });
};

// 用户容量
const getSize = () => {
  return axios.get<User.SizeResData>('/user/getSize', { token: true });
};

export { login, register, logout, getSize };
