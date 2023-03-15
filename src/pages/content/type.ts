import { IListItem } from '../type'
export interface IEmitElement {
  method: string
  item?: IListItem
  index: number
  value?: boolean
  newName?: string
}
