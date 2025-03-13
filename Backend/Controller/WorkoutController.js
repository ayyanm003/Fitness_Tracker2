const workout = require("../Model/Workout");

const conworkout = async (req, res) => {
    const { userId, name, sets, reps, weight } = req.body;
    try {
        const result = await workout.create({
            user: userId,  // User ka ID required hai
            exercises: [{ name, sets, reps, weight }]
        });

        // const result = await workout.create({
        //     name,
        //     sets,
        //     reps,
        //     weight
        // })
        // res.send("hello")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" })
    }

}



const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.status(200).json(workouts);
    } catch (error) {
        console.error("Error fetching workouts:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ User specific workouts fetch karna
const getUserWorkouts = async (req, res) => {
    const { userId } = req.params;

    try {
        const userWorkouts = await Workout.find({ user: userId });
        res.status(200).json(userWorkouts);
    } catch (error) {
        console.error("Error fetching user workouts:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ Workout update karna
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

// ✅ Workout delete karna
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




module.exports = {
    conworkout,
    getAllWorkouts,
    getUserWorkouts,
    updateWorkout,
    deleteWorkout
}

