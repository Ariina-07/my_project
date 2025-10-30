import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';
import './App.css';

function App() {
  const [items, setItems] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(''); 
  const [formData, setFormData] = useState({ title: '', description: '' }); 
  const [editingItem, setEditingItem] = useState(null); 

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiService.getItems();
      setItems(response.data);
    } catch (err) {
      setError('Не удалось загрузить задачи.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateItem = async (e) => {
    e.preventDefault(); 
    if (!formData.title.trim()) {
      setError('Название задачи не может быть пустым.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await apiService.createItem(formData);
      setItems([response.data, ...items]);
      setFormData({ title: '', description: '' });
    } catch (err) {
      setError('Не удалось создать задачу.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateItem = async (id, updatedFields) => {
    setLoading(true);
    setError('');
    try {
      const response = await apiService.updateItem(id, updatedFields);
      setItems(items.map(item => (item.id === id ? response.data : item)));
      setEditingItem(null); 
    } catch (err) {
      setError('Не удалось обновить задачу.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      return;
    }
    setLoading(true);
    setError('');
    try {
      await apiService.deleteItem(id);
      setItems(items.filter(item => item.id !== id));
    } catch (err) {
      setError('Не удалось удалить задачу.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (item) => {
    setEditingItem(item);
    setFormData({ title: item.title, description: item.description });
  };

  const cancelEditing = () => {
    setEditingItem(null);
    setFormData({ title: '', description: '' });
  };

  return (
    <div className="App">
      <h1>Мой Список Задач (Интеграция с Бэкендом)</h1>

      <form onSubmit={editingItem ? (e) => { e.preventDefault(); handleUpdateItem(editingItem.id, formData); } : handleCreateItem}>
        <input
          type="text"
          placeholder="Название задачи"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Описание"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Загрузка...' : (editingItem ? 'Обновить' : 'Добавить')}
        </button>
        {editingItem && <button type="button" onClick={cancelEditing}>Отмена</button>}
      </form>

      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}

      <ul>
        {items.map(item => (
          <li key={item.id}>
            <div>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
              <small>Статус: {item.completed ? 'Выполнена' : 'В процессе'} | Создана: {new Date(item.createdAt).toLocaleDateString()}</small>
            </div>
            <div>
              <button onClick={() => startEditing(item)}>Редактировать</button>
              <button onClick={() => handleUpdateItem(item.id, { completed: !item.completed })}>
                {item.completed ? 'Возобновить' : 'Завершить'}
              </button>
              <button onClick={() => handleDeleteItem(item.id)}>Удалить</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;