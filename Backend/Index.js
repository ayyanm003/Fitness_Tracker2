const express = require('express');
const app = express();
// require('dotenv').config();
const mongoose = require('mongoose');

app.get("/", (req, res) => {
    res.send("Home");
})

// mongoose.connect(process.env.ATLAS_URL)
mongoose.connect("mongodb+srv://admin:admin123@clusteraptech.sw28l.mongodb.net/merndb?retryWrites=true&w=majority&appName=Clusteraptech")
.then(()=>{
    app.listen(3005, ()=> {
        console.log("Server Start")
    });
}).catch((error)=>{
    console.log(error)
})

// app.listen(3005, ()=> {
//     console.log("Server Start")
// });