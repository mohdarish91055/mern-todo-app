const express = require('express')
const dotenv = require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
    credentials: true,               // Allow credentials (cookies)
  }));
connectDB();

app.get('/',(req,res)=>{
    res.send('Hello this is server');
});

app.use('/api/auth',authRoutes);
app.use('/api/todos',todoRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`servering is running at http://localhost:${process.env.PORT}`)
})
