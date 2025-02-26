const express = require('express');
const { registerUser, signin } = require('../Controller/userController');
// const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', signin);
// router.post("/registeruser", (req, res)=>[
//     res.send("Register")
// ])
// router.post('/login', loginUser);

module.exports = router;
