const express = require('express');
const { registerUser, signup } = require('../Controller/userController');
// const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/signup', signup);
// router.post("/registeruser", (req, res)=>[
//     res.send("Register")
// ])
// router.post('/login', loginUser);

module.exports = router;
