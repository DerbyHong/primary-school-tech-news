# 專案交付說明書 (Walkthrough)

## 📌 完成項目
本專案已完成 MVP 版本的「小學科技新聞助手」。

- **技術架構**: Next.js App Router + Vanilla CSS (Design Tokens).
- **資料來源**: 教育部、科技新報、泛科學、公視 (爬蟲模組)。
- **自動化**: 已設定 `scripts/gen-news.js` 與 GitHub Actions 排程 (每週一更新)。
- **資料儲存**: 檔案式 JSON (`public/data/news.json`)，零成本。

## 📂 檔案結構
```
ProjectH/
├── .github/workflows/   # 自動化排程設定
├── src/
│   ├── app/             # 前端頁面 (page.js, globals.css)
│   ├── components/      # UI 元件 (NewsCard, NewsFeed)
│   └── lib/             # 核心邏輯 (crawler.js)
├── scripts/             # 執行腳本 (gen-news.js)
├── public/data/         # 新聞資料存檔 (news.json)
└── task.md              # 專案進度表
```

## ✅ 驗證結果

### 1. 爬蟲測試
執行指令：`node scripts/gen-news.js`
結果：
- 成功抓取由 TechNews、泛科學等來源的新聞。
- 自動過濾掉「股市」、「營收」等不適合關鍵字。
- 產出 `public/data/news.json` (目前約 11 筆資料)。

### 2. 建置測試
執行指令：`npm run build`
結果：
- **Compiled successfully**.
- 首頁 `/` 成功預渲染 (Static Prerender)。

### 3. 本地預覽
您可以執行以下指令開啟測試伺服器：
```bash
npm run dev
```
然後打開瀏覽器存取 [http://localhost:3000](http://localhost:3000)。

## 🚀 部署建議
建議直接將本專案推送到 GitHub：
1. `git add .`
2. `git commit -m "feat: complete mvp"`
3. `git push`
4. 前往 [Vercel](https://vercel.com) 連結此 Repository，即可自動部署。

## ⚠️ 注意事項
- **數位時代 RSS**: 目前回傳 404，建議後續檢查 URL 是否更換，或改用 HTML 爬蟲方式。
- **圖片**: 目前僅抓取標題與文字摘要，未抓取圖片以避免版權爭議。
