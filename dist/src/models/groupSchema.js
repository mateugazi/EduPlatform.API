"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const groupSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    mentor: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'userSchema',
        required: true
    },
    groupName: {
        type: String,
        required: true,
        unique: true
    },
    members: [{
            user: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'userSchema'
            }
        }]
});
exports.default = mongoose_1.default.model('groupSchema', groupSchema);
//# sourceMappingURL=groupSchema.js.map