let express = require(`express`);
let path = require('path');
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5174' }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Driva');

const carSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',        // ссылка на коллекцию users
        required: true,
        index: true
    },
    images: {
        type: [String],
        default: []
    },
    mark: {
        type: String,
        required: true,
        trim: true
    },
    model: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    mileage: {
        type: Number,
        required: true,
        min: 0
    },
    year: {
        type: Number,
        required: true,
        min: 1900,
        max: new Date().getFullYear() + 1
    },
    ownersCount: {
        type: Number,
        required: true,
        min: 1
    },
    gearbox: {
        type: String,
        required: true,
        enum: ['Роботизированная', 'Автоматическая', 'Механическая', 'Вариатор'],
        default: 'Роботизированная'
    },
    color: {
        type: String,
        required: true,
        trim: true
    },
    engine: {
        type: String,
        required: true,
        trim: true
    },
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


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        enum: ['Мужской', 'Женский'],
        required: true
    },
    age: {
        type: Number,
        required: true,
        min: 18,
        max: 120
    },
    photo: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    status: {
        type: String,
        enum: ['active', 'banned'],
        default: 'active'
    }
}, {
    timestamps: true
});

Car = mongoose.model('car', carSchema);
User = mongoose.model('user', userSchema);


app.get('/getAllCars', async (req, res) => {
    try {
        const cars = await Car.find();
        res.send(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/carDetails', async (req, res) => {
    try {
        let id = req.query;

        const car = await Car.findOne({
            _id: id,
        })

        res.send(car);
    } catch {
        res.sendStatus(400);
    }
})