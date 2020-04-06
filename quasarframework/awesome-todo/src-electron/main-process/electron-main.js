import { app, BrowserWindow, nativeTheme, Menu } from 'electron'
import { menuTemplate } from './electron-main-menu-template.js'

try {
  if (process.platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(require('path').join(app.getPath('userData'), 'DevTools Extensions'))
  }
} catch (_) { }

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path').join(__dirname, 'statics').replace(/\\/g, '\\\\')
}

/**
 * Constants and variables
 */

let mainWindow

const menu = Menu.buildFromTemplate(menuTemplate)

/**
 * app ready
 */
app.on('ready', () => {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 500,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: QUASAR_NODE_INTEGRATION,
    }
  })

  mainWindow.loadURL(process.env.APP_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
    app.quit()
})
