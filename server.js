import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'
import cors from "cors";
import path from "path";
// config env
dotenv.config();

// database config

connectDB();
const app=express();

// middleware 
app.use(cors());
app.use(express.json())
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname,'./client/build')))
app.use('/api/v1/auth',authRoutes)
app.use('*',function(req,res)
{
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})
const PORT=process.env.PORT || 8080;

//RUN
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
});