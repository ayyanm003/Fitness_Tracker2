const express = require("express");
const { addnutrition } = require("../Controller/NutritionController");

const nrouter = express.Router();

nrouter.post("/nutrition", addnutrition)

// nrouter.get("/nutrition", (req, res)=>{
//     res.send("Nutrition");
// })

// nrouter.post("/nutrition", (req, res)=>{
//     res.send("Nutrition")
// })

module.exports = nrouter;