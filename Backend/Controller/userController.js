// // require("dotenv").config();

// // const user = require('../Model/User');
// // const bcrypt = require('bcrypt');
// // const jwt = require('jsonwebtoken');

// // const secretKey = "hhh";

// // const registerUser = async (req, res) => {
// // // console.log(secretKey)
    
// //     try {
      
// //         const {name, email, password, profilePicture } = req.body;
// //         const existinguser = await user.findOne({email : email})
// //         if(existinguser){
// //             return res.status(400).json({message : "user alraedy exist"})
// //         }

// //         const hashedpassword = await bcrypt.hash(password, 10);

// //         const result = await user.create({
// //             name: name,
// //             email : email,    
// //             password : hashedpassword,
// //             profilePicture

// //             // name: "name",
// //             // email : "email",    
// //             // password : "hashedpassword",
// //             // profilePicture: "fff"

// //         });

// //         const token = jwt.sign({email : result.email, id : result.id}, secretKey, {expiresIn: "1h"})
// //         res.status(201).json({user : result , token : token})

        

// //     } catch (error) {
// //         console.log(error)
// //         res.status(500).json({message: "Something Went Wrong"})
// //     }
// // };

// // const signin = async (req, res) => {
// //     const { email, password } = req.body;
// //     try {
// //         // Check if user exists
// //         const existingUser = await user.findOne({ email });
// //         if (!existingUser) {
// //             return res.status(404).json({ message: "User not found" });
// //         }

// //         // Compare passwords
// //         const matchPassword = await bcrypt.compare(password, existingUser.password);
// //         if (!matchPassword) {
// //             return res.status(400).json({ message: "Incorrect password" });
// //         }

// //         // Generate token
// //         const token = jwt.sign(
// //             { email: existingUser.email, id: existingUser._id },
// //             secretKey,
// //             { expiresIn: "1h" } // Token expire time
// //         );

// //         // Return response
// //         res.status(200).json({ result: existingUser, token });

// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({ message: "Something went wrong" });
// //     }
// // };

// // module.exports = { registerUser, signin };




// require("dotenv").config();

// const User = require('../Model/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const secretKey = "hhh"; // ⚠️ Environment variable me rakhna behtar hai

// ✅ Register User
const registerUser = async (req, res) => {
    try {
        const { name, email, password, 
            profilePicture 
        } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            profilePicture
        });

        // Generate token
        const token = jwt.sign({ email: newUser.email, id: newUser._id }, secretKey, { expiresIn: "1h" });

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// // ✅ User Login
// const signin = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const existingUser = await User.findOne({ email });
//         if (!existingUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const matchPassword = await bcrypt.compare(password, existingUser.password);
//         if (!matchPassword) {
//             return res.status(400).json({ message: "Incorrect password" });
//         }

//         const token = jwt.sign(
//             { email: existingUser.email, id: existingUser._id },
//             secretKey,
//             { expiresIn: "1h" }
//         );

//         res.status(200).json({ result: existingUser, token });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// // ✅ Get All Users
// const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find({}, "-password"); // Password hide kar diya
//         res.status(200).json(users);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching users" });
//     }
// };

// // ✅ Get Single User by ID
// const getUserById = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id, "-password");
//         if (!user) return res.status(404).json({ message: "User not found" });
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching user" });
//     }
// };

// // ✅ Update User
// const updateUser = async (req, res) => {
//     try {
//         const { name, email, profilePicture } = req.body;
//         const updatedUser = await User.findByIdAndUpdate(
//             req.params.id,
//             { name, email, profilePicture },
//             { new: true, runValidators: true }
//         );
//         if (!updatedUser) return res.status(404).json({ message: "User not found" });
//         res.status(200).json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: "Error updating user" });
//     }
// };

// // ✅ Delete User
// const deleteUser = async (req, res) => {
//     try {
//         const deletedUser = await User.findByIdAndDelete(req.params.id);
//         if (!deletedUser) return res.status(404).json({ message: "User not found" });
//         res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Error deleting user" });
//     }
// };

// module.exports = { registerUser, signin, getAllUsers, getUserById, updateUser, deleteUser };


require("dotenv").config();
const User = require('../Model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET || "hhh"; // ⚠️ Secret Key .env file me rakhni chahiye

// ✅ Register User
// const registerUser = async (req, res) => {
//     try {
//         const { name, email, password, profilePicture, height, weight, gender, bmiindex } = req.body;

//         // Check if user exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: "User already exists" });
//         }

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create new user
//         const newUser = await User.create({
//             name,
//             email,
//             password: hashedPassword,
//             profilePicture,
//             height,
//             weight,
//             gender,
//             bmiindex
//         });

//         // Generate token
//         const token = jwt.sign({ email: newUser.email, id: newUser._id }, secretKey, { expiresIn: "1h" });

//         res.status(201).json({ user: newUser, token });
//     } catch (error) {
//         console.error("Error in Register:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// ✅ User Login
const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            secretKey,
            { expiresIn: "1h" }
        );

        res.status(200).json({ result: existingUser, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

// // ✅ User Login
// const signin = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const existingUser = await User.findOne({ email });
//         if (!existingUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const matchPassword = await bcrypt.compare(password, existingUser.password);
//         if (!matchPassword) {
//             return res.status(400).json({ message: "Incorrect password" });
//         }

//         const token = jwt.sign(
//             { email: existingUser.email, id: existingUser._id },
//             secretKey,
//             { expiresIn: "1h" }
//         );

//         res.status(200).json({ user: existingUser, token });
//     } catch (error) {
//         console.error("Error in Signin:", error);
//         res.status(500).json({ message: "Something went wrong" });
//     }
// };

// ✅ Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Password hide kar diya
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Error fetching users" });
    }
};

// ✅ Get Single User by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Error fetching user" });
    }
};

// ✅ Update User
const updateUser = async (req, res) => {
    try {
        const { name, email, profilePicture, height, weight, gender, bmiindex } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, profilePicture, height, weight, gender, bmiindex },
            { new: true, runValidators: true }
        );
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user" });
    }
};

// ✅ Delete User
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Error deleting user" });
    }
};

module.exports = { registerUser, signin, getAllUsers, getUserById, updateUser, deleteUser };
