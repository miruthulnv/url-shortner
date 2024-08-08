import express from "express";
import mongoose from "mongoose";
import path from "path";
import {fileURLToPath} from "url";
import dotenv from "dotenv"
dotenv.config({path: ".env"});

import * as urlController from "./controller/urlController.js";


// ----- Database ------
const DB = process.env.DB_STRING.replace('<password>',process.env.DB_PASSWORD);
mongoose.connect(DB,{}).then((con)=>{
    console.log('Database Connected');
}).catch((err)=>{
    console.error(err);
    console.log('Database Not Connected');
})

const app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.use(express.static(path.join(__dirname,'public')))
app.set("view engine", "pug");
app.set('views', path.join(__dirname,'views'));


app.get('/', (req, res)=>{
    res.status(200).render('index')
})

app.use('/home', (req, res)=>{
    res.status(200).json({
        status:'success',
        message:'Welcome to my website!',
    })
})

app.post('/api/v1/shorten',urlController.shortenUrl)

app.use('*',(req,res)=>{
    res.status(404).json('404')
});

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})