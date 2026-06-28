const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

// Функция для генерации пары токенов
const generateTokens = (payload) => {
    // Проверяем наличие секретов в конфиге
    const accessSecret = config.jwtAccessSecret || 'fallback_access_secret';
    const refreshSecret = config.jwtRefreshSecret || 'fallback_refresh_secret';

    const accessToken = jwt.sign(payload, accessSecret, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, refreshSecret, { expiresIn: '30d' });
    return { accessToken, refreshToken };
};

// 1. РЕГИСТРАЦИЯ
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Заполните все поля' });
        }

        const candidate = await User.findOne({ email });
        if (candidate) {
            return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'Регистрация успешна!' });
    } catch (err) {
        console.error('Ошибка при регистрации:', err);
        res.status(500).json({ error: err.message });
    }
};

// 2. ВХОД (ЛОГИН)
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Валидация входных данных: если фронтенд прислал пустоту
        if (!email || !password) {
            return res.status(400).json({ message: 'Пожалуйста, введите email и пароль' });
        }

        // Ищем пользователя в базе
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        // Защита: проверяем, есть ли вообще хэш пароля у юзера в базе данных
        if (!user.password) {
            console.error(`У пользователя ${email} отсутствует хэш пароля в БД!`);
            return res.status(400).json({ message: 'Ошибка учетной записи базы данных' });
        }

        // Защита от падения bcrypt: переводим всё в строки для безопасности
        const inputPassword = String(password);
        const dbPasswordHash = String(user.password);

        // Сравниваем пароли
        const isMatch = await bcrypt.compare(inputPassword, dbPasswordHash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Неверный email или пароль' });
        }

        // Генерируем токены
        const { accessToken, refreshToken } = generateTokens({ userId: user._id });

        // Отправляем Refresh Token в защищенной куке
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false, // в продакшене (HTTPS) поставить true
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 дней
        });

        // Отдаем ответ во Vue
        res.json({ accessToken, user });

    } catch (err) {
        // Если сервер всё равно выдаст 500 — этот лог в терминале бэкенда покажет точную строчку падения!
        console.error('--- КРИТИЧЕСКАЯ ОШИБКА В КОНТРОЛЛЕРЕ ЛОГИНА ---');
        console.error(err);
        res.status(500).json({ error: 'Внутренняя ошибка сервера при авторизации', details: err.message });
    }
};

// 3. ОБНОВЛЕНИЕ ТОКЕНА (REFRESH)
exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(401).json({ message: 'Пользователь не авторизован (нет куки)' });
        }

        let userData;
        try {
            userData = jwt.verify(refreshToken, config.jwtRefreshSecret || 'fallback_refresh_secret');
        } catch (e) {
            return res.status(401).json({ message: 'Токен сессии устарел' });
        }

        const user = await User.findById(userData.userId);
        if (!user) {
            return res.status(401).json({ message: 'Пользователь не найден в БД' });
        }

        const tokens = generateTokens({ userId: user._id });

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken: tokens.accessToken, user });
    } catch (err) {
        console.error('Ошибка при рефреше токена:', err);
        res.status(500).json({ error: err.message });
    }
};

// 4. ВЫХОД (ЛОГАУТ)
exports.logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken');
        return res.json({ message: 'Успешный выход' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
