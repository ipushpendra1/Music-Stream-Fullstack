import mongoose from "mongoose";
import config from "../config/config.js";

function connectDb() {
    mongoose.connect(config.MONGODB_URL)
    .then(()=>{
        console.log("MongoDB connected successfully");
        
    }).catch((err)=>{
      console.log("mongoDB connection Error ", err);
      
    })
}

export default connectDb;