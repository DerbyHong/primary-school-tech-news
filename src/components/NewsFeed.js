import NewsCard from './NewsCard';
import styles from './NewsFeed.module.css';

export default function NewsFeed({ news }) {
    if (!news || news.length === 0) {
        return <div className={styles.empty}>目前沒有最新新聞。</div>;
    }

    return (
        <div className={styles.grid}>
            {news.map((item, index) => (
                <NewsCard key={index} item={item} />
            ))}
        </div>
    );
}
