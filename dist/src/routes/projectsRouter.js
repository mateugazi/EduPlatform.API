"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const projectsController = require('../controllers/projectsController');
const projectsRouter = express_1.default.Router();
projectsRouter.get('', projectsController.projects_get_all);
projectsRouter.get('/:projectId', projectsController.projects_get_single);
projectsRouter.post('', projectsController.projects_add_new_project);
projectsRouter.put('/:projectId', projectsController.projects_update_project);
projectsRouter.delete('/:projectId', projectsController.projects_delete_project);
exports.default = projectsRouter;
//# sourceMappingURL=projectsRouter.js.map