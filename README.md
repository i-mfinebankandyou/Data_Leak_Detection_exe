# Data_Leak_Detection_exe

OS (window, mac)에 따라 `package.json` 내용을 다르게 해야 함

### mac `package.json` 설정

```jsonc
{
  "name": "ai-leak-detector",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "electron.js",
  "scripts": {
    "dev": "concurrently \"vite\" \"wait-on http://localhost:5173 && electron .\"",
    "build": "tsc -b && vite build",
    "dist": "vite build && electron-builder --mac --config.mac.identity=null"
  },
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@types/node": "^24.6.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "concurrently": "^9.0.1",
    "electron": "^39.0.0",
    "electron-builder": "^25.1.8",
    "typescript": "~5.9.3",
    "vite": "^7.1.7",
    "wait-on": "^7.2.0"
  },
  "build": {
    "appId": "com.example.aileakdetector",
    "mac": {
      "target": "dmg",
      "category": "public.app-category.utilities",
      "identity": null
    },
    "dmg": {
      "format": "ULFO"
    },
    "directories": {
      "buildResources": "assets",
      "app": "."
    },
    "files": [
      "dist/**/*",
      "electron.js",
      "package.json"
    ]
  }
}
```
### window `package.json` 설정

```jsonc
{
  "name": "ai-leak-detector",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "main": "electron.js",
  "scripts": {
    "dev": "concurrently \"vite\" \"wait-on http://localhost:5173 && electron .\"",
    "build": "vite build",
    "dist": "vite build && electron-builder --win"
  },
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  },
  "devDependencies": {
    "@types/node": "^24.6.0",
    "@types/react": "^19.1.16",
    "@types/react-dom": "^19.1.9",
    "@vitejs/plugin-react": "^5.0.4",
    "concurrently": "^9.0.1",
    "electron": "^39.0.0",
    "electron-builder": "^25.1.8",
    "typescript": "~5.9.3",
    "vite": "^7.1.7",
    "wait-on": "^7.2.0"
  },
  "build": {
    "appId": "com.example.aileakdetector",
    "win": {
      "target": "nsis",
      "icon": "assets/icon.ico"
    },
    "directories": {
      "buildResources": "assets",
      "app": "."
    },
    "files": [
      "dist/**/*",
      "electron.js",
      "package.json"
    ]
  }
}
```
### 개발 모드 실행

```bash
npm run dev
```
이후 localhost:5173으로 접속

### 빌드

```bash
npm run dist
```
이후 dist 폴더 생성되고 os가 mac이면 폴더 내부에 dmg가, window면 exe가 추가됨