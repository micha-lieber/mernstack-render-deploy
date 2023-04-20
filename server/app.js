import cors from 'cors'
import express from "express";
import bodyParser  from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from "path";
import { fileURLToPath } from "url";
import router from './routes/userroute.js'


dotenv.config();

const app=express();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
const port=process.env.PORT || '4000'

app.use('/',router);
const mongo_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority`;
mongoose.connect(mongo_URI,{ dbName:process.env.DB_NAME})
.then( ()=>{
    console.log(`Database connected 😎`);
})
.catch(err =>{
    console.log(err);
});
 const __filename = fileURLToPath(import.meta.url);

 const __dirname = path.dirname(__filename);



app.use(express.static(path.join(__dirname, "../client/build")));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname + "/../client/build/index.html"))
})


app.listen(port,()=>{
    console.log(`listening to ${port}  port`);
})