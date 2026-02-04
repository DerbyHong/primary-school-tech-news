const fs = require('fs');
const path = require('path');
const { fetchNews } = require('../src/lib/crawler');

async function main() {
    try {
        console.log('Starting news update...');
        const news = await fetchNews();

        // Ensure data directory exists
        const dataDir = path.join(__dirname, '../public/data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        const filePath = path.join(dataDir, 'news.json');
        fs.writeFileSync(filePath, JSON.stringify(news, null, 2));

        console.log(`Successfully saved ${news.length} items to ${filePath}`);

    } catch (error) {
        console.error('Failed to update news:', error);
        process.exit(1);
    }
}

main();
