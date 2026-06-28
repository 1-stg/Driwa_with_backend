const Car = require('../models/Car');

exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.send(cars);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCarDetails = async (req, res) => {
    try {
        const { carId } = req.query;

        const car = await Car.findOne({ _id: carId });
        console.log(car);
        

        if (!car) {
            return res.status(404).json({ message: 'Машина не найдена' });
        }
        res.send(car);
    } catch (err) {
        res.sendStatus(400);
    }
};

exports.getUserCars = async (req, res) => {
    try {
        const { id } = req.query;
        let userCars = await Car.find({ 'userId': id });
        res.send(userCars);
    } catch {
        res.sendStatus(400);
    }
}