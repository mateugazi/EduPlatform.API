import { Request, Response } from 'express';
import mongoose from 'mongoose';
import groupSchema from '../models/groupSchema';
import userSchema from '../models/userSchema';

export const groupContoller = async (req: Request, res: Response) => {
  const userMentor = await userSchema.findOne({email: req.body.email})
  if (!userMentor) {
    return res.status(404).json({
      message: "Mentor not found"
    })
  }
  else {
    const group = new groupSchema({
      _id: mongoose.Types.ObjectId(),
      groupName: req.body.groupName,
      mentor: req.body.mentor,
    })
    res.status(201).json({
      message: 'Group created',
      /*createdGroup: {
        _id: group._id,
        groupName: group.groupName,

        mentor: group.mentor,
      }*/
    })
  }
};
