import mongoose from 'mongoose'

const groupSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: true
    },
    groupName: {
        type: String,
        required: true,
        unique: true
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userSchema'
        }
    }]
})

export default mongoose.model('groupSchema', groupSchema)