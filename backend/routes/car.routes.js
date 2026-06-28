const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');

router.get('/getAllCars', carController.getAllCars);
router.get('/carDetails', carController.getCarDetails);
router.get('/user-cars', carController.getUserCars)

module.exports = router;

// const authMiddleware = require('../middlewares/auth.middleware');

// // Пример: этот роут станет доступен только тем, у кого во Vue есть живой Access Token
// router.post('/addCar', authMiddleware, carController.addCar);