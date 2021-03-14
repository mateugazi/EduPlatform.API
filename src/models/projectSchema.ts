import mongoose from 'mongoose';
// import {userInterface} from './userSchema'

export interface projectInterface extends mongoose.Document {
    _id: mongoose.Schema.Types.ObjectId,
    title: string,
    description: string,
    mentor: mongoose.Schema.Types.ObjectId,
    authors: Array<mongoose.Schema.Types.ObjectId>,
    linkToDemo: string,
    linkToGitHub: string,
    timestamp: number
}

export const projectSchema = new mongoose.Schema<projectInterface>({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: true
    },
    authors: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userSchema'
        }
    }],
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

export default mongoose.model('projectSchema', projectSchema);