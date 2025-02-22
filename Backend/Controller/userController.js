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
        });

        const token = jwt.sign({email : result.email, id : result.id}, secretKey, {expiresIn: "1h"})
        res.status(201).json({user : result , token : token})

    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something Went Wrong"})
    }
};



module.exports = { registerUser };
