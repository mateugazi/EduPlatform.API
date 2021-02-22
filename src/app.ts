require('dotenv').config()
import express, { Request, Response, NextFunction, Router, Express } from 'express';
import mongoose from 'mongoose'

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@eduplatform.woboc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("mongodb connected")).catch(err => console.log(err))


export default app;
