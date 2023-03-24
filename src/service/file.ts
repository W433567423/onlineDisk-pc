/* eslint-disable @typescript-eslint/no-namespace */
import axios from './';
import { IRawlistItem } from '../store/type';

namespace File {
  export interface IDataRows {
    rows: Array<IRawlistItem>;
  }
  // 返回的文件列表
  export interface FileResDataRows {
    msg: string;
    data: IDataRows;
  }
}

// 获取文件列表
const getFileList = (file_id: number) => {
  // 返回的数据格式可以和服务端约定
  return axios.get<File.IDataRows>('/file/list?file_id=' + file_id, { token: true });
};

export { getFileList };
