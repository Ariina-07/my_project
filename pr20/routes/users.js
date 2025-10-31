const express = require('express');
const router = express.Router();

let users = [
    { id: 1, name: 'Иван', email: 'ivan@example.com', age: 25 },
    { id: 2, name: 'Мария', email: 'maria@example.com', age: 30 },
    { id: 3, name: 'Алексей', email: 'alex@example.com', age: 28 }
];

router.use((req, res, next) => {
    console.log('Users router activated');
    next();
});

router.get('/', (req, res) => {
    res.json({
        users: users,
        total: users.length
    });
});

router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
        return res.status(404).json({
            error: 'Пользователь не найден',
            status: 'error'
        });
    }
    
    res.json({
        user: user,
        status: 'success'
    });
});

router.post('/', (req, res) => {
    const { name, email, age } = req.body;
    
    if (!name || !email) {
        return res.status(400).json({
            error: 'Имя и email обязательны',
            status: 'error'
        });
    }
    
    const newUser = {
        id: users.length + 1,
        name,
        email,
        age: age || null
    };
    
    users.push(newUser);
    
    res.status(201).json({
        message: 'Пользователь создан',
        user: newUser,
        status: 'success'
    });
});

router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({
            error: 'Пользователь не найден',
            status: 'error'
        });
    }
    
    const { name, email, age } = req.body;
    
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (age) users[userIndex].age = age;
    
    res.json({
        message: 'Пользователь обновлен',
        user: users[userIndex],
        status: 'success'
    });
});

router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
        return res.status(404).json({
            error: 'Пользователь не найден',
            status: 'error'
        });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    
    res.json({
        message: 'Пользователь удален',
        user: deletedUser,
        status: 'success'
    });
});

module.exports = router;