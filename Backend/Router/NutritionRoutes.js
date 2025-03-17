const express = require("express");
const router = express.Router();
const Nutrition = require("../Model/Nutrition");

router.get("/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        console.log("Fetching nutrition data for User ID:", userId);

        const nutritionData = await Nutrition.find({ user: userId });

        if (!nutritionData || nutritionData.length === 0) {
            console.log("No nutrition data found for user:", userId);
            return res.status(404).json({ message: "No nutrition data found for this user" });
        }

        res.json(nutritionData);
    } catch (error) {
        console.error("Error fetching nutrition data:", error);
        res.status(500).json({ message: "Error fetching nutrition data", error });
    }
});



router.post("/", async (req, res) => {
    const { userId, meals } = req.body;

    // ✅ Input validation
    if (!userId || !Array.isArray(meals) || meals.length === 0) {
        return res.status(400).json({ message: "User ID and at least one meal are required" });
    }

    try {
        const result = await Nutrition.create({
            user: userId,
            meals
        });

        res.status(201).json({ message: "Nutrition data added successfully!", result });
    } catch (error) {
        console.error("Error adding nutrition data:", error);
        res.status(500).json({ message: "Something went wrong!", error });
    }
});

// Fetch all nutrition data
router.get("/", async (req, res) => {
    try {
        const nutritionData = await Nutrition.find();
        res.json(nutritionData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching nutrition data", error });
    }
});



// Delete a single meal inside a nutrition record
router.delete("/:nutritionId/meal/:mealId", async (req, res) => {
    try {
        const { nutritionId, mealId } = req.params;
        const nutrition = await Nutrition.findById(nutritionId);

        if (!nutrition) {
            return res.status(404).json({ message: "Nutrition record not found" });
        }

        nutrition.meals = nutrition.meals.filter(meal => meal._id.toString() !== mealId);
        await nutrition.save();

        res.json({ message: "Meal deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting meal", error });
    }
});

// Update a meal inside a nutrition record
router.put("/:nutritionId/meal/:mealId", async (req, res) => {
    try {
        const { nutritionId, mealId } = req.params;
        const { name, calories, protein, carbs, fats } = req.body;

        const nutrition = await Nutrition.findById(nutritionId);
        if (!nutrition) {
            return res.status(404).json({ message: "Nutrition record not found" });
        }

        const mealIndex = nutrition.meals.findIndex(meal => meal._id.toString() === mealId);
        if (mealIndex === -1) {
            return res.status(404).json({ message: "Meal not found" });
        }

        // Update meal fields
        nutrition.meals[mealIndex] = { ...nutrition.meals[mealIndex], name, calories, protein, carbs, fats };
        await nutrition.save();

        res.json({ message: "Meal updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error updating meal", error });
    }
});

module.exports = router;
