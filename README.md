# Cool English 星辰啟航

**Cool English 外掛式智慧學習入口** — 以「內在宇宙探索」為核心隱喻，打造兼具專業感與情感溫度的英語學習指揮中心。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-22%2B-green.svg)
![React](https://img.shields.io/badge/react-19-blue.svg)
![Tailwind](https://img.shields.io/badge/tailwind-4-38B2AC.svg)

---

## 🌟 特色

### 設計哲學：深空極簡主義

- **靜謐深度** — 最深背景 `#0B0C10`（宇宙黑），營造無邊際的專注感
- **玻璃擬態透明感** — 卡片背景 `rgba(255,255,255,0.03)` 搭配 `rgba(255,255,255,0.06)` 邊框，呈現浮動感
- **精準數據視覺** — 使用 `JetBrains Mono` 等寬字體強調數字、等級、進度，傳達科學感
- **柔光粒子流動** — 大廳頁面使用 Canvas 粒子系統，其餘頁面保持靜態以利專注

### 五大核心模組

#### 1️⃣ 大廳 — 星辰啟航
- Hero 區：動態星雲背景與逐字浮現標題
- 四大入口卡片：專攻區、遊戲模式、家長區、教師區
- 聚光燈效果：懸停時其餘卡片降低亮度
- 粒子背景：Canvas 粒子系統，緩慢流動星雲

#### 2️⃣ 專攻區 — 心流之間
- **戰力現狀** — 六維雷達圖、目標設定、進度統計
- **技能樹** — 節點解鎖系統、進度追蹤、技能詳情
- **學習路徑** — 任務清單、月曆熱力圖、進度管理
- **自我紀錄** — 成就勳章、歷史雷達、學習日誌

#### 3️⃣ 遊戲模式 — 星辰冒險
- **星際地圖** — 環形軌道、六顆知識星球、征服進度
- **知識遠征** — 關卡地圖、戰鬥動畫、獎勵系統
- **寵物競技場** — 對戰系統、排名追蹤、道具使用
- **背包寶庫** — 道具管理、裝備合成、寵物外觀

#### 4️⃣ 家長區 — 親子星港
- **成長摘要** — 亮點數字、寵物夥伴、趨勢提示
- **能力風景** — 柔化雷達圖、口語化描述、趨勢箭頭
- **親子共學艙** — 推薦套餐、共同目標、進度追蹤
- **成長相簿** — 里程碑卡片、拍立得風格、分享功能
- **加油小棧** — 貼圖與鼓勵語、臨時遊戲 Buff、發送限制

#### 5️⃣ 教師區 — 班級指揮艙
- **班級戰情** — 摘要卡片、能力熱力圖、系統建議
- **套餐工坊** — 套餐建立、派發管理、成效報告
- **學生總覽** — 學生名單、能力分析、個人剖面
- **榮譽殿堂** — 成就展示、排行榜、班級統計
- **班級設定** — 班級管理、通知設定、權限控制

---

## 🎨 色彩系統

### 全域底層色板

| 名稱 | 十六進制 | 用途 |
|---|---|---|
| 宇宙黑 | `#0B0C10` | 最深背景 |
| 深灰藍 | `#131B2E` / `#1A2240` | 主要面板 |
| 星光白 | `#E8ECF1` | 文字主色 |
| 星塵灰 | `#8896AB` | 文字次要 |
| 分隔線 | `rgba(255,255,255,0.06)` | 邊界線 |

### 主題色板（依入口）

| 入口 | 主色 | 輔色 |
|---|---|---|
| 大廳 | 星辰金 `#F0C45A` | 星雲紫 `#A977F4` |
| 專攻區 | 靜謐藍 `#60A5FA` | 技能色彩系統 |
| 遊戲模式 | 恆星金 `#FFD166` | 活力橙 `#FF7B42` / 薄荷綠 `#5CE0B8` |
| 家長區 | 治癒薄荷 `#5CC9A7` | 溫柔星塵金 `#F0C45A` |
| 教師區 | 智慧紫晶 `#A977F4` | 珊瑚警示 `#F07B6B` |

---

## 🛠️ 技術棧

### 前端框架

- **React 19** — 最新 React 版本，支援 Suspense、Server Components
- **TypeScript** — 類型安全的開發體驗
- **Tailwind CSS 4** — 原子化 CSS 框架，OKLCH 色彩格式
- **Wouter** — 輕量級路由庫，無依賴
- **shadcn/ui** — 高質量 UI 元件庫

### 構建工具

- **Vite 7** — 極速開發伺服器與構建工具
- **Esbuild** — 超快速 JavaScript 打包器
- **PostCSS** — CSS 後處理工具

### 部署

- **Cloudflare Pages** — 邊緣計算靜態托管
- **GitHub Actions** — CI/CD 自動部署工作流程

---

## 📦 專案結構

```
cool-english-cosmos/
├── client/                      # 前端代碼
│   ├── public/                  # 靜態資源（favicon、robots.txt）
│   ├── src/
│   │   ├── pages/               # 頁面組件
│   │   │   ├── Home.tsx         # 首頁（重定向至大廳）
│   │   │   ├── HallPage.tsx     # 大廳 - 星辰啟航
│   │   │   ├── SpecialtyPage.tsx # 專攻區 - 心流之間
│   │   │   ├── GamePage.tsx     # 遊戲模式 - 星辰冒險
│   │   │   ├── ParentPage.tsx   # 家長區 - 親子星港
│   │   │   └── TeacherPage.tsx  # 教師區 - 班級指揮艙
│   │   ├── components/          # 可重用 UI 元件
│   │   ├── contexts/            # React Context
│   │   ├── hooks/               # 自訂 React Hooks
│   │   ├── lib/                 # 工具函數
│   │   ├── App.tsx              # 應用主組件與路由
│   │   ├── main.tsx             # React 入口
│   │   └── index.css            # 全局樣式與設計令牌
│   └── index.html               # HTML 模板
├── server/                      # 伺服器代碼（靜態部署時不需要）
├── shared/                      # 共享類型與常數
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions 部署工作流程
├── ideas.md                     # 設計哲學與決策文檔
├── learning-resources.json      # Cool English 課程資源映射
├── DEPLOYMENT.md                # 部署指南
├── README.md                    # 本文件
├── package.json                 # 依賴管理
├── tsconfig.json                # TypeScript 配置
├── vite.config.ts               # Vite 配置
└── wrangler.toml                # Cloudflare Wrangler 配置
```

---

## 🚀 快速開始

### 本地開發

```bash
# 1. 克隆儲存庫
git clone https://github.com/YOUR_USERNAME/cool-english-cosmos.git
cd cool-english-cosmos

# 2. 安裝依賴
pnpm install

# 3. 啟動開發伺服器
pnpm dev

# 4. 在瀏覽器中打開
# http://localhost:3000
```

### 構建生產版本

```bash
# 構建
pnpm build

# 預覽生產版本
pnpm preview
```

---

## 📚 學習資源整合

專案已整合 Cool English 官方課程資源，涵蓋：

- **國小區** — 聽力、互動式學習、情境動畫
- **國中區** — 聽力、口說、閱讀、寫作
- **普高區** — 聽力、口說、閱讀、寫作、字彙

所有資源映射存儲在 `learning-resources.json` 中，可直接在各模組中調用。

---

## 🌐 部署至 Cloudflare Pages

### 自動部署（推薦）

1. 推送代碼至 GitHub
2. GitHub Actions 自動構建並部署
3. 訪問 `https://cool-english-cosmos.pages.dev`

### 手動部署

詳見 [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🎯 設計決策

### 為什麼選擇深空極簡主義？

1. **專注感** — 深色背景減少視覺干擾，提升學習專注力
2. **現代感** — 玻璃擬態與粒子效果營造科技感
3. **親和力** — 柔和的動畫與溫暖的色彩平衡專業感
4. **可訪問性** — 高對比度文字確保易讀性

### 為什麼使用 Tailwind CSS 4？

1. **OKLCH 色彩格式** — 更精確的色彩控制與一致性
2. **原子化設計** — 快速迭代與一致的設計系統
3. **響應式優先** — 移動端優先的設計方法
4. **性能優化** — 自動 PurgeCSS，最小化 CSS 體積

### 為什麼選擇 Cloudflare Pages？

1. **全球邊緣計算** — 低延遲、高速訪問
2. **免費 SSL/TLS** — 自動 HTTPS 加密
3. **無服務器** — 無需管理伺服器基礎設施
4. **GitHub 整合** — 無縫 CI/CD 工作流程

---

## 📖 文檔

- [設計哲學](./ideas.md) — 詳細的設計理念與決策
- [部署指南](./DEPLOYMENT.md) — 完整的部署步驟與故障排除
- [學習資源](./learning-resources.json) — Cool English 課程映射

---

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request！

### 開發流程

1. Fork 本儲存庫
2. 建立特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送至分支 (`git push origin feature/amazing-feature`)
5. 開啟 Pull Request

---

## 📄 授權

本專案採用 MIT 授權。詳見 [LICENSE](./LICENSE) 文件。

---

## 📞 聯絡方式

- **問題報告** — 在 GitHub Issues 中提交
- **功能建議** — 在 GitHub Discussions 中討論
- **安全漏洞** — 請勿公開披露，直接聯絡維護者

---

## 🙏 致謝

- **Cool English** — 提供豐富的英語學習資源
- **Cloudflare** — 提供高性能的邊緣計算平台
- **React 社群** — 提供優秀的前端框架與工具

---

## 📊 項目統計

| 指標 | 數值 |
|---|---|
| 代碼行數 | ~3,500+ |
| 頁面數量 | 5 |
| 組件數量 | 30+ |
| 設計令牌 | 50+ |
| 課程資源 | 100+ |
| 部署時間 | <2 分鐘 |

---

**祝你使用愉快！🌟**

如有任何問題或建議，歡迎提交 Issue 或 Pull Request。

---

*最後更新：2024 年 8 月*
