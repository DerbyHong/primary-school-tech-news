const Parser = require('rss-parser');
const cheerio = require('cheerio');

const parser = new Parser();

// Configuration for sources
const SOURCES = [
  {
    name: 'TechNews 科技新報',
    type: 'rss',
    url: 'https://technews.tw/feed/',
    category: 'tech'
  },
  {
    name: 'Business Next 數位時代',
    type: 'rss',
    url: 'https://www.bnext.com.tw/rss',
    category: 'tech'
  },
  {
    name: 'PanSci 泛科學',
    type: 'rss',
    url: 'https://pansci.asia/feed',
    category: 'science'
  },
  {
      name: '公視新聞網',
      type: 'rss',
      url: 'https://news.pts.org.tw/xml/newsfeed.xml', // Example feed, need verification if specific category exists
      category: 'general'
  }
];

// Keywords for filtering (Simple MVP version)
const WHITELIST = [
  'AI', '機器人', '太空', '環保', '資安', '程式', '發明', '科普', '科學', 
  'ChatGPT', '生成式', '無人機', '電動車', '永續'
];

const BLACKLIST = [
  '股市', '營收', '獲利', '股價', '投資', '併購', '裁員', '政治', '殺', '死', '色情'
];

async function fetchNews() {
  let allNews = [];

  for (const source of SOURCES) {
    try {
      console.log(`Fetching from ${source.name}...`);
      
      let items = [];
      if (source.type === 'rss') {
        const feed = await parser.parseURL(source.url);
        items = feed.items.map(item => ({
          title: item.title,
          url: item.link,
          pubDate: new Date(item.pubDate),
          source: source.name,
          contentSnippet: item.contentSnippet || item.content || ''
        }));
      }
      
      // Filter items
      const filtered = items.filter(item => {
        const text = (item.title + ' ' + item.contentSnippet).toLowerCase();
        
        // Check Blacklist
        const hasBlacklisted = BLACKLIST.some(keyword => text.includes(keyword.toLowerCase()));
        if (hasBlacklisted) return false;

        // Check Whitelist (Relaxed for MVP: If it's from a trusted source, we might be more lenient, 
        // but for now strict whitelist ensures relevance)
        const hasWhitelisted = WHITELIST.some(keyword => text.includes(keyword.toLowerCase()));
        return hasWhitelisted;
      });

      allNews = [...allNews, ...filtered];

    } catch (error) {
      console.error(`Error fetching ${source.name}:`, error.message);
    }
  }

  // Sort by date desc
  allNews.sort((a, b) => b.pubDate - a.pubDate);

  console.log(`Total collected: ${allNews.length} items`);
  return allNews;
}

module.exports = { fetchNews };
