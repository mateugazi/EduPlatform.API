import { Request, Response } from 'express';
import {Types} from 'mongoose';
import {Task} from '../models/tasksSchema';
import Project from '../models/projectSchema';

export const AllTasks =  async (req:Request, res:Response) => {
    const tasksList = await Task.find();
    res.send(tasksList)
}

export const TaskById = async (req:Request, res:Response) => {

    Types.ObjectId.isValid(req.params.id) ? null : res.status(400).send('Id is not valid')
    const task = await Task.findById(req.params.id);

    task ? res.send(task._id) : res.status(404).send('Task not found')
}

export const TasksByProject = async (req:Request, res:Response) => {
    Types.ObjectId.isValid(req.params.id) ? null : res.status(400).send('Project Id is not valid');

    const tasksByProject = await Task.find({"project._id": req.params.id});

    tasksByProject.length > 0 ? res.send(tasksByProject) : res.status(404).send('Tasks not found')
}

export const TasksByUser = async (req:Request, res:Response) => {
    Types.ObjectId.isValid(req.params.id) ? null : res.status(400).send('User Id is not valid');

    const tasksByUser = await Task.find({"user._id": req.params.id});

    tasksByUser.length > 0 ? res.send(tasksByUser) : res.status(404).send('Tasks not found')
}

export const TasksByUserAndProject = async (req: Request, res: Response) => {
    Types.ObjectId.isValid(req.params.projectId) ? null : res.status(400).send('Project Id is not valid');
    Types.ObjectId.isValid(req.params.userId) ? null : res.status(400).send('User Id is not valid');

    const tasksByUserAndProject = await Task.find({"user._id": req.params.id, "project._id": req.params.id});

    tasksByUserAndProject.length > 0 ? res.send(tasksByUserAndProject) : res.status(404).send('Tasks not found')
}

export const AddTask = async (req:Request, res:Response) => {

    let task;
    if (req.body.projectId) {
        Types.ObjectId.isValid(req.body.projectId) ? null : res.status(400).send('Project Id is not valid')
        const projectData = await Project.findById(req.body.projectId);

        if (!projectData) {
            return res.status(404).send('Project not found')
        }

        task = new Task({
            _id: new Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            deadline: req.body.deadline,
            done: false,
            project: {
                _id: projectData._id,
                title: projectData.title,
                description: projectData.description,
                authors: projectData.authors,
                linkToDemo: projectData.linkToDemo,
                linkToGitHub: projectData.linkToGitHub,
                timestamp: projectData.timestamp
            }
        })
    } else {
        task = new Task({
            _id: new Types.ObjectId(),
            name: req.body.description,
            description: req.body.description,
            deadline: req.body.deadline,
            done: false,
    })
    }
 
    task = await task.save();
    
    res.send(task);

}

export const UpdateTask = async (req:Request,res:Response) => {

    Types.ObjectId.isValid(req.params.id) ? null : res.status(400).send('Id is not valid')

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

    res.send(task)
}

export const DeleteTask = async (req: Request, res: Response) => {

    Types.ObjectId.isValid(req.params.id) ? null : res.status(400).send('Id is not valid')

    const task = await Task.findByIdAndRemove(req.params.id)

    if (!task) {
        return res.status(404).send('No data to delete')
    }

    res.send(task)
}

