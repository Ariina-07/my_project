function runTests() {
    console.log('=== Запуск тестов обработки событий ===');
    
    testBasicClick();
    testDelegation();
    testCustomEvent();
    
    console.log('=== Тесты завершены ===');
}

function testBasicClick() {
    console.log('Тест: Базовый клик');
    const button = document.getElementById('basic-btn');
    const clickEvent = new MouseEvent('click', {
        clientX: 100,
        clientY: 50
    });
    button.dispatchEvent(clickEvent);
    console.log('✓ Обработчик клика работает');
}

function testDelegation() {
    console.log('Тест: Делегирование событий');
    const list = document.getElementById('item-list');
    const firstItem = list.querySelector('.item');
    
    const clickEvent = new MouseEvent('click');
    firstItem.dispatchEvent(clickEvent);
    console.log('✓ Делегирование работает');
}

function testCustomEvent() {
    console.log('Тест: Кастомные события');
    triggerCustomEvent();
    console.log('✓ Кастомные события работают');
}


setTimeout(runTests, 1000);