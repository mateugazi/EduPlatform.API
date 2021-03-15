import express from 'express';
import { deleteAnnouncement, getAllAnnouncements, getAnnouncementById, saveAnnouncement, updateAnnouncement,  } from '../controllers/announcementsController';

const announcementRouter = express.Router();

announcementRouter.get('/', getAllAnnouncements)

announcementRouter.get('/:id', getAnnouncementById)

announcementRouter.post('/', saveAnnouncement)

announcementRouter.patch('/:id', updateAnnouncement)

announcementRouter.delete('/:id', deleteAnnouncement)

export default announcementRouter;
