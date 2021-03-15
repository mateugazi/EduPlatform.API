"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Announcement = exports.announcementSchema = void 0;
const mongoose_1 = require("mongoose");
exports.announcementSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 60
    },
    content: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1200
    },
    type: {
        type: String,
        required: true
    }
});
exports.Announcement = mongoose_1.model('Announcement', exports.announcementSchema);
//# sourceMappingURL=announcementSchema.js.map