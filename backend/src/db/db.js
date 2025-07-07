import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

function connectDb() {
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/stream-music";
    
    mongoose.connect(mongoUri)
        .then(() => {
            console.log("Connected to MongoDB at:", mongoUri);
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
            console.log("Make sure MongoDB is running on your system");
        });
}

export default connectDb;