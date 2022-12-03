const express = require('express');
const cors = require('cors');
const { connectDB } = require('./Database/index');
const userRouter = require('./Routes/user');

const adminRouter = require('./Routes/admin');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(userRouter)
app.use(adminRouter);

// app.get('/',(req,res)=>{
//     res.send('server is started')
//     )
app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});

connectDB().then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log(`listening on port ${process.env.PORT}`);
})});

