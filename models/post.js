const mongoose = require('mongoose')
// const marked = require('marked')
// const slugify = require('slugify')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    // },
    // slug: {
    //     type: String,
    //     required: true,
    //     unique: true
    }
})


module.exports = mongoose.model('Post', PostSchema)