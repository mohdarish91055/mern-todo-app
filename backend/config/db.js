const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB Connected');
    }catch(error){
        console.error('Error in connecting to MongoDB',error);
    }
}

module.exports = connectDB;