import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import { createConnection } from "mysql2"

dotenv.config({
    path:"./env"
})
const app = express()

app.use(express.json({limit:'16kb'}))
import cookieParser from "cookie-parser";
app.use(cors(
    {
        origin:process.env.CROS,
        credential:true,
    }
))


app.listen(3000,()=>{
    console.log("server listening at port 3000")
})

import router from "./route/user.route.js"
app.use("/api/v1/users",router)

createConnection({
  host:"localhost",
  user:"root",
  password:"11111111",
  database:"tourism"
}).connect((err)=>{
  if(err){
    console.error('Error connecting to the database:',err);
    return;
  }
  console.log('connected');
});






