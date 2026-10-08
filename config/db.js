const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        const connection =  await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection Successfully");
    } catch(err){
        console.log("DB connection failed");
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;