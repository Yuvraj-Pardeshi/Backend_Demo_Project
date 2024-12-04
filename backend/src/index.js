import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import mainRouter from "./routes/index.js"
import cors from "cors";
const app = express();

dotenv.config({
    path : "./env"
})

app.use(cors());
app.use(express.json());
app.use('/api/v1',mainRouter)

connectDB().then(()=>{
    app.listen(process.env.PORT || 8080, ()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log("MongoDB connection error" ,error)
})
