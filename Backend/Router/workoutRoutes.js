const express = require("express");
// const { workoutrouter } = require('../Controller/WorkoutController');


const wrouter = express.workoutrouter();

// workoutrouter.post('/workout', workoutrouter);

// wrouter.post("/workout", (req, res)=> {
//     res.send("workout")
// }) 

wrouter.post("/workout", (req, res)=>[
    res.send("workoutrouter")
])
module.exports = wrouter;