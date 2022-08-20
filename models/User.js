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
        required: true,
        min: 6,
        max: 50,
    },
    mobile: {
        type: Number,
        required: true,
        min: 8,
        max: 16,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 50,
    }
}, {timestamps: true})



