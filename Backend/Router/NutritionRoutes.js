const express = require("express");
const {
    addNutrition,
    getAllNutrition,
    getUserNutrition,
    updateNutrition,
    deleteNutrition
} = require("../Controller/NutritionController");

const nrouter = express.Router();

// ✅ Nutrition create (add)
nrouter.post("/nutrition", addNutrition);

// ✅ Sab nutrition records fetch karna
nrouter.get("/nutrition", getAllNutrition);

// ✅ Specific user ka nutrition fetch karna (userId se)
nrouter.get("/nutrition/:userId", getUserNutrition);

// ✅ Nutrition update karna (id se)
nrouter.put("/nutrition/:id", updateNutrition);

// ✅ Nutrition delete karna (id se)
nrouter.delete("/nutrition/:id", deleteNutrition);

module.exports = nrouter;
