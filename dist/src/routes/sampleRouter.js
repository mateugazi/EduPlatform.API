"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const sampleController_1 = require("../controllers/sampleController");
const sampleRouter = express_1.default.Router();
sampleRouter.post('/sampleRoute', sampleController_1.sampleController);
exports.default = sampleRouter;
//# sourceMappingURL=sampleRouter.js.map