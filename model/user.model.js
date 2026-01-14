const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    username: { type: String, required : true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture:{type:String},
    verified:{type:Boolean, default:false}
})
const userModel = mongoose.model("MedTrack", userSchema);


module.exports = {userModel}