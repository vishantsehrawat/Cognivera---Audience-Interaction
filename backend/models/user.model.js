const mongoose = require('mongoose');
// package so the we can use email schema type also install this package
require('mongoose-type-email');

// timestamps for creation and updatin date 
const userSchema = mongoose.Schema({
    name: { type: String, required: true, lowercase: true, unique: true },
    email: { type: mongoose.SchemaTypes.Email, required: true, lowercase: true },
    password: { type: String, min: 1, required: true },
    profilePic: {
        type: String,
        default:
            "https://img.freepik.com/free-vector/man-working-laptop-with-coffee-stationary-cartoon-vector-illustration_138676-2206.jpg",
    },
    plan:{ type: String, enum: ['Basic', 'Engage', "Professional", "Enterprise"], default: 'Basic' },
}, { versionKey: false, timestamps: true });




const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
