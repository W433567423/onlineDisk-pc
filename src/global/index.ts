import { App } from 'vue'
import registerView from './registerView'

export function registerApp(app: App) {
  //注册view-ui-plus
  registerView(app)
}
