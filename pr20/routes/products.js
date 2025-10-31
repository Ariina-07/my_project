const express = require('express');
const router = express.Router();

let products = [
    { id: 1, name: 'MacBook Pro', price: 150000, category: 'Ноутбуки', inStock: true },
    { id: 2, name: 'iPhone 15', price: 80000, category: 'Телефоны', inStock: true },
    { id: 3, name: 'AirPods', price: 15000, category: 'Аксессуары', inStock: false }
];

router.get('/', (req, res) => {
    const { category, inStock } = req.query;
    
    let filteredProducts = [...products];

    if (category) {
        filteredProducts = filteredProducts.filter(p => 
            p.category.toLowerCase() === category.toLowerCase()
        );
    }
    
    if (inStock !== undefined) {
        const stockStatus = inStock === 'true';
        filteredProducts = filteredProducts.filter(p => p.inStock === stockStatus);
    }
    
    res.json({
        products: filteredProducts,
        total: filteredProducts.length,
        filters: {
            category,
            inStock
        }
    });
});

router.get('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({
            error: 'Продукт не найден',
            status: 'error'
        });
    }
    
    res.json({
        product: product,
        status: 'success'
    });
});

router.post('/', (req, res) => {
    const { name, price, category } = req.body;
    
    if (!name || !price || !category) {
        return res.status(400).json({
            error: 'Название, цена и категория обязательны',
            status: 'error'
        });
    }
    
    const newProduct = {
        id: products.length + 1,
        name,
        price: parseFloat(price),
        category,
        inStock: true
    };
    
    products.push(newProduct);
    
    res.status(201).json({
        message: 'Продукт создан',
        product: newProduct,
        status: 'success'
    });
});

router.put('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        return res.status(404).json({
            error: 'Продукт не найден',
            status: 'error'
        });
    }
    
    const { name, price, category, inStock } = req.body;
    
    if (name) products[productIndex].name = name;
    if (price) products[productIndex].price = parseFloat(price);
    if (category) products[productIndex].category = category;
    if (inStock !== undefined) products[productIndex].inStock = inStock;
    
    res.json({
        message: 'Продукт обновлен',
        product: products[productIndex],
        status: 'success'
    });
});

router.delete('/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
        return res.status(404).json({
            error: 'Продукт не найден',
            status: 'error'
        });
    }
    
    const deletedProduct = products.splice(productIndex, 1)[0];
    
    res.json({
        message: 'Продукт удален',
        product: deletedProduct,
        status: 'success'
    });
});

module.exports = router;