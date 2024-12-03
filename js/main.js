import { fetchNews } from './api.js';
import { createArticleCard } from './utils.js';
import { mockArticles } from './mockData.js';

async function initHomepage() {
    try {
        // Fetch featured articles
        const featuredArticles = await fetchNews('technology', 'future');
        
        if (featuredArticles && featuredArticles.length > 0) {
            const featuredArticle = featuredArticles[0];
            document.querySelector('.featured-article').innerHTML = `
                <article class="featured">
                    <img src="${featuredArticle.urlToImage || '/images/placeholder.jpg'}" alt="${featuredArticle.title}">
                    <div class="content">
                        <h2><a href="/article.html?id=${encodeURIComponent(featuredArticle.url)}">${featuredArticle.title}</a></h2>
                        <p>${featuredArticle.description}</p>
                    </div>
                </article>
            `;
        }

        // Fetch latest articles
        const latestArticles = await fetchNews();
        if (latestArticles && latestArticles.length > 0) {
            document.getElementById('latest-articles').innerHTML = 
                latestArticles.slice(0, 6).map(createArticleCard).join('');
        }

        // Fetch most read articles
        const mostReadArticles = mockArticles.filter(article => 
            ['#flying-cars', '#carbon-levels', '#mind-reading-social', '#underwater-cities'].includes(article.url)
        );
        
        if (mostReadArticles && mostReadArticles.length > 0) {
            document.getElementById('trending-articles').innerHTML = 
                mostReadArticles.map(createArticleCard).join('');
        }
    } catch (error) {
        console.error('Error initializing homepage:', error);
        document.querySelector('.featured-article').innerHTML = `
            <div class="error-message">
                <p>Unable to load featured articles. Please try again later.</p>
            </div>
        `;
    }
}

// Initialize the homepage when the DOM is loaded
document.addEventListener('DOMContentLoaded', initHomepage);