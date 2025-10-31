const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

let books = [
    {
        id: 1,
        title: "Война и мир",
        author: "Лев Толстой",
        genre: "Роман",
        year: 1869,
        isbn: "978-5-699-12014-7",
        pages: 1225
    },
    {
        id: 2,
        title: "Преступление и наказание",
        author: "Федор Достоевский",
        genre: "Роман",
        year: 1866,
        isbn: "978-5-17-090458-9",
        pages: 608
    },
    {
        id: 3,
        title: "Мастер и Маргарита",
        author: "Михаил Булгаков",
        genre: "Фантастика",
        year: 1967,
        isbn: "978-5-389-02613-5",
        pages: 480
    }
];

function findBookById(id) {
    return books.find(book => book.id === parseInt(id));
}

function isIsbnUnique(isbn, excludeId = null) {
    return !books.some(book => book.isbn === isbn && book.id !== excludeId);
}

function generateNewId() {
    return books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
}

app.get('/api/books', (req, res) => {
    try {
        const { author, genre, year, page = 1, limit = 10 } = req.query;
        
        let filteredBooks = [...books];
        
        if (author) {
            filteredBooks = filteredBooks.filter(book => 
                book.author.toLowerCase().includes(author.toLowerCase())
            );
        }
 
        if (genre) {
            filteredBooks = filteredBooks.filter(book => 
                book.genre.toLowerCase().includes(genre.toLowerCase())
            );
        }

        if (year) {
            filteredBooks = filteredBooks.filter(book => book.year === parseInt(year));
        }
        
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const startIndex = (pageNum - 1) * limitNum;
        const endIndex = startIndex + limitNum;
        
        const paginatedBooks = filteredBooks.slice(startIndex, endIndex);
        
        res.json({
            books: paginatedBooks,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(filteredBooks.length / limitNum),
                totalBooks: filteredBooks.length,
                hasNext: endIndex < filteredBooks.length,
                hasPrev: pageNum > 1
            },
            filters: {
                author,
                genre,
                year
            }
        });
        
    } catch (error) {
        res.status(500).json({
            error: "Ошибка сервера при получении книг",
            status: "error"
        });
    }
});

app.get('/api/books/:id', (req, res) => {
    try {
        const book = findBookById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                error: "Книга не найдена",
                status: "error"
            });
        }
        
        res.json({
            book: book,
            status: "success"
        });
        
    } catch (error) {
        res.status(500).json({
            error: "Ошибка сервера",
            status: "error"
        });
    }
});


app.post('/api/books', (req, res) => {
    try {
        const { title, author, genre, year, isbn, pages } = req.body;

        if (!title || !author) {
            return res.status(400).json({
                error: "Название и автор обязательны для заполнения",
                status: "error"
            });
        }
        
        if (isbn && !isIsbnUnique(isbn)) {
            return res.status(400).json({
                error: "Книга с таким ISBN уже существует",
                status: "error"
            });
        }
        
        const newBook = {
            id: generateNewId(),
            title,
            author,
            genre: genre || "Не указан",
            year: year ? parseInt(year) : null,
            isbn: isbn || null,
            pages: pages ? parseInt(pages) : null
        };
        
        books.push(newBook);
        
        res.status(201).json({
            message: "Книга успешно создана",
            book: newBook,
            status: "success"
        });
        
    } catch (error) {
        res.status(500).json({
            error: "Ошибка сервера при создании книги",
            status: "error"
        });
    }
});


app.put('/api/books/:id', (req, res) => {
    try {
        const book = findBookById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                error: "Книга не найдена",
                status: "error"
            });
        }
        
        const { title, author, genre, year, isbn, pages } = req.body;
        
        if (!title || !author) {
            return res.status(400).json({
                error: "Название и автор обязательны для заполнения",
                status: "error"
            });
        }
        
        if (isbn && !isIsbnUnique(isbn, book.id)) {
            return res.status(400).json({
                error: "Книга с таким ISBN уже существует",
                status: "error"
            });
        }
        
        book.title = title;
        book.author = author;
        book.genre = genre || "Не указан";
        book.year = year ? parseInt(year) : null;
        book.isbn = isbn || null;
        book.pages = pages ? parseInt(pages) : null;
        
        res.json({
            message: "Книга полностью обновлена",
            book: book,
            status: "success"
        });
        
    } catch (error) {
        res.status(500).json({
            error: "Ошибка сервера при обновлении книги",
            status: "error"
        });
    }
});


app.patch('/api/books/:id', (req, res) => {
    try {
        const book = findBookById(req.params.id);
        
        if (!book) {
            return res.status(404).json({
                error: "Книга не найдена",
                status: "error"
            });
        }
        
        const { title, author, genre, year, isbn, pages } = req.body;
        
        if (isbn && !isIsbnUnique(isbn, book.id)) {
            return res.status(400).json({
                error: "Книга с таким ISBN уже существует",
                status: "error"
            });
        }
        
        if (title !== undefined) book.title = title;
        if (author !== undefined) book.author = author;
        if (genre !== undefined) book.genre = genre;
        if (year !== undefined) book.year = year ? parseInt(year) : null;
        if (isbn !== undefined) book.isbn = isbn;
        if (pages !== undefined) book.pages = pages ? parseInt(pages) : null;
        
        res.json({
            message: "Книга частично обновлена",
            book: book,
            status: "success"
        });
        
    } catch (error) {
        res.status(500).json({
            error: "Ошибка сервера при обновлении книги",
            status: "error"
        });
    }
});


app.delete('/api/books/:id', (req, res) => {
    try {
        const bookIndex = books.findIndex(book => book.id === parseInt(req.params.id));
        
        if (bookIndex === -1) {
            return res.status(404).json({
                error: "Книга не найдена",
                status: "error"
            });
        }
        
        const deletedBook = books.splice(bookIndex, 1)[0];
        
        res.json({
            message: "Книга успешно удалена",
            book: deletedBook,
            status: "success"
        });
        
    } catch (error) {
        res.status(500).json({
            error: "Ошибка сервера при удалении книги",
            status: "error"
        });
    }
});

app.use('*', (req, res) => {
    res.status(404).json({
        error: "Маршрут не найден",
        status: "error"
    });
});

app.listen(PORT, () => {
    console.log(`REST API сервер запущен на http://localhost:${PORT}`);
    console.log('Доступные endpoints:');
    console.log('  GET    /api/books');
    console.log('  GET    /api/books/:id');
    console.log('  POST   /api/books');
    console.log('  PUT    /api/books/:id');
    console.log('  PATCH  /api/books/:id');
    console.log('  DELETE /api/books/:id');
});