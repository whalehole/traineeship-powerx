const express = require('express');
const app = express();
const path = require('path');
const inout = require('./routes/inout');

// 
// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// 

// HOME
app.use(express.static("public"));
app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, "./index.html"));
})

// ROUTES
app.use("/inout", inout);
app.listen(5000, ()=>{
    console.log("App is listening at port 5000 NOW!");
})