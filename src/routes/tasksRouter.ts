import express from 'express';
import { AllTasks, TaskById, AddTask, UpdateTask, DeleteTask } from '../controllers/tasksController';

const tasksRouter = express.Router();

tasksRouter.get('/', AllTasks)

tasksRouter.get('/:id', TaskById)

tasksRouter.post('/', AddTask)

tasksRouter.put('/:id', UpdateTask)

tasksRouter.delete('/:id', DeleteTask)

export default tasksRouter;
