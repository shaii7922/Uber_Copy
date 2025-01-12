const express = require('express');
const { body } = require('express-validator');
const { createCaption, loginCaption, getCaptionProfile, logOut } = require('../controller/caption.controller');
const { authCaption } = require('../middleware/auth.middleware');
const router = express.Router();

router.post('/create',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname must be at least 3 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be at least 3 characters long'),
   body('vehicle.plate').isLength({min:3}).withMessage('Plate must be at least 3 characters long'),
   body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be at least 1'),
   body('vehicle.vehicleType').isIn(['car', 'bus', 'truck']).withMessage('Invalid vehicle type'),
],createCaption);



router.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:5}).withMessage('Password must be at least 5 characters long'),
],loginCaption);

router.get('/profile',authCaption,getCaptionProfile)

router.get('/logout',authCaption,logOut)

module.exports = router;