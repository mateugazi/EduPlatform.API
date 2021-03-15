import express from 'express';
const projectsController = require('../controllers/projectsController');

const projectsRouter = express.Router();

projectsRouter.get('', projectsController.projects_get_all)

projectsRouter.get('/:projectId', projectsController.projects_get_single)

projectsRouter.post('', projectsController.projects_add_new_project);

projectsRouter.put('/:projectId', projectsController.projects_update_project)

projectsRouter.delete('/:projectId', projectsController.projects_delete_project)

export default projectsRouter;