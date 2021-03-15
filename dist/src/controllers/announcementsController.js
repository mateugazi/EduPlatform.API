"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAnnouncement = exports.updateAnnouncement = exports.saveAnnouncement = exports.getAnnouncementById = exports.getAllAnnouncements = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const announcementSchema_1 = require("../models/announcementSchema");
const getAllAnnouncements = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    res.send(yield announcementSchema_1.Announcement.find());
});
exports.getAllAnnouncements = getAllAnnouncements;
const getAnnouncementById = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let announcement = yield announcementSchema_1.Announcement.findById(req.params.id);
    !announcement ? res.status(404).send('Announcement with given Id does not exist') : res.send(announcement);
});
exports.getAnnouncementById = getAnnouncementById;
const saveAnnouncement = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let announcement = new announcementSchema_1.Announcement({
        _id: new mongoose_1.Types.ObjectId(),
        title: req.body.title,
        type: req.body.type,
        content: req.body.content
    });
    res.status(201).send(yield announcement.save());
});
exports.saveAnnouncement = saveAnnouncement;
const updateAnnouncement = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const announcement = yield announcementSchema_1.Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    !announcement ? res.status(404).send('There is no announcement with given id') : res.status(204).send(announcement);
});
exports.updateAnnouncement = updateAnnouncement;
const deleteAnnouncement = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    mongoose_1.Types.ObjectId.isValid(req.params.id) ? null : res.status(400).send('Given id is not valid');
    const announcement = yield announcementSchema_1.Announcement.findByIdAndRemove(req.params.id);
    !announcement ? res.status(404).send('There is no announcement with given id') : res.status(204).send(announcement);
});
exports.deleteAnnouncement = deleteAnnouncement;
//# sourceMappingURL=announcementsController.js.map