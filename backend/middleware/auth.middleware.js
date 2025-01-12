const userModel = require("../models/user.model");
const captionModel = require("../models/caption.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../db");
const blacklistTokenModel = require("../models/blacklistToken.model");

exports.authUser = async (req, res, next) => {
    const token = req.cookies.myCookie || req.headers.authorization?.split(" ")[1];
//   console.log("Token:", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlaclListed = await blacklistTokenModel.findOne({token:token})
  // console.log(isBlaclListed);
  
  if(isBlaclListed){
      return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // decode token when User login.
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    //   compare that decode token with DB.
    const user = await userModel.findById(decoded.id);

    req.user = user; // Proceed to the next middleware or route handler
    return next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.log(err);
    
    return res.status(401).json({ message: "Unauthorized" });
  }
};


exports.authCaption = async(req,res,next)=>{

  const token = req.cookies.ccokiee || req.headers.authorization?.split(" ")[1];
  console.log("Middleware Token",token);
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const isBlaclListed = await blacklistTokenModel.findOne({token:token})
  console.log("BlackListed",isBlaclListed);
  
  if(isBlaclListed){
      return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded);

    const caption = await captionModel.findById(decoded.id);

    req.caption = caption; // Proceed to the next middleware or route handler
    return next(); // Proceed to the next middleware or route handler
  }
   catch (err) 
   {
    console.log(err);
    
    return res.status(401).json({ message: "Unauthorized" });
  }
}