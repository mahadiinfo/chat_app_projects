import dotenv from 'dotenv';
dotenv.config();
import {app, server} from "./socket/socket.js"
import express from 'express';
import { connectDb } from './db/connection.db.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

connectDb(); 

app.use(cors({
    origin:"https://time-pass-ten.vercel.app",
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;


// route
import userRoute from './routes/user.routes.js'
import messageRoute from "./routes/message.routes.js"
app.use('/api/v1/user', userRoute)
app.use('/api/v1/message', messageRoute)


import { errorMiddleware } from './middlewares/error.middleware.js';
app.use(errorMiddleware)


server.listen(PORT, ()=>{
    console.log(`this server is running at ${PORT} port`)
})
