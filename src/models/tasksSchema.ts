import {model, Schema, Document, Types} from 'mongoose';

export interface ITask extends Document{
    _id: Types.ObjectId,
    name: string,
    description: string,
    deadline: number,
    done: boolean,
    project: Types.ObjectId,
    user: Types.ObjectId
}

export const taskSchema = new Schema<ITask>( {
    _id:  Schema.Types.ObjectId,
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
    project: {
        type: Types.ObjectId,
        ref: 'projectSchema'
    },
    user: {
        type: Types.ObjectId,
        ref: 'userSchema'
    }
});

export const Task = model('Task', taskSchema);

