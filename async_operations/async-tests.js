console.log('Запуск тестов асинхронных операций...');

async function runTest(testName, testFunction) {
    try {
        await testFunction();
        console.log(`✅ ${testName} - пройден`);
        return true;
    } catch (error) {
        console.error(`❌ ${testName} - failed:`, error);
        return false;
    }
}

async function testBasicPromise() {
    const result = await createBasicPromise(true);
    if (result !== "Успех!") {
        throw new Error(`Ожидалось "Успех!", получено "${result}"`);
    }
}

async function testPromiseError() {
    try {
        await createBasicPromise(false);
        throw new Error("Ожидалась ошибка, но промис завершился успешно");
    } catch (error) {
        if (error !== "Ошибка!") {
            throw new Error(`Ожидалось "Ошибка!", получено "${error}"`);
        }
    }
}


async function testDelayWithPromise() {
    const startTime = Date.now();
    await delayWithPromise(100);
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    if (duration < 90 || duration > 150) {
        throw new Error(`Задержка работает некорректно: ${duration}мс`);
    }
}


async function testApiRequests() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
    }
    
    const user = await response.json();
};