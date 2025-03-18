
const express = require("express");
const { addSteps, getStepsByUser } = require("../Controller/stepController");

const router = express.Router();

// ✅ Add steps
router.post("/steps", addSteps);

// ✅ Get steps by user
router.get("/steps/:userId", getStepsByUser);

module.exports = router;
