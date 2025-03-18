const Workout = require("../Model/Workout");
const mongoose = require("mongoose")



const getAllWorkouts = async (req, res) => {
    try {
        let { page = 1, limit = 10, category } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        let filter = {};

        if (category) {
            filter.categoryName = category; // Filter category wise
        }

        const totalWorkouts = await Workout.countDocuments(filter);
        const totalPages = Math.ceil(totalWorkouts / limit);

        const workouts = await Workout
            .find(filter)
            .sort({ "exercises.0.name": 1 }) // Sorting by first exercise name
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            page,
            totalPages,
            totalWorkouts,
            workouts
        });
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};




const getUserWorkouts = async (req, res) => {
    try {
        const { userId } = req.params;
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        // Validate userId format
        if (!userId || userId.length !== 24) {
            return res.status(400).json({ message: "Invalid User ID!" });
        }

        // Count total workouts for this user
        const totalWorkouts = await Workout.countDocuments({ user: userId });
        const totalPages = Math.ceil(totalWorkouts / limit);

        // Fetch paginated workouts for the user
        const workouts = await Workout
            .find({ user: userId })
            .sort({ "exercises.0.name": 1 }) // Sorting by first exercise name
            .skip((page - 1) * limit)
            .limit(limit);

        if (!workouts.length) {
            return res.status(404).json({ message: "No workouts found!" });
        }

        res.status(200).json({
            page,
            totalPages,
            totalWorkouts,
            workouts
        });
    } catch (error) {
        console.error("❌ Error fetching user workouts:", error);
        res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};



// ✅ Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const { name, sets, reps, weight } = req.body;

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            id,
            { "exercises.0.name": name, "exercises.0.sets": sets, "exercises.0.reps": reps, "exercises.0.weight": weight },
            { new: true }
        );

        if (!updatedWorkout) {
            return res.status(404).json({ message: "Workout not found!" });
        }

        res.status(200).json({ message: "Workout updated successfully!", updatedWorkout });
    } catch (error) {
        console.error("Error updating workout:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedWorkout = await Workout.findByIdAndDelete(id);

        if (!deletedWorkout) {
            return res.status(404).json({ message: "Workout not found!" });
        }

        res.status(200).json({ message: "Workout deleted successfully!" });
    } catch (error) {
        console.error("Error deleting workout:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};




const getUserWorkoutsByCategory = async (req, res) => {
    try {
        const { userId } = req.params;
        const { categoryName, page = 1, limit = 5 } = req.query;

        console.log("🔥 API Request Received:");
        console.log("✅ User ID:", userId);
        console.log("✅ Category Name:", categoryName);
        console.log("✅ Page:", page);

        // Pagination logic
        const skip = (page - 1) * limit;

        // 🔍 Query workouts by user & category
        let query = { user: userId };
        if (categoryName) {
            query.categoryName = categoryName;
        }

        console.log("🔍 Querying MongoDB with:", query);

        const workouts = await Workout.find(query).skip(skip).limit(limit);

        if (workouts.length === 0) {
            return res.status(404).json({ message: "No workouts found!" });
        }

        res.status(200).json({ workouts, totalPages: Math.ceil(workouts.length / limit) });
    } catch (error) {
        console.error("❌ Error Fetching Workouts:", error);
        res.status(500).json({ message: "Error fetching workouts" });
    }
};




// ✅ Create a new workout with category
const conworkout = async (req, res) => {
    const { userId, categoryName, name, sets, reps, weight } = req.body;
    try {
        const result = await Workout.create({
            user: userId,
            categoryName, // Include category name
            exercises: [{ name, sets, reps, weight }]
        });

        res.status(201).json({ message: "Workout added successfully!", result });
    } catch (error) {
        console.error("Error adding workout:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};
const getWorkoutCategories = async (req, res) => {
    try {
        const categories = await Workout.distinct("categoryName"); // Unique categories
        res.status(200).json({ categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

const getUserWorkoutCategories = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("🔥 Fetching categories for user:", userId);

        const workouts = await Workout.find({ user: userId });

        if (!workouts.length) {
            return res.status(404).json({ message: "No workouts found" });
        }

        // Extract unique categories
        const uniqueCategories = [...new Set(workouts.map(w => w.categoryName))];

        console.log("✅ Found categories:", uniqueCategories);
        res.status(200).json({ categories: uniqueCategories });
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        res.status(500).json({ message: "Error fetching categories" });
    }
};

const getWorkoutChartData = async (req, res) => {
    try {
        const { userId } = req.params;

        // ✅ Workouts fetch karo userId ke mutabiq
        const workouts = await Workout.find({ user: userId })
            .select("date exercises")
            .lean();

        console.log("🔥 Raw Workout Data from DB:", workouts);

        if (!workouts.length) {
            return res.status(404).json({ message: "No workouts found!" });
        }

        // ✅ Chart data format
        const chartData = workouts.flatMap(workout =>
            workout.exercises.map(exercise => ({
                date: workout.date ? workout.date.toISOString().split('T')[0] : "Unknown",
                exercise: exercise.name || "Unnamed",
                sets: exercise.sets || 0  // ✅ Sets ki value rakhna
            }))
        );

        console.log("📊 Processed Workout Chart Data:", chartData);

        res.status(200).json({ chartData });
    } catch (error) {
        console.error("❌ Error fetching workout chart data:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};





module.exports = {
    conworkout,
    getAllWorkouts,
    getUserWorkouts,
    updateWorkout,
    deleteWorkout,
    getUserWorkoutsByCategory,
    getWorkoutChartData,
    getUserWorkoutCategories,
    getWorkoutCategories

};
