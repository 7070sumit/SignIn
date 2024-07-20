import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './Routes/login.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const app=express()
app.use(cors())
app.use(express.json())
dotenv.config()
app.use(bodyParser.json());




const PORT=process.env.PORT;
const MONGODB_URI=process.env.MONGODB_URI
app.use(router)

mongoose.connect(MONGODB_URI).catch((error) => {
    console.log("Error Connecting to Database");
    console.log(error);
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });



export default app;
