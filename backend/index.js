const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // Подключили пакет кук

// Импорт роутов
const carRoutes = require('./routes/car.routes');
const authRoutes = require('./routes/auth.routes'); // Импорт роутов авторизации

const app = express();
const port = 3005;

mongoose.connect('mongodb://127.0.0.1:27017/Driva')
    .then(() => console.log('📦 База MongoDB успешно подключена'))
    .catch(err => console.error('Ошибка БД:', err));

// КРИТИЧНО ДЛЯ АВТОРИЗАЦИИ: настраиваем CORS для работы с куками
app.use(cors({
    origin: 'http://localhost:5174', // Порт твоего Vue приложения
    credentials: true // Обязательно разрешаем передачу кук/credentials!
}));

app.use(express.json());
app.use(cookieParser()); // Обязательно добавляем парсер кук перед роутами
app.use(express.static(path.join(__dirname, 'public')));

// Подключение маршрутов
app.use('/api', carRoutes);
app.use('/api/auth', authRoutes); // Теперь у нас есть эндпоинты /api/auth/register, /api/auth/login и т.д.

app.listen(port, function () {
    console.log(`🚀 Сервер запущен: http://localhost:${port}`);
});
