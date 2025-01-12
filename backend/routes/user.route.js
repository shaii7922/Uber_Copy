const express = require("express")
const router = express.Router();
const {body} = require("express-validator");
const { registerUser, loginUser, userProfile, logOut } = require("../controller/user.controller");
const { authUser } = require("../middleware/auth.middleware");

router.post("/register",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:4}).withMessage('First name must be atleast 4 characters long'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],registerUser)


router.post("/login",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
],loginUser)


router.get('/profile',authUser,userProfile)

router.get('/logout',authUser,logOut)

module.exports =router;

