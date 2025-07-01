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
        default:"https://www.pikpng.com/pngl/m/25-253565_music-notes-png-transparent-background-music-notes-clipart.png"
    },
    audio:{
        type:String,
        required:true
    },

   
     
    });


    const songModel = mongoose.model("song",songSchema);
    export default songModel;