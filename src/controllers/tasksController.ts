import { Request, Response } from 'express';
import {Types} from 'mongoose';
import {Task} from '../models/tasksSchema';
import Project from '../models/projectSchema';
import {User} from '../models/userSchema';

export const AllTasks =  async (req:Request, res:Response) => {
                  // #swagger.tags = ['Tasks']

    try {
        const tasksList = await Task.find();
        res.send(tasksList)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
  
}

export const TaskById = async (req:Request, res:Response) => {
                  // #swagger.tags = ['Tasks']

    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Id is invalid')
    }

    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found')
        } 
        res.send(task) 
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }

}

export const TasksByProject = async (req:Request, res:Response) => {
                  // #swagger.tags = ['Tasks']

    if (!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Project Id is not valid');
    } 

    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            const tasksByProject = await Task.find({"project": Types.ObjectId(req.params.id)}).populate('user', 'firstName lastName');
        if (tasksByProject) {
            return res.send(tasksByProject)
        } 
        }
        res.status(404).send('Project not found')
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
    
}

export const TasksByUser = async (req:Request, res:Response) => {
                  // #swagger.tags = ['Tasks']

    if(!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('User Id is not valid');
    }

    try {
        const tasksByUser = await Task.find({"user": Types.ObjectId(req.params.id)});
        if (tasksByUser.length > 0) {
            return res.send(tasksByUser)
        } 
        res.status(404).send('Tasks not found or incorrect if for user')
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

export const TasksByUserAndProject = async (req: Request, res: Response) => {
                      // #swagger.tags = ['Tasks']

    if (!Types.ObjectId.isValid(req.params.projectId)) {
        return res.status(400).send('Project Id is not valid');
    } 
    if (!Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).send('User Id is not valid');
    }

    try {
        const tasksByUserAndProject = await Task.find({"user": Types.ObjectId(req.params.userId), "project": Types.ObjectId(req.params.projectId)});   
        if (tasksByUserAndProject.length > 0) {
            return res.send(tasksByUserAndProject)
        }
        res.status(404).send('Tasks not found')
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

export const AddTask = async (req:Request, res:Response) => {
                  // #swagger.tags = ['Tasks']

    try {
        let task;
        if (req.body.projectId && req.body.userId) {
            if (!Types.ObjectId.isValid(req.body.projectId)) {
                return res.status(400).send('Project Id is not valid');
            } 
            if (!Types.ObjectId.isValid(req.body.userId)) {
                return res.status(400).send('User Id is not valid');
            }
            const project = await Project.findById(req.body.projectId);
            const user = await User.findById(req.body.userId);

            task = new Task({
                _id: new Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                deadline: req.body.deadline,
                done: false,
                project: project,
                user: user
            })
        } else if (req.body.projectId) {
            if (!Types.ObjectId.isValid(req.body.projectId)) {
                return res.status(400).send('Project Id is not valid');
            } 
            const project = await Project.findById(req.body.projectId)
            task = new Task({
                _id: new Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                deadline: req.body.deadline,
                done: false,
                project: project
            })
        }  else if (req.body.userId) {
            if (!Types.ObjectId.isValid(req.body.userId)) {
                return res.status(400).send('User Id is not valid');
            }
            const user = await User.findById(req.body.userId)
            task = new Task({
                _id: new Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                deadline: req.body.deadline,
                done: false,
                user: user
            })
        } else {
            task = new Task({
                _id: new Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                deadline: req.body.deadline,
                done: false })
        }  

        const response = await task.save();
        res.send(response)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }


}

export const UpdateTask = async (req:Request,res:Response) => {
                  // #swagger.tags = ['Tasks']

    if(!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Id is not valid')
    }

    if ( req.body.userId && !Types.ObjectId.isValid(req.body.userId)) {
        return res.status(400).send('User Id is not valid');
    }

    try {
        const user = await User.findById(req.body.userId); 

        let taskData =  {
            _id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            deadline: req.body.deadline,
            done: req.body.done,
            user: user
        };

        const task = await Task.findByIdAndUpdate(req.params.id, 
            taskData,
            {new: true});
        if(!task) {
            return res.status(404).send('No task to update')
        }
        res.send(task)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

export const DeleteTask = async (req: Request, res: Response) => {
                  // #swagger.tags = ['Tasks']

    if(!Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Id is not valid');
    } 

    try {
        const task = await Task.findByIdAndRemove(req.params.id)
        if (!task) {
            return res.status(404).send('No data to delete')
        }
        res.send(task)
    } catch (error) {
        res.status(500).json({
            error: error
        })
    }
}

