const express = require("express");
const connectDB = require('./config/db')
const dotenv = require('dotenv').config();
const authRoute = require('./routers/userRoutes')
const User = require('./models/User')
const bcrypt = require('bcryptjs')



connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/api/home',(req,res)=>{
    res.status(200).json({message: 'alalaa'})
})

async function initAdmine(){
    try{
        const admin = await User.findOne({email:'admin@gmail.com'});
        if(!admin){
            const hashedPassword = await bcrypt.hash('12345678',8)
            const newAdmin= new User({
                name : 'admin',
                email: 'admin@gmail.com',
                password: hashedPassword,
                role: 'admin'
            })
            await newAdmin.save();
            console.log('fisrt admine created')
        }

   }catch(error){
    console.log('error for creating first admin: ', error);
    
   }
}
initAdmine();
app.use('/api',authRoute)
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})