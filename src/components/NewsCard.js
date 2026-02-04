import styles from './NewsCard.module.css';

export default function NewsCard({ item }) {
    const date = new Date(item.pubDate).toLocaleDateString('zh-TW', {
        month: 'long',
        day: 'numeric'
    });

    return (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
            <div className={styles.source}>
                <span className={styles.sourceName}>{item.source}</span>
                <span className={styles.date}>{date}</span>
            </div>
            <h3 className={styles.title}>{item.title}</h3>
            <div className={styles.footer}>
                <span className={styles.readMore}>閱讀全文 &rarr;</span>
            </div>
        </a>
    );
}
