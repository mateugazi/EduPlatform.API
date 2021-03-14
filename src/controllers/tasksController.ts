import { Request, Response } from 'express';
import {Types} from 'mongoose';
import {Task} from '../models/tasksSchema';
import Project from '../models/projectSchema';
import User from '../models/authorizationSchema';

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
    res.send(task._id) 
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

    let task;
    if (req.body.userId && req.body.projectId) {
        if(!Types.ObjectId.isValid(req.body.userId)) {
            return res.status(400).send('User Id is invalid')
        }
        if(!Types.ObjectId.isValid(req.body.projectId)) {
            return res.status(400).send('Project Id is invalid')
        }

        const userData = await User.findById(req.body.userId);
        const projectData = await Project.findById(req.body.projectId);

        if (!userData) {
            return res.status(404).send('User not found')
        }
        if (!projectData) {
            return res.status(404).send('Project not found')
        }

        task = new Task({
            _id: new Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            deadline: req.body.deadline,
            done: false,
            user: {
                _id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                login: userData.login,
                role: userData.role,
            },
            project: {
                _id: projectData._id,
                title: projectData.title,
                description: projectData.description,
                mentor: projectData.mentor,
                authors: projectData.authors,
                linkToDemo: projectData.linkToDemo,
                linkToGitHub: projectData.linkToGitHub,
                timestamp: projectData.timestamp
            }
        })


    }
    if (req.body.userId) {
        if(!Types.ObjectId.isValid(req.body.userId)) {
            return res.status(400).send('User Id is invalid')
        }
        const userData = await User.findById(req.body.userId);

        if (!userData) {
            return res.status(404).send('User not found')
        }

        task = new Task({
            _id: new Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            deadline: req.body.deadline,
            done: false,
            user: {
                _id: userData._id,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                login: userData.login,
                role: userData.role,
            }
        })
    } else if (req.body.projectId) {
        if(!Types.ObjectId.isValid(req.body.projectId)) {
            return res.status(400).send('Project Id is invalid')
        }
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
                mentor: projectData.mentor,
                authors: projectData.authors,
                linkToDemo: projectData.linkToDemo,
                linkToGitHub: projectData.linkToGitHub,
                timestamp: projectData.timestamp
            }
        })
    } else {
        task = new Task({
            _id: new Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            deadline: req.body.deadline,
            done: false,
    })
    }
 
    task = await task.save();
    
    res.send(task);

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

