const express = require('express');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');

const app = express();
const PORT = 3000;


app.use(express.json());


app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});


app.get('/', (req, res) => {
    res.json({
        message: 'Добро пожаловать в Express.js приложение!',
        endpoints: {
            users: '/api/users',
            products: '/api/products'
        }
    });
});

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);

app.use((req, res) => {
    res.status(404).json({
        error: 'Страница не найдена',
        status: 'error'
    });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        error: 'Внутренняя ошибка сервера',
        status: 'error'
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});