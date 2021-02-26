import {model, Schema, Model, Document} from 'mongoose';

//dane tylko na użytek działania modelu zanim powstaną inne API

interface IUser extends Document{
    name: string,
    deadline: number,
}

const userSchema:Schema = new Schema({
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

export const User:Model<IUser> = model<IUser>('User', userSchema);

interface IProject extends Document{
    name: string, 
}

const projectSchema:Schema = new Schema( {
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    }
});

export const Project: Model<IProject> = model<IProject>('Project', projectSchema)

//schematy dla tasku

interface ITask extends Document{
    name: string,
    description: string,
    deadline: number,
    done: boolean,
    user?: number,
    project?: number
}

export const taskSchema:Schema = new Schema( {
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

export const Task: Model<ITask> = model<ITask>('Task', taskSchema);

