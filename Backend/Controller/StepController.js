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
exports.getAllUsersSteps = async (req, res) => {
    try {
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        const totalSteps = await Step.countDocuments();
        const totalPages = Math.ceil(totalSteps / limit);

        const steps = await Step.find()
            .populate("userId", "name email") // Populate user details
            .sort({ date: -1 }) // Latest steps first
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            page,
            totalPages,
            totalSteps,
            steps
        });
    } catch (error) {
        console.error("Error fetching step records:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};
exports.getAllSteps = async (req, res) => {
    try {
        const totalSteps = await Step.aggregate([{ $group: { _id: null, totalSteps: { $sum: "$steps" } } }]);

        res.status(200).json({
            totalSteps: totalSteps.length > 0 ? totalSteps[0].totalSteps : 0
        });
    } catch (error) {
        console.error("Error fetching step count:", error);
        res.status(500).json({ message: "Something went wrong!" });
    }
};
