import express from 'express';
import multer from 'multer';
import { upload, getSongs, getSongById, searchSong } from "../controllers/song.controller.js";
import jwt from 'jsonwebtoken';
import config from '../config/config.js';



const storage = multer.memoryStorage();
const uploadMiddleware = multer({storage:storage});
const router = express.Router();



router.use(async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Please login to  play"
        });
    }
    try{
        const decoded = jwt.verify(token,config.JWT_SECRET);
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