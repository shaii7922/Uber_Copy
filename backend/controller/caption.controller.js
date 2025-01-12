const captionModel = require("../models/caption.model")
const captionService = require("../services/captian.service")
const asyncHandler = require("express-async-handler")
const {validationResult} = require("express-validator")
const { generateAuthToken } = require("../util/generateWebtoken")
const blacklistTokenModel = require("../models/blacklistToken.model")

exports.createCaption = asyncHandler(
    async(req,res,next)=>{
  
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {fullname,email,password,vehicle} = req.body

    // checking email exist already .
   const isCaptionAlreadyExist = await captionModel.findOne({email})

   if(isCaptionAlreadyExist){
    return res.status(400).json({message:'captian already exist'})
   }


    const hashedPassword = await captionModel.hashPassword(password)

    // fetching data from fullname object.
    const caption = await captionService.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
         password:hashedPassword,
         color:vehicle.color,
         capacity:vehicle.capacity,
         plate:vehicle.plate,
         vehicleType:vehicle.vehicleType
         
        
    })

    let token = generateAuthToken(caption._id)
    res.status(201).json({token,caption})
  

}
)

exports.loginCaption = asyncHandler(
    async(req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        const {email,password} = req.body
        const caption = await captionModel.findOne({email}).select('+password')

        if(!caption){
            return res.status(400).json({message:'Invalid email or password'})
        }

        const isPasswordMatch = await caption.matchPassword(password)

        if(!isPasswordMatch){
            return res.status(400).json({message:'Invalid email or password'})
        }
        const token = generateAuthToken(caption._id)

        res.cookie('ccokiee',token,{
            maxAge: 10 * 60 * 60 * 1000,
            httpOnly: true,
          })

          res.status(201).json({message:"Captian Log in successfull",token,caption})

        
    }
)


exports.getCaptionProfile = asyncHandler(
    async(req,res,next)=>{
     res.status(200).json({caption:req.caption})
    }
)


exports.logOut = asyncHandler(
    async(req,res,next)=>{

        const token = req.cookies.ccokiee || req.headers.authorization?.split(" ")[1];
        await blacklistTokenModel.create({token})

        res.clearCookie('ccokiee')
        res.status(200).json({message:'Log out successfully'})
    }
)
