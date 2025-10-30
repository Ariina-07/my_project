const { pool } = require('../db');

class Author {
    static async findAll() {
        const [authors] = await pool.execute('SELECT * FROM authors ORDER BY name');
        return authors;
    }

    static async findByIdWithBooks(id) {
        const [authors] = await pool.execute('SELECT * FROM authors WHERE id = ?', [id]);
        
        if (authors.length === 0) {
            return null;
        }
        
        const [books] = await pool.execute(`
            SELECT b.*, c.name as category_name 
            FROM books b
            LEFT JOIN categories c ON b.category_id = c.id
            WHERE b.author_id = ?
        `, [id]);
        
        return {
            ...authors[0],
            books
        };
    }

    static async create(authorData) {
        const { name, bio } = authorData;
        
        const [result] = await pool.execute(
            'INSERT INTO authors (name, bio) VALUES (?, ?)',
            [name, bio]
        );
        
        const [authors] = await pool.execute('SELECT * FROM authors WHERE id = ?', [result.insertId]);
        return authors[0];
    }
}

module.exports = Author;