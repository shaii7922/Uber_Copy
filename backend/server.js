
const dotenv = require("dotenv")
dotenv.config()

const express = require("express");
const cors = require("cors")


const connectToDb = require("./db/db")
const userRoutes = require("./routes/user.route");
const captionRoutes = require("./routes/caption.route");
const { PORT } = require("./db");
const mapRoutes = require("./routes/map.route")
const rideRoutes = require('./routes/ride.route')


const cookieParser = require('cookie-parser')

connectToDb()
const app = express()

// Middleware for site to site connection.
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())  // handle cookie 

app.use('/users',userRoutes)
app.use('/captions',captionRoutes)
app.use('/maps',mapRoutes)
app.use('/rides',rideRoutes)


app.listen(PORT,(err)=>{
    if(err) console.log(err);
    console.log("server running at the PORT",PORT);
    
    
})