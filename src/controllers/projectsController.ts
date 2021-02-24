import { Request, Response } from 'express';
import mongoose from 'mongoose';
import projectSchema from '../models/projectSchema';

exports.projects_get_all = (req: Request, res: Response) => {
    projectSchema
        .find({})
        .exec()
        .then(response => {
            res.status(200).json(response)
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

exports.projects_get_single = (req: Request, res: Response) => {
    const id = req.params.projectId
    console.log(id)
    projectSchema
        .findById(id)
        .exec()
        .then(document => {
            res.status(200).json(document)
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

exports.projects_add_new_project = (req: Request, res: Response) => {
    const newProject = new projectSchema({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        authors: req.body.authors,
        linkToDemo: req.body.linkToDemo,
        linkToGitHub: req.body.linkToGitHub,
        timestamp: Date.now(),
    });
    newProject
        .save()
        .then( response => {
            res.status(201).json({
                message: 'Project added successfully!',
                response: response
              });
        })
        .catch( error => {
            res.status(500).json({
                error: error
            })
        })
}