import { Request, Response } from 'express';
import mongoose from 'mongoose';
import groupSchema from '../models/groupSchema';
import userSchema from '../models/userSchema';

export const groupCreateGroup = async (req: Request, res: Response) => {
  const userMentor = await userSchema.findById(req.body.mentor)
    try {
    if (!userMentor) {
      return res.status(404).json({
        message: "Mentor not found"
      })
    }
    else {
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
        console.log(group)
        res.status(201).json({
          message: "Group created",
          createdGroup: {
            group
          }
        })
      }
    }
  } catch (err) {
    res.status(500).json({
      err
    })
  }
};
