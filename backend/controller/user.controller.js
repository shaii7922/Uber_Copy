const userModel = require("../models/user.model")
const {generateAuthToken} = require("../util/generateWebtoken")
const asyncHandler = require("express-async-handler");
const userService = require("../services/user.service")
const {validationResult} = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");

exports.registerUser = asyncHandler(
    async(req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
    
    
        }
        // console.log(req.body);
        
    
        const {fullname,email,password} = req.body
    

        // Checking for user email exist.
        const isUserAlreadyExist = await userModel.findOne({email})
        if(isUserAlreadyExist)
            {
            return res.status(400).json({message:'User already exist'})
           }






        const hashPassword = await userModel.hashPassword(password)
    
        // fetching data from fullname object
        const user = await userService.createUser({
            firstname:fullname.firstname,
            lastname:fullname.lastname,
            email,
            password:hashPassword,
        })
    
        let token =     generateAuthToken(user._id);
    
        res.status(201).json({token,user})
    }
)



exports.loginUser = asyncHandler(
    async(req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
    
    
        }

        const {email,password} = req.body

//      checking user is exist or not
        const user  = await userModel.findOne({email}).select('+password')

        if(!user){
            return res.status(401).json({message:'Invalid email or password'})
        }

        const isMatch = await user.comparePassword(password)

        if(!isMatch){
            return res.status(401).json({message:'Invalid email or password'})
        }

        const token = generateAuthToken(user._id)
 
        res.cookie('myCookie',token,{
            maxAge: 10 * 60 * 60 * 1000,
            httpOnly: true,
          })

        res.status(201).json({message:"User Log in successfull",token,user})
    }
)



exports.userProfile = asyncHandler(
    async(req,res,next)=>{
           res.status(200).json(req.user)
           console.log(req.user);
           
    }
)

exports.logOut = asyncHandler(async (req, res, next) => {
    const token = req.cookies.myCookie || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Blacklist the token
    await blacklistTokenModel.create({ token });

    // Clear the cookie
    res.clearCookie('myCookie');

    res.status(200).json({ message: 'User logged out successfully' });
});

