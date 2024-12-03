const header = document.getElementById('main-header');

header.innerHTML = `
    <div class="header-top">
        <div class="logo">
            <a href="/">CZUNews</a>
        </div>
        <form class="search-form">
            <input type="search" placeholder="Search news...">
            <button type="submit">Search</button>
        </form>
    </div>
    <nav class="main-nav">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/category.html?category=technology">Technology</a></li>
            <li><a href="/category.html?category=science">Science</a></li>
            <li><a href="/category.html?category=business">Business</a></li>
            <li><a href="/voting.html">Election Results</a></li>
            <li><a href="/subscription.html">Subscribe</a></li>
            <li><a href="/about.html">About Us</a></li>
        </ul>
    </nav>
`;

const searchForm = header.querySelector('.search-form');
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = e.target.querySelector('input').value;
    window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
});