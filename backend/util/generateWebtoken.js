const jwt = require("jsonwebtoken")
const { JWT_SECRET, JWT_TOKEN_EXPIRE } = require("../db")


exports.generateAuthToken = (id)=>{
    return jwt.sign({id},JWT_SECRET,{expiresIn:JWT_TOKEN_EXPIRE})  // 3 argumnets are there.
}