const express = require('express');
const app = express();

const User = require('./Model/User');
// require('dotenv').config();
const mongoose = require('mongoose');
let UserData = async function (){
    try {
    await User.create({
         name: "John Doe b",
         email: "johndoe@example.com",
         password: "password123",
     }).then(()=>{
         console.log("User created successfully")
     }).catch((e)=>{
         console.log(e)
     })
    } catch (error) {
     console.log(error)
    }
 }
app.get("/", (req, res) => {
    res.send("Home");
})

// mongoose.connect(process.env.ATLAS_URL)
mongoose.connect("mongodb+srv://admin:admin123@clusteraptech.sw28l.mongodb.net/merndb?retryWrites=true&w=majority&appName=Clusteraptech")
.then(()=>{
    app.listen(3005, ()=> {
        UserData();
        console.log("Server Start")
    });
}).catch((error)=>{
    console.log(error)
})

// app.listen(3005, ()=> {
//     console.log("Server Start")
// });