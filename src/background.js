"use strict";

import { app, protocol, BrowserWindow, Menu, globalShortcut } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1330,
    height: 960,
    minWidth: 1330,
    minHeight: 600,
    backgroundColor: '#f5f5f5',
    icon: `${__static}/app.ico`,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    }
  });
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
  createMenu();
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    //加载本地已安装的vue-devTool
    if (process.env.NODE_ENV === "development") {
      // 这里直接拷贝你的完整路径，要精确到文件夹，文件夹下面的会有一个manifest.js，接口回去加载这个文件
      let toolsPath =
        "C:/Users/User/AppData/Local/Google/Chrome/User Data/Default/Extensions/nhdogjmejiglipccpnnnanhbledajbpd/5.1.0_1";
      // 这个API会返回插件的扩展名
      let toolName = BrowserWindow.addDevToolsExtension(toolsPath);
      console.log("扩展名", toolName);
    }
    globalShortcut.register("CommandOrControl+Shift+i", function() {
      win.webContents.openDevTools();
    });
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

function createMenu() {
  // darwin表示macOS，针对macOS的设置
  if (process.platform === "darwin") {
    const template = [
      {
        label: "App Demo",
        submenu: [
          {
            role: "about"
          },
          {
            role: "quit"
          }
        ]
      }
    ];
    let menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null);
  }
}
