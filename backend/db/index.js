require("dotenv").config()

module.exports={
    PORT:process.env.PORT,
    DB_CONNECT:process.env.DB_CONNECT,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_TOKEN_EXPIRE:process.env.JWT_TOKEN_EXPIRE,
    GOOGLE_MAPS_API:process.env.GOOGLE_MAPS_API
}