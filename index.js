import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import setRoutes from './router.js';
dotenv.config();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes
setRoutes(app);

mongoose.connect(process.env.MONGO_URI).then(r => console.log('Connected to MongoDB')).catch(err => console.log(err));

app.listen(8080, () => console.log('Server is running on port 8080'));
