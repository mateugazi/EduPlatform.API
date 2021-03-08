import { Request, Response } from 'express';
import mongoose from 'mongoose';
import groupSchema from '../models/groupSchema';
import userSchema from '../models/userSchema';

export const groupCreateGroup = async (req: Request, res: Response) => {
  try {
  const userMentor = await userSchema.findById(req.body.mentor)
      const groupName = await groupSchema.findOne({ groupName: req.body.groupName })
      if (groupName) {
        res.status(404).json({
          message: "This group name is already taken"
        })
      }
      else {
        const group = new groupSchema({
          _id: mongoose.Types.ObjectId(),
          groupName: req.body.groupName,
          mentor: userMentor
        })
        group.save()
          .then(result => {
            console.log(result)
            res.status(201).json({
              message: "Group created",
              createdGroup: {
                group
              }
            })
          })
        .catch(err => {
          console.log(err)
          res.status(500).json({
            error: err
          })
        }) 
      }
  } catch (err) {
    res.status(500).json({
      err
    })
  }
};
