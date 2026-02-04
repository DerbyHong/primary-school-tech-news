# 實作計畫書 (Implementation Plan) - 小學資訊教學科技新聞助手

## 目標 (Goal Description)
開發一個 MVP 版本的網頁應用程式，自動彙整適合小學生的科技新聞，提供老師備課使用。依據規格書，重點在於「快」、「適用性高」與「極簡操作」。

## 需使用者審閱 (User Review Required)
> [!IMPORTANT]
> **技術選型**:
> - **框架**: Next.js (React) - 支援快速開發與伺服器端渲染 (SEO 友善)。
> - **樣式**: Vanilla CSS (CSS Modules) - 依照您的偏好，不使用 TailwindCSS，確保靈活度與效能。
> - **資料庫**: 檔案式資料庫 (JSON) - 配合 GitHub Actions 定期抓取並寫回儲存庫，實現「零成本」與「累積」目標。
> - **部署**: 建議使用 Vercel (搭配 GitHub)。

## 擬定變更 (Proposed Changes)

### 專案設定 [Project Setup]
#### [NEW] 專案基礎建設
- 初始化 Next.js 專案 (App Router)。
- 設定基礎 CSS 變數 (Design Tokens) 與全域樣式。
- 設定 ESLint 與 Prettier (符合您的偏好)。

### 資料採集與後端 [Backend & Data]
#### [NEW] 爬蟲模組 `lib/crawler`
- 實作 RSS 解析器 (`rss-parser`) 與 HTML 解析器 (`cheerio`)。
- 針對指定來源 (教育部、TechNews、數位時代、泛科學、公視) 實作個別抓取邏輯。

#### [NEW] 資料處理模組 `lib/processor`
- 實作關鍵字過濾器 (白名單/黑名單)。
- 實作資料正規化 (統一轉換為標準 NewsItem 格式)。

#### [NEW] 儲存機制
- 實作 JSON 讀寫邏輯，作為簡易資料庫。
- 設定 GitHub Actions workflow (`.github/workflows/update-news.yml`) 定期執行抓取腳本。

### 前端開發 [Frontend]
#### [NEW] UI 元件
- `components/NewsCard`: 展示單則新聞，包含標題、來源、日期、標籤。
- `components/Header`: 包含標題與更新資訊。
- `components/NewsFeed`: 新聞列表容器。

#### [NEW] 頁面
- `app/page.js`: 主頁面，伺服器端讀取 JSON 資料並渲染。

## 驗證計畫 (Verification Plan)

### 自動化測試
- 撰寫單元測試驗證過濾邏輯 (確保黑名單關鍵字被正確過濾)。
- 測試爬蟲針對各個來源的解析是否正確 (Mock 來源資料)。

### 手動驗證
- **抓取測試**: 手動執行抓取腳本，確認能產生 `data/news.json`。
- **介面測試**:
    - 確認首頁載入速度 < 2秒。
    - 確認 RWD 在手機與桌機版面正常。
    - 確認點擊新聞能正確開啟原始網頁。
