const express = require("express");
const router = express.Router();
const {
    conworkout,
    getAllWorkouts,
    getUserWorkouts,
    updateWorkout,
    deleteWorkout,
    getUserWorkoutsByCategory,
    getWorkoutChartData,
    getWorkoutCategories,
    getUserWorkoutCategories
} = require("../Controller/WorkoutController");

// Create a workout
router.post("/workouts", conworkout);
router.get("/",getAllWorkouts);
router.get("/categories", getWorkoutCategories);


router.get("/workouts/:userId/categories", getUserWorkoutCategories);

module.exports = router;

router.get("/workouts/category/:userId", getUserWorkoutsByCategory);
// Get workouts for a specific user
router.get("/workouts/:userId", getUserWorkouts);

// Update a workout
router.put("/workouts/:id", updateWorkout);

// Delete a workout
router.delete("/workouts/:id", deleteWorkout);

router.get("/workout-chart/:userId", getWorkoutChartData);
module.exports = router;
