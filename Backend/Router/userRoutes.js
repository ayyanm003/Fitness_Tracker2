const express = require('express');
const { registerUser, signin, getAllUsers, getUserById, updateUser, deleteUser } = require('../Controller/userController');
// const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/signin', signin);

router.get('/users', getAllUsers);       // Get all users
router.get('/users/:id', getUserById);   // Get user by ID
router.put('/users/:id', updateUser);    // Update user
router.delete('/users/:id', deleteUser); 


// router.post("/registeruser", (req, res)=>[
//     res.send("Register")
// ])
// router.post('/login', loginUser);

module.exports = router;
