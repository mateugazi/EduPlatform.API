"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = exports.taskSchema = void 0;
const mongoose_1 = require("mongoose");
exports.taskSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    deadline: {
        type: Number,
        required: true,
    },
    done: {
        type: Boolean,
        required: true
    },
    project: {
        type: mongoose_1.Types.ObjectId,
        ref: 'projectSchema'
    },
    user: {
        type: mongoose_1.Types.ObjectId,
        ref: 'userSchema'
    }
});
exports.Task = mongoose_1.model('Task', exports.taskSchema);
//# sourceMappingURL=tasksSchema.js.map