const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

function logToOutput(selector, message) {
    const output = document.querySelector(selector);
    const timestamp = new Date().toLocaleTimeString();
    output.innerHTML += `[${timestamp}] ${message}<br>`;
    output.scrollTop = output.scrollHeight;
}

function clearOutput(selector) {
    document.querySelector(selector).innerHTML = '';
}


async function fetchGetRequest() {
    clearOutput('#get-output');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        const data = await response.json();
        logToOutput('#get-output', `Успех: ${data.title}`);
    } catch (error) {
        logToOutput('#get-output', `Ошибка: ${error}`);
    }
}


async function fetchJsonData() {
    clearOutput('#get-data');
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const users = await response.json();
        
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = 'user-card';
            userCard.innerHTML = `<strong>${user.name}</strong><br>Email: ${user.email}<br>Телефон: ${user.phone}`;
            document.getElementById('get-data').appendChild(userCard);
        });
    } catch (error) {
        logToOutput('#get-data', `Ошибка: ${error}`);
    }
}


async function fetchWithError() {
    clearOutput('#get-output');
    try {
        const response = await fetch(`${API_BASE_URL}/invalid-url`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        logToOutput('#get-output', `Данные: ${data}`);
    } catch (error) {
        logToOutput('#get-output', `Ошибка: ${error.message}`);
    }
}


async function fetchPostRequest() {
    clearOutput('#crud-output');
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Новый пост',
                body: 'Содержание поста',
                userId: 1
            })
        });
        const data = await response.json();
        logToOutput('#crud-output', `Создан пост: ${data.id}`);
    } catch (error) {
        logToOutput('#crud-output', `Ошибка: ${error}`);
    }
}


async function fetchPutRequest() {
    clearOutput('#crud-output');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 1,
                title: 'Обновленный пост',
                body: 'Обновленное содержание',
                userId: 1
            })
        });
        const data = await response.json();
        logToOutput('#crud-output', `Обновлен пост: ${data.title}`);
    } catch (error) {
        logToOutput('#crud-output', `Ошибка: ${error}`);
    }
}


async function fetchPatchRequest() {
    clearOutput('#crud-output');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Частично обновленный пост'
            })
        });
        const data = await response.json();
        logToOutput('#crud-output', `Обновлен заголовок: ${data.title}`);
    } catch (error) {
        logToOutput('#crud-output', `Ошибка: ${error}`);
    }
}


async function fetchDeleteRequest() {
    clearOutput('#crud-output');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`, {
            method: 'DELETE'
        });
        if (response.ok) {
            logToOutput('#crud-output', 'Пост удален');
        }
    } catch (error) {
        logToOutput('#crud-output', `Ошибка: ${error}`);
    }
}


async function fetchWithHeaders() {
    clearOutput('#headers-output');
    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            headers: {
                'X-Custom-Header': 'custom-value',
                'Authorization': 'Bearer token123'
            }
        });
        const data = await response.json();
        logToOutput('#headers-output', `Данные получены: ${data.length} постов`);
    } catch (error) {
        logToOutput('#headers-output', `Ошибка: ${error}`);
    }
}


async function fetchWithParams() {
    clearOutput('#headers-output');
    try {
        const params = new URLSearchParams({
            '_limit': '5',
            '_sort': 'id',
            '_order': 'desc'
        });
        
        const response = await fetch(`${API_BASE_URL}/posts?${params}`);
        const data = await response.json();
        logToOutput('#headers-output', `Получено ${data.length} постов`);
    } catch (error) {
        logToOutput('#headers-output', `Ошибка: ${error}`);
    }
}


async function fetchWithTimeout() {
    clearOutput('#headers-output');
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch(`${API_BASE_URL}/posts`, {
            signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        const data = await response.json();
        logToOutput('#headers-output', `Успех: ${data.length} постов`);
    } catch (error) {
        logToOutput('#headers-output', `Таймаут: ${error}`);
    }
}


async function fetchAndCheckStatus() {
    clearOutput('#response-output');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/1`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        logToOutput('#response-output', `Статус: ${response.status}, Данные: ${data.title}`);
    } catch (error) {
        logToOutput('#response-output', `Ошибка: ${error}`);
    }
}


async function fetchBlobData() {
    clearOutput('#response-output');
    try {
        const response = await fetch('https://picsum.photos/200/300');
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        logToOutput('#response-output', `Blob создан: ${blob.size} байт`);
    } catch (error) {
        logToOutput('#response-output', `Ошибка: ${error}`);
    }
}


async function fetchWithFormData() {
    clearOutput('#response-output');
    try {
        const formData = new FormData();
        formData.append('title', 'FormData пост');
        formData.append('body', 'Содержание');
        formData.append('userId', '1');
        
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        logToOutput('#response-output', `Создан через FormData: ${data.id}`);
    } catch (error) {
        logToOutput('#response-output', `Ошибка: ${error}`);
    }
}


