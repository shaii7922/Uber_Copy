const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')


const captionSchema = new mongoose.Schema({
   fullname:{
    firstname: {
        type: String,
        required: true,
        minlength:[3, 'Firstname must be at least 3 characters long'],
    },
    lastname: {
        type: String,
        required: true,
        minlength:3,
   }
},
   email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
   },
   
  password: {
    type: String,
    required: true,
    select:false
  },
  sockedId: {
    type: String,
    
  },

  status:{
    type: String,
    enum:['active', 'inactive'],
    default:'inactive'
  },

  vehicle:{
       color:{
           type: String,
           required: true,
           minlength:[3, 'Color must be at least 3 characters long'],
       },
       plate:{
              type: String,
              required: true,
              minlength:[3, 'Plate must be at least 3 characters long'],
       },
     capacity:{
        type: Number,
        required: true,
        min:[1, 'Capacity must be at least 1'],
     },
     vehicleType:{
        type: String,
        required: true,
        enum:['car', 'bus', 'truck']
     }
  },

  location:{
      latitude:{
          type: Number,
         
      },
        longitude:{
            type: Number,
           
        }
  },
    
  

})


// captionSchema.methods.generateAuthToken = async function(){

//     const token = jwt.sign({_id: this._id}, JWT_SECRET , {expiresIn: '24h'})
//     return token
// }



captionSchema.statics.hashPassword = async function(password){
    return await bcryptjs.hash(password, 10)
}



// Comapre password during login
captionSchema.methods.matchPassword = async function(enteredPassword){
  return await bcryptjs.compare(enteredPassword, this.password)
}


const Caption = mongoose.model('Caption', captionSchema)
module.exports = Caption;