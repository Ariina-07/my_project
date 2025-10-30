const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000; 

app.use(cors()); 
app.use(express.json()); 

let items = [
  { id: 1, title: 'Изучить React', description: 'Пройти практическую работу', completed: false, createdAt: new Date() },
  { id: 2, title: 'Сделать бэкенд', description: 'Написать Express сервер', completed: true, createdAt: new Date() },
];
let nextId = 3; 

app.get('/api/items', (req, res) => {
  try {
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении задач' });
  }
});

app.post('/api/items', (req, res) => {
  try {
    const { title, description } = req.body; 

    if (!title) {
      return res.status(400).json({ message: 'Название задачи обязательно' });
    }

    const newItem = {
      id: nextId++,
      title,
      description: description || '', 
      completed: false,
      createdAt: new Date(),
    };

    items.push(newItem); 
    res.status(201).json(newItem); 
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании задачи' });
  }
});

app.put('/api/items/:id', (req, res) => {
  try {
    const itemId = parseInt(req.params.id); 
    const { title, description, completed } = req.body; 
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    if (title !== undefined) items[itemIndex].title = title;
    if (description !== undefined) items[itemIndex].description = description;
    if (completed !== undefined) items[itemIndex].completed = completed;

    res.json(items[itemIndex]); 
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при обновлении задачи' });
  }
});

app.delete('/api/items/:id', (req, res) => {
  try {
    const itemId = parseInt(req.params.id);
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Задача не найдена' });
    }

    items = items.filter(item => item.id !== itemId); 
    res.status(200).json({ message: 'Задача удалена' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при удалении задачи' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер бэкенда запущен на http://localhost:${PORT}`);
});