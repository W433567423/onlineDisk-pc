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

export type { IUser, IRawlistItem };
