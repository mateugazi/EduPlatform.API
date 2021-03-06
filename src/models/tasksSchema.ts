import {model, Schema, Document, Types} from 'mongoose';
import {projectSchema} from './projectSchema';

export interface ITask extends Document{
    _id: string,
    name: string,
    description: string,
    deadline: number,
    done: boolean,
    project?: Schema
}

export const taskSchema = new Schema<ITask>( {
    _id: {
        type: String,
    },
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
    project: {
        type: projectSchema
    }
});

export const Task = model('Task', taskSchema);

