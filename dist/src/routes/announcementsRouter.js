"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const announcementsController_1 = require("../controllers/announcementsController");
const announcementRouter = express_1.default.Router();
announcementRouter.get('/', announcementsController_1.getAllAnnouncements);
announcementRouter.get('/:id', announcementsController_1.getAnnouncementById);
announcementRouter.post('/', announcementsController_1.saveAnnouncement);
announcementRouter.patch('/:id', announcementsController_1.updateAnnouncement);
announcementRouter.delete('/:id', announcementsController_1.deleteAnnouncement);
exports.default = announcementRouter;
//# sourceMappingURL=announcementsRouter.js.map