import { Request, Response } from 'express';
import mongoose from 'mongoose';
import sampleSchema from '../models/sampleSchema';

export const sampleController = (req: Request, res: Response) => {
  const sampleObject = new sampleSchema({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    value: req.body.value,
  });
  sampleObject
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Handling POST requests to /sampleRoute',
      });
    })
    .catch((err: any) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
