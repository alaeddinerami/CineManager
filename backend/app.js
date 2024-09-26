const express = require("express");
const connectDB = require('./config/db')
const dotenv = require('dotenv').config();
const authRoute = require('./routers/userRoutes')
const User = require('./models/User')
const bcrypt = require('bcryptjs')
const filmRoute = require('./routers/filmRoutes');
const salleRoute = require('./routers/salleRoutes');
const seanceRoute = require('./routers/seanceRoute')
const auth = require('../backend/middlewares/auth')

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/api/home',(req,res)=>{
    res.status(200).json({message: 'alalaa'})
})

async function initAdmin(){
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
initAdmin();

app.use('/api', authRoute);
app.use('/api',auth, filmRoute);
app.use('/api',auth, salleRoute);
app.use('/api',auth, seanceRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
    
})