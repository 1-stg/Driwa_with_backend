const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        index: true
    },
    images: { type: [String], default: [] },
    mark: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    mileage: { type: Number, required: true, min: 0 },
    year: { 
        type: Number, 
        required: true, 
        min: 1900, 
        max: new Date().getFullYear() + 1 
    },
    ownersCount: { type: Number, required: true, min: 1 },
    gearbox: {
        type: String,
        required: true,
        enum: ['Роботизированная', 'Автоматическая', 'Механическая', 'Вариатор'],
        default: 'Роботизированная'
    },
    color: { type: String, required: true, trim: true },
    engine: { type: String, required: true, trim: true },
    driveShaft: {
        type: String,
        required: true,
        enum: ['Полный', 'Задний', 'Передний'],
        default: 'Задний'
    },
    status: {
        type: String,
        enum: ['active', 'sold', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('car', carSchema);
