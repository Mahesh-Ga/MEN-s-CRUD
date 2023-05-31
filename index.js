const express = require('express');
const empRoute = require('./Routes/employees');
const config = require('config')

const app = express();

app.use((request,response,next) =>{
    response.setHeader("Access-Control-Allow-Origin","*")
    response.setHeader("Access-Control-Allow-Methods","*")
    response.setHeader("Access-Control-Allow-Headers","*")
    next();
})

app.use(express.json());

app.use('/employees',empRoute);

app.listen(config.get('PORT'),()=>{console.log("Server started ... ")});