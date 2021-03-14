import { request } from 'express';
import mongoose from 'mongoose'
import { model, Document } from "mongoose";
// import bcrypt from 'bcrypt'

export interface IUser extends Document{
    
    _id: mongoose.Schema.Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    login: string,
    role:string
}


export const userSchema = new mongoose.Schema<IUser>({
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
    login:{
        type:String,
        required:true   
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String,
        required: true
    }
})

export default mongoose.model('userSchema', userSchema)
