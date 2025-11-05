import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools(); // ✅ 개발 중 콘솔 확인
  } else {
    const indexPath = path.join(__dirname, "dist", "index.html");
    console.log("📦 로드할 파일 경로:", indexPath);
    win.loadURL(`file://${indexPath}`);
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});