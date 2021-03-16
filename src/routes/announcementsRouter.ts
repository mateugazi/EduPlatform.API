import express from 'express';
const announcementsController = require('../controllers/announcementsController');

const announcementRouter = express.Router();

announcementRouter.get('/', announcementsController.getAllAnnouncements)

announcementRouter.get('/:id', announcementsController.getAnnouncementById)

announcementRouter.post('/', announcementsController.saveAnnouncement)

announcementRouter.patch('/:id', announcementsController.updateAnnouncement)

announcementRouter.delete('/:id', announcementsController.deleteAnnouncement)

export default announcementRouter;
