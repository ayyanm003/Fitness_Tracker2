const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    categoryName: { type: String, required: true },  // Workout Category Name
    exercises: [
        {
            name: { type: String, required: true },
            sets: { type: Number, required: true },
            reps: { type: Number, required: true },
            weight: { type: Number, required: true }
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Workout", workoutSchema);
