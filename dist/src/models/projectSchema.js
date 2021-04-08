"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectSchema = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
exports.projectSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    group: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'groupSchema',
        required: true
    },
    linkToDemo: {
        type: String
    },
    linkToGitHub: {
        type: String,
        required: true
    },
    timestamp: {
        type: Number,
    }
});
exports.default = mongoose_1.default.model('projectSchema', exports.projectSchema);
//# sourceMappingURL=projectSchema.js.map