async function fetchNetworkError() {
    clearOutput('#error-output');
    try {
        await fetch('https://invalid-domain-12345.com');
    } catch (error) {
        logToOutput('#error-output', `Сетевая ошибка: ${error.message}`);
    }
}


async function fetchHttpError() {
    clearOutput('#error-output');
    try {
        const response = await fetch(`${API_BASE_URL}/posts/9999`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        logToOutput('#error-output', `Данные: ${data}`);
    } catch (error) {
        logToOutput('#error-output', `HTTP ошибка: ${error.message}`);
    }
}


async function fetchWithAbort() {
    clearOutput('#error-output');
    try {
        const controller = new AbortController();
        
        setTimeout(() => {
            controller.abort();
            logToOutput('#error-output', 'Запрос отменен');
        }, 100);
        
        await fetch(`${API_BASE_URL}/posts`, {
            signal: controller.signal
        });
    } catch (error) {
        if (error.name === 'AbortError') {
            logToOutput('#error-output', 'Запрос отменен');
        }
    }
}


async function fetchWithPromiseAll() {
    clearOutput('#parallel-output');
    try {
        const [users, posts, comments] = await Promise.all([
            fetch(`${API_BASE_URL}/users`).then(r => r.json()),
            fetch(`${API_BASE_URL}/posts`).then(r => r.json()),
            fetch(`${API_BASE_URL}/comments`).then(r => r.json())
        ]);
        
        logToOutput('#parallel-output', `Пользователи: ${users.length}`);
        logToOutput('#parallel-output', `Посты: ${posts.length}`);
        logToOutput('#parallel-output', `Комментарии: ${comments.length}`);
    } catch (error) {
        logToOutput('#parallel-output', `Ошибка: ${error}`);
    }
}


async function fetchUserWithPosts() {
    clearOutput('#scenario-output');
    try {
        const userResponse = await fetch(`${API_BASE_URL}/users/1`);
        const user = await userResponse.json();
        
        const postsResponse = await fetch(`${API_BASE_URL}/posts?userId=1`);
        const posts = await postsResponse.json();
        
        logToOutput('#scenario-output', `Пользователь: ${user.name}`);
        logToOutput('#scenario-output', `Постов: ${posts.length}`);
    } catch (error) {
        logToOutput('#scenario-output', `Ошибка: ${error}`);
    }
}


function createFetchCache() {
    const cache = new Map();
    
    return async function cachedFetch(url) {
        if (cache.has(url)) {
            logToOutput('#scenario-output', 'Используется кэш');
            return cache.get(url);
        }
        
        logToOutput('#scenario-output', 'Запрос к API');
        const response = await fetch(url);
        const data = await response.json();
        
        cache.set(url, data);
        return data;
    };
}


function setupEvents() {
    document.getElementById('fetch-get').addEventListener('click', fetchGetRequest);
    document.getElementById('fetch-json').addEventListener('click', fetchJsonData);
    document.getElementById('fetch-error').addEventListener('click', fetchWithError);
    document.getElementById('fetch-post').addEventListener('click', fetchPostRequest);
    document.getElementById('fetch-put').addEventListener('click', fetchPutRequest);
    document.getElementById('fetch-patch').addEventListener('click', fetchPatchRequest);
    document.getElementById('fetch-delete').addEventListener('click', fetchDeleteRequest);
    document.getElementById('fetch-headers').addEventListener('click', fetchWithHeaders);
    document.getElementById('fetch-params').addEventListener('click', fetchWithParams);
    document.getElementById('fetch-timeout').addEventListener('click', fetchWithTimeout);
    document.getElementById('fetch-status').addEventListener('click', fetchAndCheckStatus);
    document.getElementById('fetch-blob').addEventListener('click', fetchBlobData);
    document.getElementById('fetch-formdata').addEventListener('click', fetchWithFormData);
    document.getElementById('fetch-network-error').addEventListener('click', fetchNetworkError);
    document.getElementById('fetch-http-error').addEventListener('click', fetchHttpError);
    document.getElementById('fetch-abort').addEventListener('click', fetchWithAbort);
    document.getElementById('fetch-promise-all').addEventListener('click', fetchWithPromiseAll);
    document.getElementById('fetch-user-posts').addEventListener('click', fetchUserWithPosts);
    
    document.getElementById('fetch-cache').addEventListener('click', async () => {
        clearOutput('#scenario-output');
        const cachedFetch = createFetchCache();
        await cachedFetch(`${API_BASE_URL}/users/1`);
        await cachedFetch(`${API_BASE_URL}/users/1`);
    });
}

document.addEventListener('DOMContentLoaded', setupEvents);