"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const announcementsController = require('../controllers/announcementsController');
const announcementRouter = express_1.default.Router();
announcementRouter.get('/', announcementsController.getAllAnnouncements);
announcementRouter.get('/:id', announcementsController.getAnnouncementById);
announcementRouter.post('/', announcementsController.saveAnnouncement);
announcementRouter.patch('/:id', announcementsController.updateAnnouncement);
announcementRouter.delete('/:id', announcementsController.deleteAnnouncement);
exports.default = announcementRouter;
//# sourceMappingURL=announcementsRouter.js.map