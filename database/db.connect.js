const mongoose = require("mongoose")
require('dotenv').config()


const uri = process.env.uri 

const connect = async () => {
    try {
        await mongoose.connect(process.env.uri); 
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.log("❌ MongoDB connection failed:", error.message);
    }
};

module.exports = connect;

// const connect = async() => {
   
//     try{
//         const connection = await mongoose.connect(uri)
//         if(connection){
//             console.log("database connected successfully");
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// module.exports = connect