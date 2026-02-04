import fs from 'fs/promises';
import path from 'path';
import NewsFeed from '@/components/NewsFeed';
import styles from './page.module.css';

async function getNewsData() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'news.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading news data:', error);
    return [];
  }
}

export const metadata = {
  title: '小學科技新聞週報',
  description: '每週更新，專為小學老師備課篩選的科技新聞',
};

export default async function Home() {
  const news = await getNewsData();
  const latestUpdate = news.length > 0 ? new Date(news[0].pubDate).toLocaleDateString('zh-TW') : '';

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>
            小學科技新聞週報
            <span className={styles.badge}>Beta</span>
          </h1>
          <p className={styles.subtitle}>
            每週更新 • 專為備課精選
            {latestUpdate && <span className={styles.updateTime}> (最新更新: {latestUpdate})</span>}
          </p>
        </div>
      </header>

      <div className="container">
        <NewsFeed news={news} />
      </div>

      <footer className={styles.footer}>
        <div className="container">
          <p>資料來源：各大科技媒體 RSS (僅供教學教育用途 reference)</p>
          <a href="https://github.com/your-repo/issues" target="_blank" className={styles.feedback}>
            回報問題
          </a>
        </div>
      </footer>
    </main>
  );
}
