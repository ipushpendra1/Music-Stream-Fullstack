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

export async function getSongs(req,res){
    const songs = await songModel.find();
    res.status(200).json({
        message:"songs fetched successfully",
        songs:songs
    })
}



export async function getSongById(req,res){
    const songId = req.params.id;
    const song = await songModel.findOne({
        _id:songId
    })
    if(!song){
        return res.status(404).json({
            message:"song not found"
        })
    }
    res.status(200).json({
        message:"song fetched successfully",
        song:song
    })
}


export async function searchSong(req,res){
    const text = req.query.text;
    const song = await songModel.find({
        title:{
            $regex:text,
            $options:"i"
        },
        
    })
    res.status(200).json({
        message:"songs fetched successfully",
        songs:song
    })
}