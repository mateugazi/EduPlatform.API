import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    secondMentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
    },
    secondMentorEmail: {
        type: String,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'userSchema'
        }
    }]
})

export default mongoose.model('userSchema', userSchema)