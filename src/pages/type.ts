interface IListItem {
  type: string;
  name: string;
  url: string;
  created_time: string;
  id: number;
  checked: boolean;
}
interface IEmitElement {
  method: string;
  item?: IListItem;
  id?: number;
  index?: number;
  value?: boolean | string;
  newName?: string;
}
interface IDirs {
  id: number;
  name: string;
}
export type { IListItem, IDirs, IEmitElement };
