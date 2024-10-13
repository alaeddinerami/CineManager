const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        enum: ["public", "private", "scheduled"], 
        default: "public",
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    ratings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rating', 
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', 
    }],
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Favorite', 
    }],
}, {
    timestamps: true, 
});

module.exports = mongoose.model('Film', filmSchema);
