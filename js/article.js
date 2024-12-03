import { mockArticles } from './mockData.js';
import { getQueryParam, formatDate, createArticleCard } from './utils.js';

async function loadArticle() {
    const articleId = getQueryParam('id');
    if (!articleId) {
        showError('Article not found');
        return;
    }

    // Find article in mock data
    const article = mockArticles.find(a => a.url === articleId);
    
    if (!article) {
        showError('Article not found');
        return;
    }

    // Update page title
    document.title = `${article.title} - CZUNews`;

    // Update breadcrumb
    document.getElementById('breadcrumb').innerHTML = `
        <a href="/">Home</a> >
        <a href="/category.html?category=${article.category}">${article.category}</a> >
        <span>${article.title}</span>
    `;

    // Update article content
    const articleDetail = document.querySelector('.article-detail');
    articleDetail.querySelector('.category').textContent = article.category;
    articleDetail.querySelector('.title').textContent = article.title;
    articleDetail.querySelector('.author').textContent = `By ${article.author}`;
    articleDetail.querySelector('.date').textContent = formatDate(article.publishedAt);
    articleDetail.querySelector('.main-image').src = article.urlToImage;
    articleDetail.querySelector('.main-image').alt = article.title;
    
    // Add article content
    articleDetail.querySelector('.content').innerHTML = `
        <p>${article.description}</p>
        <p>${article.content || generateLoremIpsum()}</p>
        <p>${generateLoremIpsum()}</p>
    `;

    // Load related articles from the same category
    const relatedArticles = mockArticles
        .filter(a => a.category === article.category && a.url !== articleId)
        .slice(0, 3);

    const relatedArticlesContainer = document.querySelector('.related-articles .articles-grid');
    if (relatedArticlesContainer) {
        relatedArticlesContainer.innerHTML = relatedArticles.map(createArticleCard).join('');
    }

    // Initialize social share buttons
    initializeSocialSharing(article);
}

function showError(message) {
    document.querySelector('.article-detail').innerHTML = `
        <div class="error-message">
            <p>${message}</p>
            <a href="/" class="btn">Return to Homepage</a>
        </div>
    `;
}

function generateLoremIpsum() {
    return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;
}

function initializeSocialSharing(article) {
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.dataset.platform;
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(article.title);
            
            let shareUrl = '';
            switch(platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Initialize article when DOM is loaded
document.addEventListener('DOMContentLoaded', loadArticle);