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

export const groupGetAllGroup = (req: Request, res: Response) => {
    groupSchema.find()
    .select('_id groupName mentor members')
    .exec()
    .then(result => {
      res.status(200).json({
        numberOfGroups: result.length,
        result
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

export const groupGetSingleGroup = (req: Request, res: Response) => {
  const id = req.params.groupId
  groupSchema.findById(id)
    .select('_id groupName mentor members')
    .exec()
    .then(result => {
      if (!result) {
        return res.status(404).json({
          message: 'Group not found'
        })
      }
      res.status(200).json({
        result
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

export const groupAddMember = async (req: Request, res: Response) => {
  const groupId = req.params.groupId
  try {
    const member: any = await userSchema.findOne({email: req.body.email})
    const group: any = await groupSchema.findById(groupId)
    if (group.members.some( (obj: {_id: String}) => member._id.equals(obj._id))) {
      return res.status(404).json({
        message: "User is already in the group"
      })
    } else {
    groupSchema.updateOne({ _id: groupId }, { $push: { members: member } })
      .exec()
      .then(result => {
        res.status(200).json({
          message: 'User added',
          member
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500).json({
          error: err
        })
      })
    }
  } catch(err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
}

export const groupDeleteMember = async (req: Request, res: Response) => {
  const groupId = req.params.groupId
  try {
    const group: any = await groupSchema.findById(groupId)
    const member: any = await userSchema.findById(req.body._id)
    if (!group.members.some( (obj: {_id: String}) => member._id.equals(obj._id))) {
      return res.status(404).json({
        message: "User is not in the group"
      })
    } else {
    group.members.forEach((element: { _id: any; }) => {
      if(member._id.equals(element._id)) {
        groupSchema.updateOne({ _id: groupId }, { $pull: {members: element}})
          .exec()
          .then((result) => {
              res.status(200).json({
              message: 'User deleted',
              result
            })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({
              error: err
            })
          })
      }
    })
  }
  } catch(err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
}

export const groupChangeName = async(req: Request, res: Response) => {
  const groupId = req.params.groupId
  try {
    groupSchema.updateOne( {_id: groupId}, { $set: { groupName: req.body.newName}})
      .exec()
      .then(() => res.status(200).json({
        message: 'groupName changed'
      }))    
  } catch(err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
}