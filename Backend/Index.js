const express = require('express');
const app = express();
const userroute = require('./Router/userRoutes');
const workoutrouter = require('./Router/workoutRoutes');
const User = require('./Model/User');
// const workoutData = require("./Model/Workout")
// require('dotenv').config();
app.use(express.json());
const mongoose = require('mongoose');
const nrouter = require('./Router/NutritionRoutes');

app.use("/user", userroute);
app.use("/rworkout", workoutrouter);
app.use("/rnutrition", nrouter);
// let workoutData = async function (){
//     try {
//     await workout.create({
//          name: "name",
//          sets: 4,
//          reps: 3,
//         weight : 33
//      }).then(()=>{
//          console.log("User created successfully")
//      }).catch((e)=>{
//          console.log(e)
//      })
//     } catch (error) {
//      console.log(error)
//     }
//  }
app.get("/", (req, res) => {
    res.send("Home");
})

// mongoose.connect(process.env.ATLAS_URL)
mongoose.connect("mongodb+srv://admin:admin123@clusteraptech.sw28l.mongodb.net/merndb?retryWrites=true&w=majority&appName=Clusteraptech")
.then(()=>{
    app.listen(3005, ()=> {
        // workoutData();
        console.log("Server Start")
    });
}).catch((error)=>{
    console.log(error)
})

// app.listen(3005, ()=> {
//     console.log("Server Start")
// });