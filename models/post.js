const mongoose = require('mongoose')

//POST SCHEMA FOR THE USERS POSTS
const PostSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    //USER EMAIL BEING REQUIRED TO LINK POSTS TO USERS
    userEmail: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now

    }
});


module.exports = mongoose.model('Post', PostSchema)