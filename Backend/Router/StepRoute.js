
const express = require("express");
const { addSteps, getStepsByUser ,getAllUsersSteps,getAllSteps} = require("../Controller/StepController");

const router = express.Router();

// ✅ Add steps
router.post("/steps", addSteps);
router.get("/steps", getAllUsersSteps);
router.get("/", getAllSteps);

// ✅ Get steps by user
router.get("/steps/:userId", getStepsByUser);

module.exports = router;
