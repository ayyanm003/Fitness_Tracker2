const express = require("express");
const { addProgress, getAllProgress, getUserProgress, updateProgress, deleteProgress } = require("../Controller/ProgressController");


const Progressrouter = express.Router();

// ✅ Progress Add Karna
Progressrouter.post("/progress", addProgress);

// ✅ Sabhi Progress Entries Get Karna
Progressrouter.get("/progress", getAllProgress);

// ✅ Specific User Ka Progress Get Karna
Progressrouter.get("/progress/:userId", getUserProgress);

// ✅ Progress Update Karna
Progressrouter.put("/progress/:id", updateProgress);

// ✅ Progress Delete Karna
Progressrouter.delete("/progress/:id", deleteProgress);

// Progressrouter.post("/progressrouter", (req, res)=> {
//     res.send("Progressrouter")
// })

module.exports = Progressrouter;