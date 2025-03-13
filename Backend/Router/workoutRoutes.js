const express = require("express");
// const workoutrouter = require('../Controller/WorkoutController');
const { workoutController, conworkout, getAllWorkouts, getUserWorkouts, deleteWorkout, updateWorkout } = require("../Controller/WorkoutController");


const wrouter = express.Router();

wrouter.post('/workout', conworkout);
wrouter.get('/workouts', getAllWorkouts);
wrouter.get('/workouts/:userId', getUserWorkouts)
wrouter.put('/workout/:id', updateWorkout)
wrouter.delete('/workout/:id', deleteWorkout)


// wrouter.post("/workout", (req, res)=>{
//     res.send("workoutrouter")
// })
module.exports = wrouter;

// const express = require("express");
// const { workoutController, conworkout } = require("../Controller/WorkoutController"); // ✅ Import sahi karo

// const wrouter = express.Router(); // ✅ Express Router ka instance banao

// wrouter.post("/workout", conworkout); // ✅ Controller function use karo

// module.exports = wrouter;
