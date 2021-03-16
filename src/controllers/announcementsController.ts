import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import Announcement from '../models/announcementSchema';

export const getAllAnnouncements =  async (req:Request, res:Response) => {
  // #swagger.tags = ['Announcements']
  // #swagger.description = 'Endpoint to get all announcements.'
    /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/allAnnouncements"} 
    }
    */

  res.send(await Announcement.find())
}

export const getAnnouncementById =  async (req:Request, res:Response) => {
  // #swagger.tags = ['Announcements']
  // #swagger.description = 'Endpoint to get an announcement by Id.'
    /* #swagger.parameters['id'] = {
      in: 'path',
    description: 'Id of the announcement'
  }
  */
 /* #swagger.responses[200] = {
      schema: { $ref: "#/definitions/announcementWithId"} 
    }
    */
  /* #swagger.responses[404] = {
        schema: { 
          message: 'Announcement with given Id does not exist'
        } 
      }
    */
  let announcement = await Announcement.findById(req.params.id)
  !announcement ? res.status(404).send('Announcement with given Id does not exist') : res.send(announcement)
}

export const saveAnnouncement =  async (req:Request, res:Response) => {
  // #swagger.tags = ['Announcements']
  // #swagger.description = 'Endpoint to create an announcement.'
  /* #swagger.parameters['newAnnouncement'] = {
    in: 'body',
    description: 'Create a new announcement',
    required: true,
    type: 'object',
    schema: { $ref: "#/definitions/announcement"}
  }
  */
   /* #swagger.responses[201] = {
      schema: { $ref: "#/definitions/announcementWithId"} 
    }
    */

    let announcement = new Announcement({
      _id: new Types.ObjectId(),
      title: req.body.title,
      type: req.body.type,
      content: req.body.content
    })

  res.status(201).send(await announcement.save())
}

export const updateAnnouncement =  async (req:Request, res:Response) => {
  // #swagger.tags = ['Announcements']
  // #swagger.description = 'Endpoint to update an announcement.'
  /* #swagger.parameters['update of data'] = {
    in: 'body',
    description: 'One parameter or more can be changed',
    required: true,
    type: 'object',
    schema: { $ref: "#/definitions/updateAnnouncement"}
}
  */
  
  /* #swagger.responses[404] = {
        schema: { 
          message: 'Announcement with given Id does not exist'
        } 
      }
    */
  
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {new: true});
    !announcement ? res.status(404).send('There is no announcement with given id') : res.status(204).send(announcement)
}

export const deleteAnnouncement =  async (req:Request, res:Response) => {
      // #swagger.tags = ['Announcements']
      // #swagger.description = 'Endpoint to delete an announcement.'
  /* #swagger.parameters['id'] = {
      in: 'path',
    description: 'Id of the announcement'
  }
  */
  /* #swagger.responses[400] = {
        schema: { 
          message: 'Given id is not valid'
        } 
      }
    */
  /* #swagger.responses[404] = {
    schema: { 
          message: 'There is no announcement with given id'
        } 
      }
    */
  if(!Types.ObjectId.isValid(req.params.id))
  {
    return res.status(400).send('Given id is not valid')
  }

  const announcement = await Announcement.findByIdAndRemove(req.params.id)
  !announcement ? res.status(404).send('There is no announcement with given id') : res.status(204).send(announcement)
}

