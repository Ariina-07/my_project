function runTests() {
    console.log('=== Запуск тестов DOM манипуляций ===');
    
    
    testCreateCard();
    testCreateList();
    
    
    testCountChildren();
    testFindSpecialChild();
    testGetParentBackground();
    
   
    testStyleToggle();
    testChangeHeaderColor();
    testAnimateElement();
    
    
    testValidateForm();
    
    console.log('=== Тесты завершены ===');
}


function testCreateCard() {
    console.log('Тест 1.1: Создание карточки');
    
    
    const target = document.getElementById('target1');
    const initialChildCount = target.children.length;
    
    
    createCard('Тестовый заголовок', 'Тестовое содержимое');
    
   
    const newChildCount = target.children.length;
    const lastChild = target.lastElementChild;
    
    if (newChildCount === initialChildCount + 1 && 
        lastChild.classList.contains('card') &&
        lastChild.querySelector('h4').textContent === 'Тестовый заголовок' &&
        lastChild.querySelector('p').textContent === 'Тестовое содержимое') {
        console.log('✓ Карточка успешно создана и добавлена');
    } else {
        console.log('✗ Ошибка при создании карточки');
    }
}


function testCreateList() {
    console.log('Тест 1.2: Создание списка');
    
    const target = document.getElementById('target1');
    const initialChildCount = target.children.length;
    const testItems = ['Первый', 'Второй', 'Третий'];
    
    createList(testItems);
    
    const newChildCount = target.children.length;
    const lastChild = target.lastElementChild;
    
    if (newChildCount === initialChildCount + 1 && 
        lastChild.tagName === 'OL' &&
        lastChild.children.length === testItems.length) {
        console.log('✓ Список успешно создан и добавлен');
    } else {
        console.log('✗ Ошибка при создании списка');
    }
}


function testCountChildren() {
    console.log('Тест 2.1: Подсчет дочерних элементов');
    
    const count = countChildren();
    const actualCount = document.getElementById('parent-element').children.length;
    
    if (count === actualCount) {
        console.log(`✓ Количество детей верное: ${count}`);
    } else {
        console.log(`✗ Ошибка: ожидалось ${actualCount}, получено ${count}`);
    }
}


function testFindSpecialChild() {
    console.log('Тест 2.2: Поиск специального элемента');
    
    const text = findSpecialChild();
    const specialElement = document.querySelector('#parent-element .special');
    
    if (text === specialElement.textContent) {
        console.log('✓ Специальный элемент найден корректно');
    } else {
        console.log('✗ Ошибка при поиске специального элемента');
    }
}


function testGetParentBackground() {
    console.log('Тест 2.3: Получение цвета фона родителя');
    
    const bgColor = getParentBackground();
    const parent = document.querySelector('#parent-element .child').parentElement;
    const computedColor = window.getComputedStyle(parent).backgroundColor;
    
    if (bgColor === computedColor) {
        console.log('✓ Цвет фона родителя получен корректно');
    } else {
        console.log('✗ Ошибка при получении цвета фона');
    }
}


function testStyleToggle() {
    console.log('Тест 3.1: Переключение стилей');
    
    const target = document.getElementById('style-target');
    const initialClassState = target.classList.contains('active-style');
    
    
    document.getElementById('toggle-style').click();
    
    const newClassState = target.classList.contains('active-style');
    
    if (newClassState !== initialClassState) {
        console.log('✓ Стиль успешно переключен');
    } else {
        console.log('✗ Ошибка при переключении стиля');
    }
}


function testChangeHeaderColor() {
    console.log('Тест 3.2: Изменение цвета заголовка');
    
    const header = document.getElementById('main-header');
    const initialColor = header.style.backgroundColor;
    
    changeHeaderColor();
    
    const newColor = header.style.backgroundColor;
    
    if (newColor !== initialColor && newColor) {
        console.log('✓ Цвет заголовка изменен');
    } else {
        console.log('✗ Ошибка при изменении цвета заголовка');
    }
}


function testAnimateElement() {
    console.log('Тест 3.3: Анимация элемента');
    
    const element = document.getElementById('style-target');
    
    animateElement();
    
    if (element.classList.contains('animated')) {
        console.log('✓ Анимация запущена');
        
        
        setTimeout(() => {
            if (!element.classList.contains('animated')) {
                console.log('✓ Анимация корректно завершена');
            } else {
                console.log('✗ Анимация не завершилась');
            }
        }, 2100);
    } else {
        console.log('✗ Ошибка при запуске анимации');
    }
}


function testValidateForm() {
    console.log('Тест 6.1: Валидация формы');
    
   
    const validData = {
        name: 'Иван',
        email: 'ivan@example.com',
        age: '25'
    };
    
    const validResult = validateForm(validData);
    if (validResult === null) {
        console.log('✓ Корректные данные приняты');
    } else {
        console.log('✗ Корректные данные отклонены');
    }
    
    
    const invalidName = {
        name: 'И',
        email: 'ivan@example.com',
        age: '25'
    };
    
    const nameResult = validateForm(invalidName);
    if (nameResult && nameResult.name) {
        console.log('✓ Некорректное имя обнаружено');
    } else {
        console.log('✗ Некорректное имя не обнаружено');
    }
    
    
    const invalidEmail = {
        name: 'Иван',
        email: 'invalid-email',
        age: '25'
    };
    
    const emailResult = validateForm(invalidEmail);
    if (emailResult && emailResult.email) {
        console.log('✓ Некорректный email обнаружен');
    } else {
        console.log('✗ Некорректный email не обнаружен');
    }
    
    
    const invalidAge = {
        name: 'Иван',
        email: 'ivan@example.com',
        age: '150'
    };
    
    const ageResult = validateForm(invalidAge);
    if (ageResult && ageResult.age) {
        console.log('✓ Некорректный возраст обнаружен');
    } else {
        console.log('✗ Некорректный возраст не обнаружен');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    setTimeout(runTests, 1000);
});