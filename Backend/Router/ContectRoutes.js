const express = require("express");
const { createMessage, getMessages, getMessageById, deleteMessage } = require("../Controller/ContectController");
const conrouter = express.Router();

conrouter.post("/contact", createMessage);
conrouter.get("/contacts", getMessages);
conrouter.get("/contact/:id", getMessageById);
conrouter.delete("/contact/:id", deleteMessage);

module.exports = conrouter;
