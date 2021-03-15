"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleController = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const sampleSchema_1 = tslib_1.__importDefault(require("../models/sampleSchema"));
const sampleController = (req, res) => {
    const sampleObject = new sampleSchema_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: req.body.name,
        value: req.body.value,
    });
    sampleObject
        .save()
        .then(() => {
        res.status(201).json({
            message: 'Handling POST requests to /sampleRoute',
        });
    })
        .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};
exports.sampleController = sampleController;
//# sourceMappingURL=sampleController.js.map