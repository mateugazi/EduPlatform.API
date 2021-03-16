import {Request, Response} from "express";
import {User, IUser} from "../models/userSchema";
import mongoose from "mongoose";
import {MongoError, Collection} from "MongoDB";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const checkLoginForm = (object: any): Object => {
    if(!object.login) return { error: "There is not login passed" };
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if(reg.test(object.login)) return { email: object.login };
    return { login: object.login };
}

export const isValidPassword = (db_password: any, password: any): boolean => {
    return bcrypt.compareSync(password, db_password);
}

// Sprawdzanie dostepnych uzytkownikow w bazie
export const ShowAll = (request: Request, response: Response): void => {
    // #swagger.tags = ['Authorization']
    mongoose.connection.db.collection("userschemas", function(err: MongoError, collection: Collection){
        if(err) {
            response.status(400).send(err);
        } else {
        collection.find({}).toArray(function(err: MongoError, data: any[]){
            response.status(200).send(data);
        })
        }
    });
}

export const LogIn = (request: Request, response: Response) => { 
    // #swagger.tags = ['Authorization']
    mongoose.connection.db.collection("userschemas", function (err: MongoError, collection: Collection) {
        if(err) {
            response.status(400).send(err);
        } else {
            collection.findOne(checkLoginForm(request.query), function (err: MongoError, data: IUser) {    
                if(!data || !isValidPassword(data.password, request.query.password)) { 
                    return response.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
                } else {
                    return response.json({ token: jwt.sign({ 
                        _id: data._id,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        password: data.password,
                        login: data.login,
                        role: data.role
                    }, 'Authentication', { expiresIn: '1h' }) });
                }
            })
        }
    })
}

export const Register = (request: Request, response: Response): void => {
              // #swagger.tags = ['Authorization']

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: request.query.firstName,
        lastName: request.query.lastName,
        email: request.query.email,
        password: bcrypt.hashSync(request.query.password, 10),
        login: request.query.login,
        role: request.query.role
    });

    user.save()
        .then((item:any) => {
            response.send("Item saved to DB");
        })
        .catch((err:any) => {
            response.status(400).send(`Unable to save item ${err}`);
        });
}