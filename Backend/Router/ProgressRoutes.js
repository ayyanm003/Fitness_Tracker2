const express = require("express");


const Progressrouter = express.Router();

Progressrouter.post("/progressrouter", (req, res)=> {
    res.send("Progressrouter")
})

module.exports = Progressrouter;