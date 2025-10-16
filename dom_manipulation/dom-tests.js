function createCard(title, content) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const cardTitle = document.createElement('h4');
    cardTitle.textContent = title;
    
    const cardContent = document.createElement('p');
    cardContent.textContent = content;
    
    card.appendChild(cardTitle);
    card.appendChild(cardContent);
    
    document.getElementById('target1').appendChild(card);
}

function createList(items) {
    const ol = document.createElement('ol');
    
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ol.appendChild(li);
    });
    
    document.getElementById('target1').appendChild(ol);
}


function countChildren() {
    const parent = document.getElementById('parent-element');
    return parent.children.length;
}


function findSpecialChild() {
    const specialElement = document.querySelector('#parent-element .special');
    return specialElement ? specialElement.textContent : 'Элемент не найден';
}


function getParentBackground() {
    const child = document.querySelector('#parent-element .child');
    const parent = child.parentElement;
    return window.getComputedStyle(parent).backgroundColor;
}


function setupStyleToggle() {
    const toggleButton = document.getElementById('toggle-style');
    const target = document.getElementById('style-target');
    
    toggleButton.addEventListener('click', function() {
        target.classList.toggle('active-style');
    });
}


function changeHeaderColor() {
    const header = document.getElementById('main-header');
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    header.style.backgroundColor = randomColor;
}


function animateElement() {
    const element = document.getElementById('style-target');
    element.classList.add('animated');
    
    setTimeout(() => {
        element.classList.remove('animated');
    }, 2000);
}

function setupClickCounter() {
    let count = 0;
    const button = document.getElementById('click-btn');
    const counter = document.getElementById('click-counter');
    
    button.addEventListener('click', function() {
        count++;
        counter.textContent = count;
    });
}

function setupInputDisplay() {
    const input = document.getElementById('text-input');
    const display = document.getElementById('input-display');
    
    input.addEventListener('input', function() {
        display.textContent = this.value;
    });
}


function setupKeyboardEvents() {
    document.addEventListener('keydown', function(event) {
        console.log(`Key down: ${event.key} (Code: ${event.code})`);
    });
    
    document.addEventListener('keyup', function(event) {
        console.log(`Key up: ${event.key} (Code: ${event.code})`);
    });
}

function addListItem() {
    const input = document.getElementById('item-input');
    const list = document.getElementById('dynamic-list');
    
    if (input.value.trim() === '') return;
    
    const li = document.createElement('li');
    li.className = 'list-item';
    li.textContent = input.value;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Удалить';
    deleteBtn.onclick = removeListItem;
    
    li.appendChild(deleteBtn);
    list.appendChild(li);
    
    input.value = '';
}


function removeListItem(event) {
    const listItem = event.target.parentElement;
    listItem.remove();
}


function clearList() {
    const list = document.getElementById('dynamic-list');
    list.innerHTML = '';
}


function setupListEvents() {
    document.getElementById('add-btn').addEventListener('click', addListItem);
    document.getElementById('clear-btn').addEventListener('click', clearList);
    
    document.getElementById('item-input').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addListItem();
        }
    });
    
    document.getElementById('dynamic-list').addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            removeListItem(event);
        }
    });
}


function validateForm(formData) {
    const errors = {};
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.name = 'Имя должно содержать минимум 2 символа';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
        errors.email = 'Введите корректный email адрес';
    }
    
    const age = parseInt(formData.age);
    if (!formData.age || isNaN(age) || age < 1 || age > 120) {
        errors.age = 'Возраст должен быть числом от 1 до 120';
    }
    
    return Object.keys(errors).length === 0 ? null : errors;
}

function displayFormErrors(errors) {
    const output = document.getElementById('form-output');
    output.innerHTML = '';
    
    for (const field in errors) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        errorDiv.textContent = errors[field];
        output.appendChild(errorDiv);
    }
}

function displayFormSuccess(userData) {
    const output = document.getElementById('form-output');
    output.innerHTML = '';
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <h3>Данные успешно отправлены!</h3>
        <p><strong>Имя:</strong> ${userData.name}</p>
        <p><strong>Email:</strong> ${userData.email}</p>
        <p><strong>Возраст:</strong> ${userData.age}</p>
    `;
    
    output.appendChild(successDiv);
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value
    };
    
    const errors = validateForm(formData);
    
    if (errors) {
        displayFormErrors(errors);
    } else {
        displayFormSuccess(formData);
    }
}

function setupForm() {
    const form = document.getElementById('user-form');
    form.addEventListener('submit', handleFormSubmit);
}


document.addEventListener('DOMContentLoaded', function() {
    setupStyleToggle();
    setupClickCounter();
    setupInputDisplay();
    setupKeyboardEvents();
    setupListEvents();
    setupForm();
});