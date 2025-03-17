const express = require("express");
const router = express.Router();
const {
    conworkout,
    getAllWorkouts,
    getUserWorkouts,
    updateWorkout,
    deleteWorkout,
    getWorkoutsByCategory,
    getWorkoutChartData
} = require("../Controller/WorkoutController");

// Create a workout
router.post("/workouts", conworkout);

// Get all workouts (Paginated & Sorted)
router.get("/workouts", getWorkoutsByCategory);

// Get workouts for a specific user
router.get("/workouts/:userId", getUserWorkouts);

// Update a workout
router.put("/workouts/:id", updateWorkout);

// Delete a workout
router.delete("/workouts/:id", deleteWorkout);

router.get("/workout-chart/:userId", getWorkoutChartData);
module.exports = router;
