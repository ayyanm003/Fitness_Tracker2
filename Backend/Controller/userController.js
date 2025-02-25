const user = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const registerUser = async (req, res) => {

    
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

const signup = async (req, res) => {
    const {email, password} = req.body;
try {
    const exitstinguset = await user.findOne({email : email});
    if(!exitstinguset){
        return res.status(400).json({ message: "User already exists" });
    }
    const matchpassword = await bcrypt.compare(password, exitstinguset.password);
    if(!matchpassword){
        return res.status(400).json({ message: "incerrect password" });
    }
    const token = jwt.sign({email : exitstinguset.email, id : exitstinguset.id}, secretKey)
} catch (error) {
    
}
}

module.exports = { registerUser, signup };