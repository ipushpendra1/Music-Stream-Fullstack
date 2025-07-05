import express from 'express';
import multer from 'multer';
import { upload, getSongs, getSongById, searchSong } from "../controllers/song.controller.js";
import jwt from 'jsonwebtoken';
const JWT_SECRET = "dfb828bb2bf78502b2c49308097db6cd7ad00d8edf2299ede56b85199ea9397d";


const storage = multer.memoryStorage();
const uploadMiddleware = multer({storage:storage});
const router = express.Router();



router.use(async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Please login to upload a song"
        });
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        next();
    }catch(error){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
})




router.post('/upload', uploadMiddleware.single('song'), upload);

router.get('/get-songs', getSongs);

router.get('/get-song/:id', getSongById);

router.get('/search-songs', searchSong);


export default router;