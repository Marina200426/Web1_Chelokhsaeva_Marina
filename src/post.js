async function fetchPostById(id) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка при загрузке поста:', error);
        return null;
    }
}

async function fetchComments(postId) {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка при загрузке комментариев:', error);
        return [];
    }
}

async function renderPost() {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('id');

    if (!postId) {
        document.getElementById('post').innerHTML = '<p>Пост не найден</p>';
        return;
    }

    const post = await fetchPostById(postId);
    if (!post) {
        document.getElementById('post').innerHTML = '<p>Ошибка загрузки поста</p>';
        return;
    }

    document.getElementById('post').innerHTML = `
        <h1>${post.title}</h1>
        <p>${post.body}</p>
    `;

    // Загружаем комментарии
    const comments = await fetchComments(postId);
    const commentsContainer = document.getElementById('comments');

    if (comments.length === 0) {
        commentsContainer.innerHTML = '<p>Комментариев нет</p>';
        return;
    }

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `
            <strong>${comment.name} (${comment.email})</strong>
            <p>${comment.body}</p>
        `;
        commentsContainer.appendChild(commentElement);
    });
}

// Запуск рендеринга при загрузке страницы
document.addEventListener('DOMContentLoaded', renderPost);
