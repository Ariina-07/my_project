const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'arina',
    password: '1111', 
    database: 'library_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

const pool = mysql.createPool(dbConfig);

async function connectDB() {
    try {
        const connection = await pool.getConnection();
        console.log(' Успешно подключено к базе данных');
        connection.release();
        return true;
    } catch (error) {
        console.error('Ошибка подключения к БД:', error.message);
        return false;
    }
}

module.exports = { pool, connectDB };