const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profilePicture: {
        type: String,
        default: 'default.png'
    },
    height: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bmiindex: {
        type: String,
        required: true
    }
}, { timestamps: true });

// UserSchema.methods.comparePassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model('User', UserSchema);
// module.exports = User;

module.exports = mongoose.model("User", UserSchema)
