export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function createArticleCard(article) {
    return `
        <article class="article-card">
            <img src="${article.urlToImage || '/images/placeholder.jpg'}" alt="${article.title}">
            <div class="content">
                <h3><a href="/article.html?id=${encodeURIComponent(article.url)}">${article.title}</a></h3>
                <p>${article.description || ''}</p>
                <div class="meta">
                    <span class="date">${formatDate(article.publishedAt)}</span>
                    <span class="author">${article.author || 'Anonymous'}</span>
                </div>
            </div>
        </article>
    `;
}

export function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}