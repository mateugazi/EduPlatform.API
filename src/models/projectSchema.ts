import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authors: {
        type: Array,
        required: true
    },
    linkToDemo: {
        type: String
    },
    linkToGitHub: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
    }
})