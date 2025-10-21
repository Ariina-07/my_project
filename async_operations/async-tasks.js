function createBasicPromise(shouldResolve = true) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve("Успех!");
            } else {
                reject("Ошибка!");
            }
        }, 1000);
    });
}


function handleBasicPromise() {
    console.log('Запуск промиса...');
    
    createBasicPromise(true)
        .then(result => {
            console.log(`Результат: ${result}`);
            document.getElementById('output').innerHTML = result;
        })
        .catch(error => {
            console.log(`Ошибка: ${error}`);
            document.getElementById('output').innerHTML = error;
        });
}


function createPromiseChain() {
    console.log('Цепочка промисов...');
    
    createBasicPromise(true)
        .then(result => {
            console.log(`Первый: ${result}`);
            return result + " -> Второй";
        })
        .then(result => {
            return new Promise(resolve => {
                setTimeout(() => {
                    console.log(`Второй: ${result}`);
                    resolve(result + " -> Третий");
                }, 500);
            });
        })
        .then(finalResult => {
            console.log(`Финальный: ${finalResult}`);
            document.getElementById('output').innerHTML = finalResult;
        });
}


function handlePromiseError() {
    createBasicPromise(false)
        .catch(error => {
            console.log(`Поймана ошибка: ${error}`);
            document.getElementById('output').innerHTML = error;
        });
}


async function basicAsyncAwait() {
    try {
        const result = await createBasicPromise(true);
        console.log(`Async результат: ${result}`);
        document.getElementById('output').innerHTML = result;
    } catch (error) {
        console.log(`Async ошибка: ${error}`);
    }
}


async function handleAsyncError() {
    try {
        const result = await createBasicPromise(false);
        console.log(`Результат: ${result}`);
    } catch (error) {
        console.log(`Ошибка: ${error}`);
        document.getElementById('output').innerHTML = error;
    }
}


async function parallelAsyncExecution() {
    const promises = [
        new Promise(resolve => setTimeout(() => resolve("Задача 1"), 1000)),
        new Promise(resolve => setTimeout(() => resolve("Задача 2"), 500)),
        new Promise(resolve => setTimeout(() => resolve("Задача 3"), 800))
    ];
    
    const results = await Promise.all(promises);
    console.log('Все задачи:', results);
    document.getElementById('output').innerHTML = results.join(', ');
}


async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        console.log('Пользователи:', users);
        document.getElementById('output').innerHTML = `Загружено: ${users.length} пользователей`;
    } catch (error) {
        console.log('Ошибка API:', error);
    }
}


async function createPost() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Новый пост',
                body: 'Содержание',
                userId: 1
            })
        });
        
        const data = await response.json();
        console.log('Создан пост:', data);
        document.getElementById('output').innerHTML = 'Пост создан! ID: ' + data.id;
    } catch (error) {
        console.log('Ошибка:', error);
    }
}


async function testApiError() {
    try {
        await fetch('https://jsonplaceholder.typicode.com/invalid-url');
    } catch (error) {
        console.log('API ошибка:', error);
        document.getElementById('output').innerHTML = 'Ошибка: ' + error.message;
    }
}

let intervalId;
function startAsyncInterval() {
    let counter = 0;
    intervalId = setInterval(() => {
        counter++;
        console.log(`Интервал: ${counter}`);
        document.getElementById('output').innerHTML = `Счетчик: ${counter}`;
    }, 1000);
}


function stopAsyncInterval() {
    if (intervalId) {
        clearInterval(intervalId);
        console.log('Интервал остановлен');
        document.getElementById('output').innerHTML = 'Интервал остановлен';
    }
}


function delayWithPromise(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(`Задержка ${ms}мс завершена`);
        }, ms);
    });
}


async function testDelay() {
    console.log('Начало задержки...');
    await delayWithPromise(1000);
    console.log('Задержка завершена');
    document.getElementById('output').innerHTML = 'Задержка завершена';
}


async function asyncTryCatch() {
    try {
        await createBasicPromise(true);
        console.log('Первая операция успешна');
        
        try {
            await createBasicPromise(false);
        } catch (innerError) {
            console.log('Внутренняя ошибка:', innerError);
        }
        
        await createBasicPromise(true);
        console.log('Все операции завершены');
        
    } catch (error) {
        console.log('Внешняя ошибка:', error);
    }
}


async function handleMultipleErrors() {
    const promises = [
        createBasicPromise(true),
        createBasicPromise(false),
        createBasicPromise(true),
        createBasicPromise(false)
    ];
    
    const results = await Promise.allSettled(promises);
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(`Промис ${index}: Успех`);
        } else {
            console.log(`Промис ${index}: Ошибка`);
        }
    });
}


async function demonstratePromiseAll() {
    const promises = [
        delayWithPromise(300),
        delayWithPromise(500),
        delayWithPromise(200)
    ];
    
    const results = await Promise.all(promises);
    console.log('Promise.all результаты:', results);
    document.getElementById('output').innerHTML = results.join(', ');
}

async function demonstratePromiseRace() {
    const promises = [
        delayWithPromise(1000),
        delayWithPromise(500),
        delayWithPromise(2000)
    ];
    
    const winner = await Promise.race(promises);
    console.log('Promise.race победитель:', winner);
    document.getElementById('output').innerHTML = winner;
}


async function sequentialApiRequests() {
    try {

        const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const user = await userResponse.json();
        

        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=1`);
        const posts = await postsResponse.json();
        
        console.log('Пользователь:', user.name);
        console.log('Постов:', posts.length);
        document.getElementById('output').innerHTML = `${user.name}, постов: ${posts.length}`;
        
    } catch (error) {
        console.log('Ошибка:', error);
    }
}

async function simulateFileUpload() {
    for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        console.log(`Прогресс: ${progress}%`);
        document.getElementById('output').innerHTML = `Загрузка: ${progress}%`;
    }
    console.log('Файл загружен!');
}

function setupEvents() {
    document.getElementById('basic-promise').addEventListener('click', handleBasicPromise);
    document.getElementById('promise-chain').addEventListener('click', createPromiseChain);
    document.getElementById('promise-error').addEventListener('click', handlePromiseError);
    document.getElementById('basic-async').addEventListener('click', basicAsyncAwait);
    document.getElementById('async-error').addEventListener('click', handleAsyncError);
    document.getElementById('async-parallel').addEventListener('click', parallelAsyncExecution);
    document.getElementById('fetch-users').addEventListener('click', fetchUsers);
    document.getElementById('fetch-post').addEventListener('click', createPost);
    document.getElementById('fetch-error').addEventListener('click', testApiError);
    document.getElementById('start-interval').addEventListener('click', startAsyncInterval);
    document.getElementById('stop-interval').addEventListener('click', stopAsyncInterval);
    document.getElementById('delay-promise').addEventListener('click', testDelay);
    document.getElementById('try-catch').addEventListener('click', asyncTryCatch);
    document.getElementById('multiple-errors').addEventListener('click', handleMultipleErrors);
    document.getElementById('promise-all').addEventListener('click', demonstratePromiseAll);
    document.getElementById('promise-race').addEventListener('click', demonstratePromiseRace);
    document.getElementById('sequential-requests').addEventListener('click', sequentialApiRequests);
    document.getElementById('upload-simulation').addEventListener('click', simulateFileUpload);
}

document.addEventListener('DOMContentLoaded', setupEvents);