import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {Types} from 'mongoose';
import Project from '../models/projectSchema';

exports.projects_get_all = (req: Request, res: Response) => {
    Project
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
    Types.ObjectId.isValid(req.params.projectId) ? null : res.status(400).send('Id is not valid')
    
    Project
        .findById(req.params.projectId)
        .exec()
        .then(document => {
            if (document) {
                res.status(200).json(document)
            } else {
                res.status(404).json({
                    message: "Project not found"
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                error: error
            })
        })
}

exports.projects_add_new_project = (req: Request, res: Response) => {
    const newProject = new Project({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        mentor: req.body.mentor,
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

exports.projects_update_project = (req: Request, res: Response) => {
    Types.ObjectId.isValid(req.params.projectId) ? null : res.status(400).send('Id is not valid')
    
    if (!req.body.title || !req.body.description || !req.body.mentor || !req.body.authors || !req.body.linkToDemo || !req.body.linkToGitHub) res.status(400).send('Missing parameter')

    const projectData = {
        title: req.body.title,
        description: req.body.description,
        mentor: req.body.mentor,
        authors: req.body.authors,
        linkToDemo: req.body.linkToDemo,
        linkToGitHub: req.body.linkToGitHub,
        timestamp: Date.now()
    }

    Project.findByIdAndUpdate(req.params.projectId, projectData)
        .exec()
        .then(response => {
            res.status(200).json({
                message: "Updated successfully!",
                response: response
            })
        })
        .catch( error => {
            res.status(500).json({
                error: error
            })
        })
}

exports.projects_delete_project = (req: Request, res: Response) => {
    Types.ObjectId.isValid(req.params.projectId) ? null : res.status(400).send('Id is not valid')

    Project.findByIdAndRemove(req.params.projectId)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    message: "Deleted successfully",
                    project: doc
                })
            } else {
                res.status(404).json({
                    message: "No data to delete"
                })
            }      
        })
        .catch( error => {
            res.status(500).json({
                error: error
            })
        })
}