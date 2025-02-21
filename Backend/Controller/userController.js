const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, profilePicture } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({ 
        name : name, 
        email : email, 
        password: hashedPassword,
        profilePicture : profilePicture
    });

    const token = jwt.sign({email : result.email, id : result._id })
    res.status(201).json({user : result , token : token }, secret_key);
    } catch (error) {
        console.log(error)
        res.status(500).json({message : "Something Went Wrong"})
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
};

module.exports = { registerUser, loginUser };