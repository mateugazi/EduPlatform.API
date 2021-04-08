import mongoose from 'mongoose'

export interface IUser extends Document{
    _id: mongoose.Schema.Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    login: string,
    password: string,
    role:string
}

export const userSchema = new mongoose.Schema({
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

export const User = mongoose.model('userSchema', userSchema);
