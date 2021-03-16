import mongoose from 'mongoose'
import { model, Document } from "mongoose";

export interface IUser extends Document{
    
    _id: mongoose.Schema.Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    login: string,
    role:string
}


const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    login:{
        type: String,
        required:true,
    },
    role: {
        type: String,
        required: true
    }
})

export const User = model('User', userSchema);
