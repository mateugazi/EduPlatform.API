import { Request, Response } from 'express';
import mongoose, { Types } from 'mongoose';
import Announcement from '../models/announcementSchema';

export const getAllAnnouncements =  async (req:Request, res:Response) => {
      // #swagger.tags = ['Announcements']

  res.send(await Announcement.find())
}

export const getAnnouncementById =  async (req:Request, res:Response) => {
        // #swagger.tags = ['Announcements']

  let announcement = await Announcement.findById(req.params.id)
  !announcement ? res.status(404).send('Announcement with given Id does not exist') : res.send(announcement)
}

export const saveAnnouncement =  async (req:Request, res:Response) => {
        // #swagger.tags = ['Announcements']

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

    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body, {new: true});
    !announcement ? res.status(404).send('There is no announcement with given id') : res.status(204).send(announcement)
}

export const deleteAnnouncement =  async (req:Request, res:Response) => {
        // #swagger.tags = ['Announcements']

  if(!Types.ObjectId.isValid(req.params.id))
  {
    return res.status(400).send('Given id is not valid')
  }

  const announcement = await Announcement.findByIdAndRemove(req.params.id)
  !announcement ? res.status(404).send('There is no announcement with given id') : res.status(204).send(announcement)
}

