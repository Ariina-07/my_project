const { pool } = require('../db');

class Book {
    static async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        
        const [books] = await pool.execute(`
            SELECT b.*, a.name as author_name, c.name as category_name 
            FROM books b
            LEFT JOIN authors a ON b.author_id = a.id
            LEFT JOIN categories c ON b.category_id = c.id
            LIMIT ? OFFSET ?
        `, [limit, offset]);
        
        const [totalCount] = await pool.execute('SELECT COUNT(*) as count FROM books');
        
        return {
            books,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: totalCount[0].count,
                totalPages: Math.ceil(totalCount[0].count / limit)
            }
        };
    }

    static async findById(id) {
        const [books] = await pool.execute(`
            SELECT b.*, a.name as author_name, c.name as category_name 
            FROM books b
            LEFT JOIN authors a ON b.author_id = a.id
            LEFT JOIN categories c ON b.category_id = c.id
            WHERE b.id = ?
        `, [id]);
        
        return books[0] || null;
    }

    static async create(bookData) {
        const { title, isbn, publication_year, author_id, category_id } = bookData;
        
        const [result] = await pool.execute(
            'INSERT INTO books (title, isbn, publication_year, author_id, category_id) VALUES (?, ?, ?, ?, ?)',
            [title, isbn, publication_year, author_id, category_id]
        );
        
        return this.findById(result.insertId);
    }

    static async update(id, bookData) {
        const { title, isbn, publication_year, author_id, category_id } = bookData;
        
        await pool.execute(
            'UPDATE books SET title = ?, isbn = ?, publication_year = ?, author_id = ?, category_id = ? WHERE id = ?',
            [title, isbn, publication_year, author_id, category_id, id]
        );
        
        return this.findById(id);
    }

    static async delete(id) {
        const [result] = await pool.execute('DELETE FROM books WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

module.exports = Book;