
const express = require("express");
const { addSteps, getStepsByUser ,getAllUsersSteps} = require("../Controller/stepController");

const router = express.Router();

// ✅ Add steps
router.post("/steps", addSteps);
router.get("/steps", getAllUsersSteps);
// ✅ Get steps by user
router.get("/steps/:userId", getStepsByUser);

module.exports = router;
