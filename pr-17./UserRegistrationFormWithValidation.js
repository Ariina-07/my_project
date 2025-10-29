import React, { useState } from 'react';

function UserRegistrationFormWithValidation() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    subscribe: false,
    age: '',
    bio: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Имя обязательно';
    if (!formData.email) newErrors.email = 'Email обязателен';
    if (!formData.password) newErrors.password = 'Пароль обязателен';
    if (formData.password.length < 8) newErrors.password = 'Пароль должен быть не менее 8 символов';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Пароли не совпадают';
    if (!formData.gender) newErrors.gender = 'Выберите пол';
    if (!formData.age) newErrors.age = 'Выберите возраст';
    if (!formData.bio) newErrors.bio = 'Расскажите о себе';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Данные формы:', formData);
      alert('Форма успешно отправлена!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Регистрация пользователя (с валидацией)</h2>
      
      <div>
        <label>Имя:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span style={{color: 'red'}}>{errors.name}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
      </div>

      <div>
        <label>Пароль:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
      </div>

      <div>
        <label>Подтверждение пароля:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <span style={{color: 'red'}}>{errors.confirmPassword}</span>}
      </div>

      <div>
        <label>Пол:</label>
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={formData.gender === 'male'}
            onChange={handleChange}
          />
          Мужской
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={formData.gender === 'female'}
            onChange={handleChange}
          />
          Женский
        </label>
        {errors.gender && <div style={{color: 'red'}}>{errors.gender}</div>}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="subscribe"
            checked={formData.subscribe}
            onChange={handleChange}
          />
          Подписаться на рассылку
        </label>
      </div>

      <div>
        <label>Возраст:</label>
        <select
          name="age"
          value={formData.age}
          onChange={handleChange}
        >
          <option value="">Выберите возраст</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-45">36-45</option>
          <option value="45+">45+</option>
        </select>
        {errors.age && <span style={{color: 'red'}}>{errors.age}</span>}
      </div>

      <div>
        <label>О себе:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
        />
        {errors.bio && <span style={{color: 'red'}}>{errors.bio}</span>}
      </div>

      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}

export default UserRegistrationFormWithValidation;