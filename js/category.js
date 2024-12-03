import { fetchNews } from './api.js';
import { getQueryParam, createArticleCard, formatDate } from './utils.js';
import { mockArticles } from './mockData.js';

const categoryDescriptions = {
    technology: "Explore the cutting-edge innovations shaping our future, from quantum computing to neural interfaces and beyond.",
    science: "Discover groundbreaking scientific achievements, space exploration, and revolutionary discoveries transforming our understanding of the universe.",
    business: "Stay informed about the evolving global economy, space commerce, and technological disruptions in the business world."
};

async function loadCategory() {
    const category = getQueryParam('category');
    if (!category) {
        showError('Category not found');
        return;
    }

    // Update page title
    document.title = `${category.charAt(0).toUpperCase() + category.slice(1)} - CZUNews`;

    // Update breadcrumb
    document.getElementById('breadcrumb').innerHTML = `
        <a href="/">Home</a> >
        <span>${category.charAt(0).toUpperCase() + category.slice(1)}</span>
    `;

    // Update category header
    document.querySelector('.category-title').textContent = 
        `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
    document.querySelector('.category-description').textContent = 
        categoryDescriptions[category] || '';

    try {
        const articles = await fetchNews(category);
        if (articles && articles.length > 0) {
            // Update stats
            document.getElementById('articles-count').textContent = articles.length;
            
            const uniqueAuthors = new Set(articles.map(article => article.author)).size;
            document.getElementById('authors-count').textContent = uniqueAuthors;
            
            const latestArticle = articles.reduce((latest, article) => 
                new Date(article.publishedAt) > new Date(latest.publishedAt) ? article : latest
            );
            document.getElementById('latest-update').textContent = 
                formatDate(latestArticle.publishedAt);

            // Display articles
            document.getElementById('category-articles').innerHTML = 
                articles.map(createArticleCard).join('');
        } else {
            showError('No articles found in this category');
        }
    } catch (error) {
        console.error('Error loading category:', error);
        showError('Failed to load articles');
    }
}

function showError(message) {
    document.getElementById('category-articles').innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <a href="/" class="btn">Return to Homepage</a>
        </div>
    `;
}

// Initialize category page when DOM is loaded
document.addEventListener('DOMContentLoaded', loadCategory);