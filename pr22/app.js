const express = require('express');
const { connectDB } = require('./db');
const Book = require('./models/Book');
const Author = require('./models/Author');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.get('/books', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const result = await Book.findAll(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({ error: 'Книга не найдена' });
        }
        
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/books', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/books/:id', async (req, res) => {
    try {
        const book = await Book.update(req.params.id, req.body);
        
        if (!book) {
            return res.status(404).json({ error: 'Книга не найдена' });
        }
        
        res.json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const success = await Book.delete(req.params.id);
        
        if (!success) {
            return res.status(404).json({ error: 'Книга не найдена' });
        }
        
        res.json({ message: 'Книга успешно удалена' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/authors', async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.json(authors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/authors/:id', async (req, res) => {
    try {
        const author = await Author.findByIdWithBooks(req.params.id);
        
        if (!author) {
            return res.status(404).json({ error: 'Автор не найден' });
        }
        
        res.json(author);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/authors', async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(201).json(author);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.use('*', (req, res) => {
    res.status(404).json({ error: 'Маршрут не найден' });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
    console.log(`Библиотека API доступна по адресу: http://localhost:${PORT}`);
});