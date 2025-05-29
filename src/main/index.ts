import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
function createWindow(): void {
  // 새 창을 만드는 코드
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670, // width, height : 크기
    show: false,
    autoHideMenuBar: true, // 메뉴바 자동 숨김
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      // preload : 렌더러에서 Node.js 기능을 일부 쓸 수 있게 미리 스크립트 로드
      sandbox: false // 샌드박스 비활성화 (보안관련)
    }
  })

  // 창이 준비되면 보여줌
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  // 새 창을 열려고 할 때, 외부 브라우저로 링크를 열고, Electron 창에서는 열지 않음
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // 개발 중이라면 개발 서버 주소로 접속
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    // 배포된 거라면 빌드된 HTML 파일 로드
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// 앱이 준비되면
app.whenReady().then(() => {
  // 윈도우즈에서 앱의 고유 ID 설정 (알림, 작업 표시줄 등에서 앱을 구분할 때 필요함)
  electronApp.setAppUserModelId('com.electron')

  // 새 창이 만들어지면, 개발 중이면 단축키 자동 관리
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // 앱의 메인 창 하나 만듦
  createWindow()

  // 맥OS에서 Dock 아이콘 클릭했을 때, 열려있는 창 없으면 새 창 만듦
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 모든 창이 닫히면 앱 종료. 맥(darwin)은 앱이 계속 실행되며, Cmd+Q로 종료해야만 앱 종료
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
