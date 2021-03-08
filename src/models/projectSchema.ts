import mongoose, { Types } from 'mongoose';

interface projectInterface extends mongoose.Document {
    _id: Types.ObjectId,
    title: string,
    description: string,
    mentor: string,
    authors: Array<string>,
    linkToDemo: string,
    linkToGitHub: string,
    timestamp: number
}

const projectSchema = new mongoose.Schema<projectInterface>({
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

export default mongoose.model('projectSchema', projectSchema);