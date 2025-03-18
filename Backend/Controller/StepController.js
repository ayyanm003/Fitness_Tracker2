const Step = require("../Model/Steps");

// ✅ Add new step count (Date-wise)
exports.addSteps = async (req, res) => {
    const { userId, steps, walkType } = req.body;

    if (!userId || !steps || !walkType) {
        return res.status(400).json({ message: "User ID, steps, and walk type are required" });
    }

    try {
        const stepRecord = new Step({ userId, steps, walkType });
        await stepRecord.save();

        res.status(201).json({ message: "Steps recorded successfully", stepRecord });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// ✅ Get all steps for a user (Filter by date)
exports.getStepsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const steps = await Step.find({ userId }).sort({ date: -1 });
        res.status(200).json(steps);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
