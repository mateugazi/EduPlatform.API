import express from 'express';
import { AllTasks, TaskById, AddTask, UpdateTask, DeleteTask, TasksByProject, TasksByUser, TasksByUserAndProject} from '../controllers/tasksController';

const tasksRouter = express.Router();

tasksRouter.get('/', AllTasks)

tasksRouter.get('/:id', TaskById)

tasksRouter.get('/project/:id', TasksByProject)

tasksRouter.get('/user/:id', TasksByUser)

tasksRouter.get('/project/:projectId/user/:userId', TasksByUserAndProject)

tasksRouter.post('/', AddTask)

tasksRouter.put('/:id', UpdateTask)

tasksRouter.delete('/:id', DeleteTask)

export default tasksRouter;
