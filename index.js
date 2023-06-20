//load .env file load into process.env
require('dotenv').config()

//Import express
const express=require('express')

//Import  cors
const cors = require('cors');
const router = require('./routes/router');

//import db
require('./db/connection')

//create server application
const server=express();

//import router
const routes=require('./routes/router')

//port definition
const PORT=3001 || process.env.PORT

//export uploads folder to client 
server.use('/uploads',express.static('./uploads'))


//use cors
server.use(cors());



//to parse
server.use(express.json())

//use routes
server.use(router)



//define port and run the server application
server.listen((PORT),()=>{
   console.log('Listening on the port'+PORT);
})

//Request resolving
server.get('/',(req,res)=>{
    res.send('Get request')
})