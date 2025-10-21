console.log('Тесты Fetch API');


async function testGetRequest() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        console.log(' GET запрос работает');
        return true;
    } catch (error) {
        console.log(' GET запрос не работает:', error);
        return false;
    }
}


async function testPostRequest() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: 'Test',
                body: 'Test content',
                userId: 1
            })
        });
        const data = await response.json();
        console.log(' POST запрос работает');
        return true;
    } catch (error) {
        console.log(' POST запрос не работает:', error);
        return false;
    }
}

testGetRequest();
testPostRequest();