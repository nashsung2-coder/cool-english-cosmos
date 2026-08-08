# Cool English 星辰啟航 — Cloudflare Pages 部署指南

## 📋 目錄

1. [快速開始](#快速開始)
2. [前置準備](#前置準備)
3. [GitHub 設定](#github-設定)
4. [Cloudflare Pages 設定](#cloudflare-pages-設定)
5. [自動部署](#自動部署)
6. [手動部署](#手動部署)
7. [故障排除](#故障排除)

---

## 🚀 快速開始

本專案已配置完成，可直接部署至 Cloudflare Pages。以下是部署流程：

### 最簡單的方式：使用 GitHub Actions 自動部署

1. **推送代碼到 GitHub**
   ```bash
   git push origin main
   ```

2. **GitHub Actions 自動構建並部署**
   - 工作流程文件：`.github/workflows/deploy.yml`
   - 每次推送至 `main` 分支時自動觸發

3. **訪問你的網站**
   - 默認域名：`https://cool-english-cosmos.pages.dev`
   - 自定義域名：在 Cloudflare Pages 設定中配置

---

## 📝 前置準備

### 必需工具

- **Node.js** 22+ 版本
- **pnpm** 10+（已在 `package.json` 中指定）
- **Git** 版本控制
- **Cloudflare 帳戶**（免費）
- **GitHub 帳戶**

### 本地開發

```bash
# 安裝依賴
pnpm install

# 啟動開發伺服器
pnpm dev

# 構建生產版本
pnpm build

# 預覽生產版本
pnpm preview
```

---

## 🔐 GitHub 設定

### 1. 建立 GitHub 儲存庫

```bash
# 初始化 Git（如果尚未初始化）
git init

# 新增遠端儲存庫
git remote add origin https://github.com/YOUR_USERNAME/cool-english-cosmos.git

# 推送代碼
git branch -M main
git push -u origin main
```

### 2. 設定 GitHub Secrets

在 GitHub 儲存庫設定中，新增以下 Secrets：

| Secret 名稱 | 說明 | 取得方式 |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API 令牌 | [Cloudflare Dashboard](https://dash.cloudflare.com/profile/api-tokens) |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 帳戶 ID | [Cloudflare Dashboard](https://dash.cloudflare.com/) |

**設定步驟：**
1. 進入 GitHub 儲存庫 → Settings → Secrets and variables → Actions
2. 點擊 "New repository secret"
3. 輸入 Secret 名稱與值
4. 保存

---

## ⚙️ Cloudflare Pages 設定

### 1. 連結 GitHub 帳戶

1. 登入 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 進入 **Pages** 頁面
3. 點擊 "Connect to Git"
4. 授權 GitHub 帳戶

### 2. 建立 Pages 專案

1. 選擇 `cool-english-cosmos` 儲存庫
2. 配置構建設定：
   - **Framework preset**：Vite
   - **Build command**：`pnpm build`
   - **Build output directory**：`dist/public`
   - **Root directory**：`/`（默認）

3. 設定環境變數（如需要）
4. 點擊 "Save and Deploy"

### 3. 自定義域名（可選）

1. 進入 Pages 專案設定
2. 進入 **Custom domains** 標籤
3. 點擊 "Set up a custom domain"
4. 輸入你的域名（例如 `cool-english.com`）
5. 按照指示配置 DNS 記錄

---

## 🔄 自動部署

### GitHub Actions 工作流程

工作流程文件位置：`.github/workflows/deploy.yml`

**觸發條件：**
- 推送至 `main` 分支
- 拉取請求至 `main` 分支（預覽部署）

**工作流程步驟：**
1. 檢出代碼
2. 設定 Node.js 環境
3. 安裝 pnpm
4. 安裝依賴
5. 構建專案
6. 部署至 Cloudflare Pages

**查看部署狀態：**
- 進入 GitHub 儲存庫 → Actions 標籤
- 查看最新工作流程執行結果

---

## 🛠️ 手動部署

### 使用 Wrangler CLI

如果偏好手動部署，可使用 Wrangler：

```bash
# 安裝 Wrangler
npm install -g wrangler

# 登入 Cloudflare
wrangler login

# 構建專案
pnpm build

# 部署至 Cloudflare Pages
wrangler pages deploy dist/public --project-name=cool-english-cosmos
```

### 使用 Cloudflare Dashboard

1. 進入 Cloudflare Dashboard → Pages
2. 選擇 `cool-english-cosmos` 專案
3. 進入 **Deployments** 標籤
4. 點擊 "Create deployment"
5. 上傳 `dist/public` 資料夾

---

## 📊 構建配置

### package.json 構建腳本

```json
{
  "scripts": {
    "dev": "vite --host",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "preview": "vite preview --host",
    "check": "tsc --noEmit"
  }
}
```

### Vite 配置

Vite 配置文件：`vite.config.ts`

關鍵配置：
- **輸出目錄**：`dist/public`
- **基礎路徑**：`/`
- **環境變數前綴**：`VITE_`

---

## 🐛 故障排除

### 問題：部署失敗，提示 "Cannot find module"

**解決方案：**
```bash
# 清除 node_modules 並重新安裝
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm build
```

### 問題：構建超時

**解決方案：**
- 檢查 `package.json` 中的依賴是否過多
- 考慮移除不必要的依賴
- 增加 Cloudflare Pages 構建超時時間（在 Pages 設定中）

### 問題：環境變數未被正確加載

**解決方案：**
- 確保環境變數名稱以 `VITE_` 開頭
- 在 Cloudflare Pages 設定中重新檢查環境變數
- 清除瀏覽器快取並重新訪問

### 問題：CSS 樣式未正確應用

**解決方案：**
- 確保 Tailwind CSS 已正確配置
- 檢查 `client/src/index.css` 是否被正確導入
- 清除 `.next` 或 `dist` 資料夾並重新構建

---

## 📚 相關資源

- [Cloudflare Pages 文檔](https://developers.cloudflare.com/pages/)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions 文檔](https://docs.github.com/en/actions)
- [Wrangler CLI 文檔](https://developers.cloudflare.com/workers/wrangler/)

---

## 🎯 後續步驟

1. **設定自定義域名** — 將 `cool-english-cosmos.pages.dev` 指向你的域名
2. **配置 SSL/TLS** — Cloudflare 自動提供免費 SSL 證書
3. **設定分析** — 在 Cloudflare Dashboard 中啟用頁面分析
4. **監控性能** — 使用 Cloudflare 提供的性能監控工具

---

**祝你部署順利！🚀**

如有任何問題，請參考 [Cloudflare Pages 支援](https://support.cloudflare.com/)。
