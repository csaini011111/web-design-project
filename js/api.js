import { CONFIG } from './config.js';
import { mockArticles } from './mockData.js';

export async function fetchNews(category = '', query = '') {
    // Use mock data if API key is not set
    if (CONFIG.API_KEY === 'YOUR_NEWS_API_KEY') {
        let articles = [...mockArticles];
        
        if (category) {
            articles = articles.filter(article => article.category === category);
        }
        
        if (query) {
            const searchTerm = query.toLowerCase();
            articles = articles.filter(article => 
                article.title.toLowerCase().includes(searchTerm) ||
                article.description.toLowerCase().includes(searchTerm)
            );
        }
        
        return articles;
    }

    // Use real API if key is set
    try {
        let url = `${CONFIG.API_BASE_URL}/top-headlines?apiKey=${CONFIG.API_KEY}`;
        
        if (category) {
            url += `&category=${category}`;
        }
        
        if (query) {
            url += `&q=${encodeURIComponent(query)}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch news');
        }
        
        return data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return mockArticles; // Fallback to mock data on error
    }
}