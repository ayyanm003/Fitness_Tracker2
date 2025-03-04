const Contact = require("../Model/Contect");


// New Message Submit
exports.createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newMessage = new Contact({
      name,
      email,
      message,
    });

    await newMessage.save();
    res.status(201).json({ success: true, message: "Message saved successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get All Messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Single Message by ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Contact.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete Message
exports.deleteMessage = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Message deleted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



