import { UploadFile } from "../services/storage.service.js";
import songModel from "../models/song.model.js"

const DEFAULT_POSTER_URL = "https://discussions.apple.com/content/attachment/592590040";

export async function upload(req,res){
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded"
            });
        }

        const {artist, title} = req.body;
        
        if (!artist || !title) {
            return res.status(400).json({
                message: "Artist and title are required"
            });
        }

        console.log('Uploading file to storage...');
        const result = await UploadFile(req.file.buffer);
        console.log('File uploaded to storage:', result.url);
        
        const audioUrl = result.url; 

        console.log('Creating song in database...');
        const song = await songModel.create({
            artist,
            title,
            audio: audioUrl,
            poster: DEFAULT_POSTER_URL
        });
        console.log('Song created in database:', song._id);

        res.status(201).json({
            message: "song uploaded successfully",
            song: {
                id: song._id,
                title: song.title,
                artist: song.artist,
                audio: song.audio,
                poster: song.poster
            }
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            message: "Failed to upload song",
            error: error.message
        });
    }
}

export async function getSongs(req,res){
    const songs = await songModel.find({
        $and: [
            { title: { $not: /test/i } },
            { artist: { $not: /test/i } }
        ]
    });
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
        $or: [
            { title: { 
                $regex: text,
                 $options: "i" 
                } 
            },
            { 
                artist: {
                     $regex: text, 
                     $options: "i" 
                    } 
                }
        ],
     
       
    
       
        
    })
    res.status(200).json({
        message:"songs fetched successfully",
        songs:song
    })
}

