async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Ошибка при получении постов:', error);
        return [];
    }
}

async function renderPosts() {
    const postsContainer = document.getElementById('posts');
    const posts = await fetchPosts();

    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>Не удалось загрузить посты.</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3><a href="post.html?id=${post.id}">${post.title}</a></h3>
            <p>${post.body.substring(0, 100)}...</p>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Запуск рендеринга при загрузке страницы
document.addEventListener('DOMContentLoaded', renderPosts);
