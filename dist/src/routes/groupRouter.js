"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const groupController_1 = require("../controllers/groupController");
const groupRouter = express_1.default.Router();
groupRouter.get('/', groupController_1.groupGetAllGroup);
groupRouter.get('/:groupId', groupController_1.groupGetSingleGroup);
groupRouter.post('/createGroup', groupController_1.groupCreateGroup);
groupRouter.put('/addMember/:groupId', groupController_1.groupAddMember);
groupRouter.put('/deleteMember/:groupId', groupController_1.groupDeleteMember);
groupRouter.put('/changeName/:groupId', groupController_1.groupChangeName);
groupRouter.delete('/deleteGroup/:groupId', groupController_1.groupDeleteGroup);
exports.default = groupRouter;
//# sourceMappingURL=groupRouter.js.map