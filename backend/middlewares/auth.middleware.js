const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) { // Экспорт напрямую как функции!
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: 'Не авторизован' });

        const token = authHeader.split(' ')[1]; // Извлекаем сам токен
        if (!token) return res.status(401).json({ message: 'Не авторизован' });

        const decoded = jwt.verify(token, config.jwtAccessSecret);
        req.user = decoded; 
        
        next(); 
    } catch (e) {
        return res.status(401).json({ message: 'Токен невалиден или протух' });
    }
};
