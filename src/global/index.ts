import { App } from 'vue'
import registerView from './registerView'
import Viewer from 'v-viewer'

export function registerApp(app: App) {
  //注册view-ui-plus
  registerView(app)
  app.component('Viewer', Viewer)
}
