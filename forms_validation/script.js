document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const bio = document.getElementById('bio');
    const charCount = document.querySelector('.char-count');

   
    bio.addEventListener('input', function() {
        charCount.textContent = `${bio.value.length}/500`;
    });

    
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('invalid')) {
                validateField(this);
            }
        });
    });

   
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    
    confirmPassword.addEventListener('blur', function() {
        validatePasswordMatch();
    });

   
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const allInputs = form.querySelectorAll('input');
        
        allInputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (!validatePasswordMatch()) {
            isValid = false;
        }
        
        if (isValid) {
            alert('Форма успешно отправлена!');
            form.reset();
            charCount.textContent = '0/500';
        } else {
            alert('Пожалуйста, исправьте ошибки в форме.');
        }
    });

    function validateField(field) {
        const errorElement = document.getElementById(field.id + 'Error');
        
    
        field.classList.remove('invalid', 'valid');
        errorElement.textContent = '';
        
 
        if (field.hasAttribute('required') && !field.value.trim()) {
            field.classList.add('invalid');
            errorElement.textContent = 'Это поле обязательно для заполнения';
            return false;
        }
        
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                field.classList.add('invalid');
                errorElement.textContent = 'Введите корректный email';
                return false;
            }
        }
        
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[0-9]{10,11}$/;
            if (!phoneRegex.test(field.value.replace(/\D/g, ''))) {
                field.classList.add('invalid');
                errorElement.textContent = 'Введите корректный номер телефона (10-11 цифр)';
                return false;
            }
        }
        
        if (field.id === 'password' && field.value) {
            if (field.value.length < 6) {
                field.classList.add('invalid');
                errorElement.textContent = 'Пароль должен содержать минимум 6 символов';
                return false;
            }
        }
        
        field.classList.add('valid');
        return true;
    }

    function validatePasswordMatch() {
        const passwordError = document.getElementById('passwordError');
        const confirmError = document.getElementById('confirmPasswordError');
        
        password.classList.remove('invalid', 'valid');
        confirmPassword.classList.remove('invalid', 'valid');
        passwordError.textContent = '';
        confirmError.textContent = '';
        
        if (password.value && confirmPassword.value) {
            if (password.value !== confirmPassword.value) {
                password.classList.add('invalid');
                confirmPassword.classList.add('invalid');
                confirmError.textContent = 'Пароли не совпадают';
                return false;
            } else {
                password.classList.add('valid');
                confirmPassword.classList.add('valid');
            }
        }
        
        return true;
    }
});