import express from 'express';
const projectsController = require('../controllers/projectsController');

const projectsRouter = express.Router();

projectsRouter.get('', projectsController.projects_get_all)

projectsRouter.post('', projectsController.projects_add_new_project);

export default projectsRouter;