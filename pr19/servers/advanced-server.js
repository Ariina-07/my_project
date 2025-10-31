const http = require('http');
const fs = require('fs');
const path = require('path');

function logger(req, res, next) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
}

function staticFiles(req, res, next) {
    if (req.method === 'GET' && req.url.startsWith('/public/')) {
        const filePath = path.join(__dirname, req.url);
        
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                next();
                return;
            }
            
            const ext = path.extname(filePath);
            const mimeTypes = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'text/javascript',
                '.json': 'application/json',
                '.png': 'image/png',
                '.jpg': 'image/jpeg'
            };
            
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Ошибка сервера');
                    return;
                }
                
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(data);
            });
        });
    } else {
        next();
    }
}

function parseJSON(req, res, next) {
    if (req.headers['content-type'] === 'application/json') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                req.body = body ? JSON.parse(body) : {};
                next();
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: 'Неверный JSON формат',
                    status: 'error'
                }));
            }
        });
    } else {
        next();
    }
}


const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    const middlewares = [logger, staticFiles, parseJSON];
    let middlewareIndex = 0;
    
    function next() {
        if (middlewareIndex < middlewares.length) {
            middlewares[middlewareIndex++](req, res, next);
        } else {
            handleRoutes(req, res);
        }
    }
    
    next();
});

function handleRoutes(req, res) {
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Расширенный сервер с middleware!',
            endpoints: [
                '/api/users',
                '/api/products',
                '/api/contact',
                '/public/client.html'
            ]
        }));
    }
    else if (req.url === '/api/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            users: [
                { id: 1, name: 'Иван', email: 'ivan@example.com' },
                { id: 2, name: 'Мария', email: 'maria@example.com' },
                { id: 3, name: 'Алексей', email: 'alex@example.com' }
            ]
        }));
    }
    else if (req.url === '/api/users' && req.method === 'POST') {
        const newUser = req.body;
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Пользователь создан',
            user: { id: Date.now(), ...newUser },
            status: 'success'
        }));
    }
    else if (req.url === '/api/products' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            products: [
                { id: 1, name: 'MacBook Pro', price: 150000, category: 'Ноутбуки' },
                { id: 2, name: 'iPhone 15', price: 80000, category: 'Телефоны' },
                { id: 3, name: 'AirPods', price: 15000, category: 'Аксессуары' }
            ]
        }));
    }
    else if (req.url === '/api/contact' && req.method === 'POST') {
        const contactData = req.body;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            message: 'Сообщение отправлено успешно!',
            received: contactData,
            status: 'success'
        }));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            error: 'Страница не найдена',
            status: 'error'
        }));
    }
}

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Расширенный сервер запущен на http://localhost:${PORT}`);
    console.log('Доступные маршруты:');
    console.log('  GET  /');
    console.log('  GET  /api/users');
    console.log('  POST /api/users');
    console.log('  GET  /api/products');
    console.log('  POST /api/contact');
    console.log('  GET  /public/client.html');
});