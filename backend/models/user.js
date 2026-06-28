const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email обязателен для заполнения'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\x20*[\w-\.]+@([\w-]+\.)+[\w-]{2,4}\x20*$/, 'Пожалуйста, введите корректный email']
    },
    password: {
        type: String,
        required: [true, 'Пароль обязателен для заполнения'],
        minlength: [8, 'Пароль должен быть не менее 8 символов']
    }
}, {
    timestamps: true
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

module.exports = mongoose.model('user', userSchema);
