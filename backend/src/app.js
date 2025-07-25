import express from 'express';
import authRoutes from './routes/auth.routes.js'
import songRoutes from './routes/song.routes.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';



const app = express();
app.use(express.json ());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.use("/auth",authRoutes);
app.use("/song",songRoutes)

export default app;