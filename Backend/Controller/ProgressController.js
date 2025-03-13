const Progress = require("../Model/Progress");

// ✅ Progress Add Karna
const addProgress = async (req, res) => {
    const { userId, weight, bodyFatPercentage, muscleMass, chest, waist, hips, arms, legs, performanceMetrics } = req.body;

    try {
        const newProgress = await Progress.create({
            user: userId,
            weight,
            bodyFatPercentage,
            muscleMass,
            chest,
            waist,
            hips,
            arms,
            legs,
            performanceMetrics
        });

        res.status(201).json({ message: "Progress added successfully!", newProgress });
    } catch (error) {
        console.error("Error adding progress:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ Sabhi Progress Entries Get Karna
const getAllProgress = async (req, res) => {
    try {
        const progressData = await Progress.find().populate("user", "name email");
        res.status(200).json(progressData);
    } catch (error) {
        console.error("Error fetching progress data:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ Specific User Ka Progress Get Karna
const getUserProgress = async (req, res) => {
    const { userId } = req.params;

    try {
        const userProgress = await Progress.find({ user: userId }).sort({ date: -1 });

        if (!userProgress || userProgress.length === 0) {
            return res.status(404).json({ message: "No progress data found for this user!" });
        }

        res.status(200).json(userProgress);
    } catch (error) {
        console.error("Error fetching user progress:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ Progress Update Karna
const updateProgress = async (req, res) => {
    const { id } = req.params;
    const { weight, bodyFatPercentage, muscleMass, chest, waist, hips, arms, legs, performanceMetrics } = req.body;

    try {
        const updatedProgress = await Progress.findByIdAndUpdate(
            id,
            { weight, bodyFatPercentage, muscleMass, chest, waist, hips, arms, legs, performanceMetrics },
            { new: true }
        );

        if (!updatedProgress) {
            return res.status(404).json({ message: "Progress entry not found!" });
        }

        res.status(200).json({ message: "Progress updated successfully!", updatedProgress });
    } catch (error) {
        console.error("Error updating progress:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

// ✅ Progress Delete Karna
const deleteProgress = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProgress = await Progress.findByIdAndDelete(id);

        if (!deletedProgress) {
            return res.status(404).json({ message: "Progress entry not found!" });
        }

        res.status(200).json({ message: "Progress deleted successfully!" });
    } catch (error) {
        console.error("Error deleting progress:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};

module.exports = {
    addProgress,
    getAllProgress,
    getUserProgress,
    updateProgress,
    deleteProgress
};
