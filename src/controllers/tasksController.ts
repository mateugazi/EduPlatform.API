import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {Task, Project, User} from '../models/tasksSchema';

route.get('/', async (req,res) => {
    const tasksList = await Task.find();
    res.send(tasksList)
})

route.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);

    task ? res.send(task[0].name) : res.status(404).send('Task not found')
})

route.post('/', async (req, res) => {

    const result = validate(req.body);
    if (result.error) {
        res.status(400).send(result.error);
        return
    }
  
    const project = await Project.findById(req.body.projectId);
    if (!project) {
        return res.status(400).send('Invalid project number.');
    };

    const user = await user.findById(req.body.userId)

    let task;
    if (user) {
        task =  new Task({
            description: req.body.description,
            deadline: req.body.deadline,
            done: req.body.done,
            project: {
                _id: project._id,
                name: project.name,
                deadline: project.deadline
            },
            user: {
                _id: user._id,
                name: user.name
            } 
        })
    } else {
        task = new Task({ 
            description: req.body.description,
            deadline: req.body.deadline,
            done: req.body.done,
            project: {
                _id: project._id,
                name: project.name,
                deadline: project.deadline
            },
        });
    }
    
    task = await task.save();
    
    res.send(task);

});

route.put('/:id', async (req,res) => {
    if (!task) {
        return res.status(404).send('No data to update')
    }

    const project = await Project.findById(req.body.projectId);
    if (!project) {
        return res.status(400).send('Invalid genre')
    }

    const user = await User.findById(req.body.userId);
    let taskData;
    if (user) {
        taskData =  {
            description: req.body.description,
            deadline: req.body.deadline,
            done: req.body.done,
            project: {
                _id: project._id,
                name: project.name,
                deadline: project.deadline
            },
            user: {
                _id: user._id,
                name: user.name
            } 
        }
    } else {
        taskData = { 
            description: req.body.description,
            deadline: req.body.deadline,
            done: req.body.done,
            project: {
                _id: project._id,
                name: project.name,
                deadline: project.deadline
            },
        };
    }


    const task = await Task.findByIdAndUpdate(req.params.id, 
        taskData,
        {new: true});

    res.send(task)
});

route.delete('/:id', async (req, res) => {

    const task = await Task.findByIdAndRemove(req.params.id)

    if (!task) {
        return res.status(404).send('No data to delete')
    }

    res.send(task)
})