const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            message: 'Добро пожаловать на наш сервер!',
            status: 'success'
        }));
    }
    else if (req.url === '/api/users' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            users: [
                { id: 1, name: 'Иван', age: 25 },
                { id: 2, name: 'Мария', age: 30 },
                { id: 3, name: 'Алексей', age: 28 }
            ]
        }));
    }
    else if (req.url === '/api/products' && req.method === 'GET') {
        res.writeHead(200);
        res.end(JSON.stringify({
            products: [
                { id: 1, name: 'Ноутбук', price: 50000 },
                { id: 2, name: 'Телефон', price: 25000 },
                { id: 3, name: 'Наушники', price: 5000 }
            ]
        }));
    }
    else if (req.url === '/api/contact' && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => {
            body += chunk.toString();
        });
        
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                res.writeHead(201);
                res.end(JSON.stringify({
                    message: 'Сообщение получено!',
                    receivedData: data,
                    status: 'success'
                }));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({
                    error: 'Неверный JSON',
                    status: 'error'
                }));
            }
        });
    }
    else {
        res.writeHead(404);
        res.end(JSON.stringify({
            error: 'Страница не найдена',
            status: 'error'
        }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});