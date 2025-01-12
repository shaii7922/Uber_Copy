const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [4, 'First name must be at least 4 characters long'],
        },
        lastname: {
            type: String,
            minlength: [4, 'Last name must be at least 4 characters long'],
        },
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        minlength: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String, // Used for live tracking
    },
},
 { timestamps: true }
);




// 1...2   Token is made here so its can be matched with login cookie
// userSchema.methods.generateToken = function(){
//     const token = jwt.sign({_id:this._id},JWT_SECRET)
//     return token
// }


// Define hashPassword as a static method
userSchema.statics.hashPassword = async function (password) {
    return await bcryptjs.hash(password,10)
}







// During login match user Password and login user Password
userSchema.methods.comparePassword = async function(password){
    return await bcryptjs.compare(password,this.password)

}



const userModel  = mongoose.model('user',userSchema)

module.exports = userModel;
