const express = require("express");
const connectDB = require('./config/db')
const dotenv = require('dotenv').config();
const authRoute = require('./routers/authRoutes')



connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/api/home',(req,res)=>{
    res.status(200).json({message: 'alalaa'})
})

app.use('/auth',authRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})