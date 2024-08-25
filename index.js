const express = require('express');
const cookieParser=require('cookie-parser')
const database =require("./config/database")
require('dotenv').config();
const userRoutes=require("./routes/User")
 
// const planRoutes = require('./routes/planRoutes');
 
const cors=require("cors")
const app = express();

database.connect();

app.use(express.json());
app.use(cookieParser())
// app.use('/api', introductionRoutes);
// app.use('/api', planRoutes);
app.use('/api/auth',userRoutes)
// app.use('/api', paymentOptionRoutes);
// app.use('/api', termsRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running.............."
    })
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
