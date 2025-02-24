const express = require("express");
// const workoutrouter = require('../Controller/WorkoutController');
const { workoutController, conworkout } = require("../Controller/WorkoutController");


const wrouter = express.Router();

wrouter.post('/workout', conworkout);

// wrouter.post("/workout", (req, res)=>{
//     res.send("workoutrouter")
// })
module.exports = wrouter;

// const express = require("express");
// const { workoutController, conworkout } = require("../Controller/WorkoutController"); // ✅ Import sahi karo

// const wrouter = express.Router(); // ✅ Express Router ka instance banao

// wrouter.post("/workout", conworkout); // ✅ Controller function use karo

// module.exports = wrouter;
