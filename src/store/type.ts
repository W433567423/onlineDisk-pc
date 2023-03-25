interface IUser {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  desc: string;
  email: string;
  phone: number;
  sex: string;
  token: string;
  total_size: string;
  used_size: string;
  created_time: string;
  updated_time: string;
}
interface IRawlistItem {
  user_id: number;
  id: number;
  file_id: number;
  isdir: number;
  size: number;
  ext: string;
  md: string;
  name: string;
  url: string;
  created_time: string;
  updated_time: string;
}
interface ISizeData {
  total_size: number;
  used_size: number;
}
export type { IUser, IRawlistItem, ISizeData };
