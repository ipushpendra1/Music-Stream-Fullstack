import express from 'express';
import multer from 'multer';
import { upload } from "../controllers/song.controller.js";

const storage = multer.memoryStorage();
const uploadMiddleware = multer({storage:storage});

const router = express.Router();

router.post('/upload', uploadMiddleware.single('song'), upload);

export default router;