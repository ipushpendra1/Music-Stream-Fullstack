import mongoose from "mongoose";


function connectDb() {
 mongoose.connect("mongodb://localhost:27017/stream-music") 
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });


}

export default connectDb;