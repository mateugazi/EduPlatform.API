import { Request, Response } from 'express';
import mongoose from 'mongoose';
import groupSchema from '../models/groupSchema';
import { userSchema, User } from '../models/userSchema';

export const groupCreateGroup = async (req: Request, res: Response) => {
  // #swagger.tags = ['Groups']
      // #swagger.description = 'Endpoint to create group.'

  /* #swagger.parameters['newGroup'] = {
    in: 'body',
    description: 'Create a new group',
    required: true,
    type: 'object',
    schema: { $ref: "#/definitions/createGroup"}
  }
  */
  try {
  const userMentor = await User.findById(req.body.mentor)
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
          .then((result: any) => {
            console.log(result)
            res.status(201).json({
              message: "Group created"
            })
          })
        .catch((err: any) => {
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
    // #swagger.tags = ['Groups']
    // #swagger.description = 'Endpoint to get all groups.'
    /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/allGroups" } 
    }
    */
    groupSchema.find()
    .select('_id groupName mentor members')
    .exec()
    .then((result: string | any[]) => {
      res.status(200).json({
        numberOfGroups: result.length,
        result
      })
    })
    .catch((err: any) => {
      res.status(500).json({
        error: err
      })
    })
}

export const groupGetSingleGroup = (req: Request, res: Response) => {
  // #swagger.tags = ['Groups']
      // #swagger.description = 'Endpoint to get one group.'

  /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/group" } 
    }
  */
  /* #swagger.responses[404] = {
    schema: {
        message: 'Group not found'
    }
  }
  */
 /* #swagger.responses[500] = {
   schema: {
       err: {
     }
   }
 }
 */
  const id = req.params.groupId
  groupSchema.findById(id)
    .select('_id groupName mentor members')
    .exec()
    .then((result: any) => {
      if (!result) {
        return res.status(404).json({
          message: 'Group not found'
        })
      }
      res.status(200).json({
        group: result
      })
    })
    .catch((err: any) => {
      res.status(500).json({
        error: err
      })
    })
}

export const groupAddMember = async (req: Request, res: Response) => {
    // #swagger.tags = ['Groups']
          // #swagger.description = 'Endpoint to add one member to the group.'

    /* #swagger.parameters['_id'] = {
    in: 'body',
    description: 'Id of user',
    required: true,
    type: 'object',
    schema: { $ref: "#/definitions/addMember"}
  }
  */
  /* #swagger.responses[200] = {
        schema: { 
          message: 'User added'
        } 
      }
    */
    /* #swagger.responses[404] = {
      description: 'User is in the group',
      schema: {
          message: 'User is already in the group'
      }
    }
    */
  /* #swagger.responses[500] = {
    schema: {
        err: {
      }
    }
  }
  */
  const groupId = req.params.groupId
  try {
    const member: any = await User.findById(req.body._id)
    const group: any = await groupSchema.findById(groupId)
    if (group.members.some( (obj: {_id: String}) => member._id.equals(obj._id))) {
      return res.status(404).json({
        message: "User is already in the group"
      })
    } else {
    groupSchema.updateOne({ _id: groupId }, { $push: { members: member } })
      .exec()
      .then((result: any) => {
        res.status(200).json({
          message: 'User added',
          member
        })
      })
      .catch((err: any) => {
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
    // #swagger.tags = ['Groups']
              // #swagger.description = 'Endpoint to delete one member from the group.'

  /* #swagger.parameters['_id'] = {
    in: 'body',
    description: 'Id of user',
    required: true,
    type: 'object',
    schema: { $ref: "#/definitions/deleteMember"}
  }
  */
  /* #swagger.responses[200] = {
        schema: { 
          message: 'User deleted'
        } 
      }
    */
    /* #swagger.responses[404] = {
      schema: {
          message: 'User is not in the group'
      }
    }
    */
  /* #swagger.responses[500] = {
    schema: {
        err: {
      }
    }
  }
  */
  const groupId = req.params.groupId
  try {
    const group: any = await groupSchema.findById(groupId)
    const member: any = await User.findById(req.body._id)
    if (!group.members.some( (obj: {_id: String}) => member._id.equals(obj._id))) {
      return res.status(404).json({
        message: "User is not in the group"
      })
    } else {
    group.members.forEach((element: { _id: any; }) => {
      if(member._id.equals(element._id)) {
        groupSchema.updateOne({ _id: groupId }, { $pull: {members: element}})
          .exec()
          .then((result: any) => {
              res.status(200).json({
              message: 'User deleted',
              result
            })
          })
          .catch((err: any) => {
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
    // #swagger.tags = ['Groups']
                  // #swagger.description = 'Endpoint to change the name of the group.'

  /* #swagger.parameters['newName'] = {
    in: 'body',
    description: 'New name of the group.',
    required: true,
    type: 'object',
    schema: { $ref: "#/definitions/changeName"}
  }
  */
  /* #swagger.responses[200] = {
        schema: { 
          message: 'groupName changed'
        } 
      }
    */
  /* #swagger.responses[500] = {
    schema: {
        err: {
      }
    }
  }
  */
  const groupId = req.params.groupId
  try {
    groupSchema.updateOne( {_id: groupId}, { $set: { groupName: req.body.newName}})
      .exec()
      .then(() => res.status(200).json({
        message: `groupName changed`
      }))    
  } catch(err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
}

export const groupDeleteGroup = (req: Request, res: Response) => {
    // #swagger.tags = ['Groups']
                      // #swagger.description = 'Endpoint to delete the group.'

  /* #swagger.parameters['groupId'] = {
    description: 'Id of the group'
  }
  */
  /* #swagger.responses[200] = {
        schema: { 
          message: 'Group deleted'
        } 
      }
    */
  /* #swagger.responses[500] = {
    schema: {
        err: {
      }
    }
  }
  */
  const groupId = req.params.groupId
  
    groupSchema.deleteOne({ _id: groupId})
    .exec()
    .then((result: any) => res.status(200).json({
      message: 'Group deleted'
    }))
    .catch((err: any) => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
  
}