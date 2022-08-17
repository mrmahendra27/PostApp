const mongoose = require('mongoose')
const { Schema } = mongoose
 
const postSchema = new Schema({
    title : {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
    sub_title: {
        type: String,
        required: false,
        min: 6,
        max: 100
    },
    author: {
        type: String,
        required: false,
        min: 3,
        max: 50
    },
    summary: {
        type: String,
        required: true,
        min: 10,
        max: 200
    },
    description: {
        type: String,
        required: true,
        min: 10,
        max: 1000
    },
    image: {
        type: String,
        required: false
    }
}, {timestamps: true})

const Post =  mongoose.model("Post", postSchema)
module.exports = Post