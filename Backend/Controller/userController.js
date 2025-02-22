const user = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;


    

// const registerUser = async (req, res) => {

    
    // 2nd 

    // const {name, email, password, profilePicture } = req.body;
    // try {
    //     const existinguser = await user.findOne({email : email})
    //     if(existinguser){
    //         return res.status(400).json({message : "Something Went Wrong"})
    //     }

    //     const hashedpassword = await bcrypt.hash(password, 10);

    //     const result = await user.create({
    //         name,
    //         email,    
    //         password : hashedpassword,
    //         profilePicture
    //     });

    //     const token = jwt.sign({email : result.email, id : result.id}, secret_key, {expiresIn: "1h"})
    //     res.status(201).json({user : result , token : token})

    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({message: "Something Went Wrong"})
    // }

    // 1st 

    // const { name, email, password, profilePicture } = req.body;
    // try {

    // const userExists = await User.findOne({ email });
    // if (userExists) return res.status(400).json({ message: 'User already exists' });

    // const hashedPassword = await bcrypt.hash(password, 10);

    // const result = await User.create({ 
    //     name : name, 
    //     email : email, 
    //     password: hashedPassword,
    //     profilePicture : profilePicture
    // });

    // const token = jwt.sign({email : result.email, id : result._id },secret_key)
    // res.status(201).json({user : result , token : token });
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({message : "Something Went Wrong"})
    // }
};

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user || !(await user.comparePassword(password))) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token, user });
// };

// module.exports = { registerUser, loginUser };

module.exports = { registerUser };
