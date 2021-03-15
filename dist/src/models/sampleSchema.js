"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const sampleSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
});
exports.default = mongoose_1.default.model('sampleSchema', sampleSchema);
//# sourceMappingURL=sampleSchema.js.map