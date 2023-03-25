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
  // 搜索返回的文件列表
  export interface FileSearchResData {
    msg: string;
    data: Array<IRawlistItem>;
  }
}

// 获取文件列表
const getFileList = (file_id: number, type?: string) => {
  // 返回的数据格式可以和服务端约定
  return axios.get<File.IDataRows>('/file/list?file_id=' + file_id, { type, token: true });
};

// 新建文件夹
const mkDir = (file_id: number, name: string) => {
  return axios.post('/file/mkdir', { file_id, name, token: true });
};

// 重命名
const renameFile = (file_id: number, id: number, name: string) => {
  return axios.post('/file/rename', { file_id, name, id, token: true });
};

// 删除文件
const deleteFile = (ids: string) => {
  return axios.post('/file/delete', { ids, token: true });
};
// 搜索文件
const searchFiles = (keyword: string) => {
  return axios.get<Array<IRawlistItem>>('/file/search', { keyword, token: true });
};
export { getFileList, mkDir, renameFile, deleteFile, searchFiles };
