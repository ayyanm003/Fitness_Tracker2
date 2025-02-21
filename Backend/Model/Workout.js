const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    exercises: [
        {
            name: String,
            sets: Number,
            reps: Number,
            weight: Number
        }
    ],
    date: { type: Date, default: Date.now }
});

const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;
