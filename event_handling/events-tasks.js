function handleBasicClick(event) {
    const output = document.getElementById('basic-output');
    output.innerHTML = `
        Тип события: ${event.type}<br>
        Координаты: X=${event.clientX}, Y=${event.clientY}<br>
        Элемент: ${event.target.tagName}
    `;
    
   
    event.target.classList.add('pulse');
    setTimeout(() => {
        event.target.classList.remove('pulse');
    }, 500);
}


function handleMouseEvents(event) {
    const box = document.getElementById('color-box');
    const output = document.getElementById('mouse-output');
    
    if (event.type === 'mouseenter') {
        box.style.backgroundColor = '#e74c3c';
        output.textContent = 'Курсор вошел в область';
    } else if (event.type === 'mouseleave') {
        box.style.backgroundColor = '#3498db';
        output.textContent = 'Курсор покинул область';
    } else if (event.type === 'mousemove') {
        output.textContent = `Движение: X=${event.offsetX}, Y=${event.offsetY}`;
    }
}


function handleKeyEvents(event) {
    const output = document.getElementById('key-output');
    output.innerHTML = `
        Клавиша: ${event.key}<br>
        Код: ${event.code}<br>
        Ctrl: ${event.ctrlKey}<br>
        Alt: ${event.altKey}<br>
        Shift: ${event.shiftKey}
    `;
    

    if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        output.innerHTML += '<br><strong>Ctrl+S заблокирован!</strong>';
    }
}


function handleDelegationClick(event) {
    const output = document.getElementById('delegation-output');
    
    if (event.target.classList.contains('item')) {

        event.target.classList.toggle('selected');
        output.textContent = `Выбран элемент: ${event.target.textContent}`;
    } else if (event.target.classList.contains('delete')) {

        event.target.parentElement.remove();
        output.textContent = 'Элемент удален';
    }
}


function addNewItem() {
    const list = document.getElementById('item-list');
    const itemCount = list.children.length + 1;
    
    const newItem = document.createElement('li');
    newItem.className = 'item';
    newItem.setAttribute('data-id', itemCount);
    newItem.innerHTML = `Элемент ${itemCount} <button class="delete">Удалить</button>`;
    
    list.appendChild(newItem);
}


function preventLinkDefault(event) {
    event.preventDefault();
    const output = document.getElementById('prevention-output');
    output.textContent = 'Переход по ссылке заблокирован!';
    

    event.target.classList.add('shake');
    setTimeout(() => {
        event.target.classList.remove('shake');
    }, 500);
}


function preventFormSubmit(event) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const output = document.getElementById('prevention-output');
    
    if (input.value.trim() === '') {
        output.textContent = 'Ошибка: поле не может быть пустым';
    } else {
        output.textContent = `Форма отправлена с текстом: ${input.value}`;
        input.value = '';
    }
}


function triggerCustomEvent() {
    const customEvent = new CustomEvent('customAction', {
        detail: { message: 'Привет от кастомного события!' }
    });
    
    document.dispatchEvent(customEvent);
}


function handleCustomEvent(event) {
    const output = document.getElementById('custom-output');
    output.textContent = event.detail.message;
    
    
    output.classList.add('pulse');
    setTimeout(() => {
        output.classList.remove('pulse');
    }, 500);
}


document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('basic-btn').addEventListener('click', handleBasicClick);
    
    const colorBox = document.getElementById('color-box');
    colorBox.addEventListener('mouseenter', handleMouseEvents);
    colorBox.addEventListener('mouseleave', handleMouseEvents);
    colorBox.addEventListener('mousemove', handleMouseEvents);
    
    document.getElementById('key-input').addEventListener('keydown', handleKeyEvents);
    
    document.getElementById('item-list').addEventListener('click', handleDelegationClick);
    document.getElementById('add-item-btn').addEventListener('click', addNewItem);
    
    document.getElementById('prevent-link').addEventListener('click', preventLinkDefault);
    document.getElementById('prevent-form').addEventListener('submit', preventFormSubmit);
    
    document.addEventListener('customAction', handleCustomEvent);
    document.getElementById('trigger-custom').addEventListener('click', triggerCustomEvent);
});