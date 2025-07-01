import { UploadFile } from "../services/storage.service.js";
import songModel from "../models/song.model.js"

export async function upload(req,res){
const result = await UploadFile(req.file.buffer)
const {artist,title} = req.body;
const audioUrl = result.url; 

const song = await songModel.create({
    artist,
    title,
    audio:audioUrl
})

res.status(201).json({
    message:"song uploaded successfully",
    song:{
        id:song._id,
        title:song.title,
        artist:song.artist,
        audio:song.audio

    }
})


}
