const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    name: String,
    calories: Number,
    protein: Number,
    carbs: Number,
    fats: Number,
    date: { type: Date, default: Date.now },
});

const NutritionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    meals: [mealSchema],
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Nutrition", NutritionSchema);
