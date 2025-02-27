require("dotenv").config();

const user = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = "hhh";

const registerUser = async (req, res) => {
// console.log(secretKey)
    
    try {
      
        const {name, email, password, profilePicture } = req.body;
        const existinguser = await user.findOne({email : email})
        if(existinguser){
            return res.status(400).json({message : "user alraedy exist"})
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const result = await user.create({
            name: name,
            email : email,    
            password : hashedpassword,
            profilePicture

            // name: "name",
            // email : "email",    
            // password : "hashedpassword",
            // profilePicture: "fff"

        });

        const token = jwt.sign({email : result.email, id : result.id}, secretKey, {expiresIn: "1h"})
        res.status(201).json({user : result , token : token})

        

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something Went Wrong"})
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if user exists
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare passwords
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate token
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            secretKey,
            { expiresIn: "1h" } // Token expire time
        );

        // Return response
        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { registerUser, signin };