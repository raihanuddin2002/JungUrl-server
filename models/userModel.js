const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();


const userSchema = Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50
    },
    lastName: {
        type: String,
        require: true,
        minlength: 1,
        maxlength: 50
    },
    country: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        minlength: 8,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        maxlength: 1024
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

userSchema.methods.generateJwt = function () {
    const token = jwt.sign({ id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET_KEY);
    return token;
}
module.exports.User = model("users", userSchema);