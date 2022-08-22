const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        min: 6,
        max: 50,
    },
    mobile: {
        type: Number,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    },
    token: {
        type: String,
        required: true,
    }
}, {timestamps: true})

const User = mongoose.model("User",  UserSchema)
module.exports = User



