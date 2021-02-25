import mongoose from 'mongoose';

//dane tylko na użytek działania modelu zanim powstaną inne API

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    deadline: {
        type: Number,
        required: true
    }
});

export const User = mongoose.model('User', userSchema);

const projectSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});

export const Project = mongoose.model('Project', projectSchema)

//schematy dla tasku

export const taskSchema = new mongoose.Schema( {
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    deadline: {
        type: Number,
        required: true,
    },
    done: {
        type: Boolean,
        required: true
    },
    user: {
        type: userSchema,
    },
    project: {
        type: projectSchema,
    }
});

export const Task = mongoose.model('Task', taskSchema);

