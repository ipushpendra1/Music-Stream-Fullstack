import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
        unique:true
    },
    artist:{
        type:String,
        required:true
    },
     poster:{
        type:String,
        required:true,
        default: "https://discussions.apple.com/content/attachment/592590040"
    },
    audio:{
        type:String,
        required:true
    },

   
     
    });


    const songModel = mongoose.model("song",songSchema);
    export default songModel;