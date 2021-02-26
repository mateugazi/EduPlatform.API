import {model, Schema, Model, Document} from 'mongoose';

//dane tylko na użytek działania modelu zanim powstaną inne API

// interface IUser extends Document{
//     name: string,
// }

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});

export const User = model('User', userSchema);

// interface IProject {
//     name: string, 
//     deadline: number,
// }

const projectSchema = new Schema( {
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

export const Project = model('Project', projectSchema)

//schematy dla tasku

// interface ITask extends Document{
//     name: string,
//     description: string,
//     deadline: number,
//     done: boolean,
//     user?: Schema<IUser>,
//     project?: Schema<IProject>
// }

export const taskSchema = new Schema( {
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
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
    // user: {
    //     type: userSchema,
    // },
    // project: {
    //     type: projectSchema,
    // }
});

export const Task = model('Task', taskSchema);

