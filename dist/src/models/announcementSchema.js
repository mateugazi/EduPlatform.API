"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.announcementSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const mongoose_2 = tslib_1.__importDefault(require("mongoose"));
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
exports.default = mongoose_2.default.model('announcementSchema', exports.announcementSchema);
//# sourceMappingURL=announcementSchema.js.map