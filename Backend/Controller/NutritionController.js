const Nutrition = require("../Model/Nutrition");

// ✅ Nutrition data create karna
const addNutrition = async (req, res) => {
    const { userId, meals } = req.body;

    try {
        const result = await Nutrition.create({
            user: userId,
            meals
        });

        res.status(201).json({ message: "Nutrition data added successfully!", result });
    } catch (error) {
        console.error("Error adding nutrition data:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ Sabhi nutrition records fetch karna
const getAllNutrition = async (req, res) => {
    try {
        const nutritionData = await Nutrition.find().populate("user");
        res.status(200).json(nutritionData);
    } catch (error) {
        console.error("Error fetching nutrition data:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ Specific user ka nutrition data fetch karna
const getUserNutrition = async (req, res) => {
    const { userId } = req.params;

    try {
        const userNutrition = await Nutrition.find({ user: userId }).populate("user");
        res.status(200).json(userNutrition);
    } catch (error) {
        console.error("Error fetching user nutrition data:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ Nutrition update karna
const updateNutrition = async (req, res) => {
    const { id } = req.params;
    const { meals } = req.body;

    try {
        const updatedNutrition = await Nutrition.findByIdAndUpdate(
            id,
            { meals },
            { new: true }
        );

        if (!updatedNutrition) {
            return res.status(404).json({ message: "Nutrition record not found!" });
        }

        res.status(200).json({ message: "Nutrition updated successfully!", updatedNutrition });
    } catch (error) {
        console.error("Error updating nutrition data:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ Nutrition delete karna
const deleteNutrition = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNutrition = await Nutrition.findByIdAndDelete(id);

        if (!deletedNutrition) {
            return res.status(404).json({ message: "Nutrition record not found!" });
        }

        res.status(200).json({ message: "Nutrition deleted successfully!" });
    } catch (error) {
        console.error("Error deleting nutrition data:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

module.exports = {
    addNutrition,
    getAllNutrition,
    getUserNutrition,
    updateNutrition,
    deleteNutrition
};
