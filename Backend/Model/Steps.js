const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, default: Date.now },
    steps: { type: Number, required: true },
    walkType: { 
        type: String, 
        enum: ["Casual Walk", "Brisk Walk", "Running", "Hiking"], 
        required: true 
    }
});

module.exports = mongoose.model("Step", StepSchema);
