const Workout = require("../Model/Workout");
const mongoose = require("mongoose")


// ✅ Get all workouts with pagination & sorting
const getAllWorkouts = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const totalWorkouts = await Workout.countDocuments();
        const totalPages = Math.ceil(totalWorkouts / limit);

        const workouts = await Workout
            .find()
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


// ✅ Get workouts grouped by category (Pagination by category)
const getWorkoutsByCategory = async (req, res) => {
    try {
        let { page = 1, limit = 1, date } = req.query;  // Limit is 1 category per page

        page = parseInt(page);
        limit = parseInt(limit);

        // Fetch unique category names
        const categories = await Workout.distinct("categoryName");

        if (page > categories.length) {
            return res.status(404).json({ message: "No more categories available!" });
        }

        // Get category for current page
        const categoryName = categories[page - 1];

        // ✅ Query Object (Category Filter)
        const query = { categoryName };

        // ✅ Date Filter Add Karo
        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            query.createdAt = { $gte: startOfDay, $lte: endOfDay };
        }

        // Fetch workouts based on category and date filter
        const workouts = await Workout.find(query).sort({ "exercises.0.name": 1 });

        // ✅ Agar selected date pe koi workout nahi mila toh error bhejo
        if (workouts.length === 0) {
            return res.status(404).json({ message: "No workouts found for this date!" });
        }

        res.status(200).json({
            page,
            totalPages: categories.length,
            categoryName,
            workouts
        });
    } catch (error) {
        console.error("Error fetching workouts by category:", error);
        res.status(500).json({ message: "Something went wrong!" });
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

const getWorkoutChartData = async (req, res) => {
    try {
        const { userId } = req.params;

        console.log("📊 Fetching workout chart data for user:", userId);

        const workouts = await Workout.find({ user: userId }).select("date duration");

        if (!workouts || workouts.length === 0) {
            return res.status(404).json({ message: "No workout data found!", chartData: [] });
        }

        // ✅ Format data for chart
        const chartData = workouts.map(workout => ({
            date: workout.date ? workout.date.toISOString().split("T")[0] : "Unknown",
            duration: Number(workout.duration) || 0
        }));

        console.log("✅ Processed Workout Chart Data:", chartData);

        res.status(200).json({ chartData });

    } catch (error) {
        console.error("❌ Error fetching workout chart data:", error);
        res.status(500).json({ message: "Something went wrong!", error: error.message });
    }
};


module.exports = {
    conworkout,
    getAllWorkouts,
    getUserWorkouts,
    updateWorkout,
    deleteWorkout,
    getWorkoutsByCategory,
    getWorkoutChartData
};
