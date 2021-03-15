"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const tasksController_1 = require("../controllers/tasksController");
const tasksRouter = express_1.default.Router();
tasksRouter.get('/', tasksController_1.AllTasks);
tasksRouter.get('/:id', tasksController_1.TaskById);
tasksRouter.get('/project/:id', tasksController_1.TasksByProject);
tasksRouter.get('/user/:id', tasksController_1.TasksByUser);
tasksRouter.get('/project/:projectId/user/:userId', tasksController_1.TasksByUserAndProject);
tasksRouter.post('/', tasksController_1.AddTask);
tasksRouter.put('/:id', tasksController_1.UpdateTask);
tasksRouter.delete('/:id', tasksController_1.DeleteTask);
exports.default = tasksRouter;
//# sourceMappingURL=tasksRouter.js.map