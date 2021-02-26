import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {Task} from '../models/tasksSchema';

export const AllTasks =  async (req:Request, res:Response) => {
    const tasksList = await Task.find();
    res.send(tasksList)
}

export const TaskById = async (req:Request, res:Response) => {
    const task = await Task.findById(req.params.id);

    task ? res.send(task) : res.status(404).send('Task not found')
}

export const AddTask = async (req:Request, res:Response) => {
    let task = new Task({
            name: req.body.description,
            description: req.body.description,
            deadline: req.body.deadline,
            done: false,
        })
    
    task = await task.save();
    
    res.send(task);

}

export const UpdateTask = async (req:Request,res:Response) => {

    let taskData =  {
            description: req.body.description,
            deadline: req.body.deadline,
            done: req.body.done,
    } 

    const task = await Task.findByIdAndUpdate(req.params.id, 
        taskData,
        {new: true});

    res.send(task)
}

export const DeleteTask = async (req: Request, res: Response) => {

    const task = await Task.findByIdAndRemove(req.params.id)

    if (!task) {
        return res.status(404).send('No data to delete')
    }

    res.send(task)
}