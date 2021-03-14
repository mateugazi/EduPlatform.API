import { Request, Response } from 'express';
import {Types} from 'mongoose';
import {Task} from '../models/tasksSchema';
// import Project from '../models/projectSchema';
// import User from '../models/authorizationSchema';

export const AllTasks =  async (req:Request, res:Response) => {
    const tasksList = await Task.find();
    res.send(tasksList)
}

export const TaskById = async (req:Request, res:Response) => {

    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Id is invalid')
    }
    const task = await Task.findById(req.params.id);

    if (!task) {
        return res.status(404).send('Task not found')
    } 
    res.send(task) 
}

export const TasksByProject = async (req:Request, res:Response) => {

    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Project Id is not valid');
    } 

    const tasksByProject = await Task.find({"project._id": req.params.id});

    if (tasksByProject.length > 0) {
        return res.send(tasksByProject)
    } 
    
    res.status(404).send('Tasks not found or incorrect id for project')
    
}

export const TasksByUser = async (req:Request, res:Response) => {

    if(!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('User Id is not valid');
    }

    const tasksByUser = await Task.find({"user._id": req.params.id});

    if (tasksByUser.length > 0) {
        return res.send(tasksByUser)
    } 
    res.status(404).send('Tasks not found or incorrect if for user')
}

export const TasksByUserAndProject = async (req: Request, res: Response) => {
    if (!Types.ObjectId.isValid(req.params.projectId)) {
        return res.status(400).send('Project Id is not valid');
    } 
    if (!Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).send('User Id is not valid');
    }

    const tasksByUserAndProject = await Task.find({"user._id": req.params.id, "project._id": req.params.id});

    if (tasksByUserAndProject.length > 0) {
        return res.send(tasksByUserAndProject)
    }
    res.status(404).send('Tasks not found')
}

export const AddTask = async (req:Request, res:Response) => {
  
    try {
        let task = new Task({
            _id: new Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            deadline: req.body.deadline,
            done: false,
        })

        task = await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
  

}

export const UpdateTask = async (req:Request,res:Response) => {

    if(!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Id is not valid')
    }

    let taskData =  {
            _id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            deadline: req.body.deadline,
            done: req.body.done,
    } 

    const task = await Task.findByIdAndUpdate(req.params.id, 
        taskData,
        {new: true});
    
    if(!task) {
        return res.status(404).send('No task to update')
    }
    res.send(task)
}

export const DeleteTask = async (req: Request, res: Response) => {

    if(!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Id is not valid');
    } 

    const task = await Task.findByIdAndRemove(req.params.id)

    if (!task) {
        return res.status(404).send('No data to delete')
    }

    res.send(task)
}

