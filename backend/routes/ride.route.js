const express = require('express')
const router = express.Router();
const { body, query } = require('express-validator');
const { authUser } = require('../middleware/auth.middleware');
const { createRide } = require('../controller/ride.controller');



router.post('/create',
    authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    createRide
)


module.exports = router