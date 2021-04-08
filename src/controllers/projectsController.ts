import { Request, Response } from 'express';
import mongoose from 'mongoose';
import {Types} from 'mongoose';
import Project from '../models/projectSchema';
import Group from '../models/groupSchema';

exports.projects_get_all = (req: Request, res: Response) => {
              // #swagger.tags = ['Projects']

    Project
        .find({})
        .exec()
        .then((response: any) => {
            res.status(200).json(response)
        })
        .catch((error: any) => {
            res.status(500).json({
                error: error
            })
        })
}

exports.projects_get_single = (req: Request, res: Response) => {
                  // #swagger.tags = ['Projects']

    Types.ObjectId.isValid(req.params.projectId) ? null : res.status(400).send('Id is not valid')
    
    Project
        .findById(req.params.projectId)
        .exec()
        .then((document: any) => {
            if (document) {
                res.status(200).json(document)
            } else {
                res.status(404).json({
                    message: "Project not found"
                })
            }
        })
        .catch((error: any) => {
            res.status(500).json({
                error: error
            })
        })
}

exports.projects_add_new_project = async (req: Request, res: Response) => {
                  // #swagger.tags = ['Projects']

    const group = await Group.findById(req.body.group).catch((err: any) => res.status(404).send('Group id is not valid'))
    if (!group) res.status(404).send('Group not found')

    const newProject = new Project({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        group: group,
        linkToDemo: req.body.linkToDemo,
        linkToGitHub: req.body.linkToGitHub,
        timestamp: Date.now(),
    });
    newProject
        .save()
        .then( (response: any) => {
            res.status(201).json({
                message: 'Project added successfully!',
                data: response
            });
        })
        .catch( (error: any) => {
            res.status(500).json({
                error: error
            })
        })        
}

exports.projects_update_project = async (req: Request, res: Response) => {
                  // #swagger.tags = ['Projects']

    Types.ObjectId.isValid(req.params.projectId) ? null : res.status(400).send('Id is not valid')
    
    if (!req.body.title || !req.body.description || !req.body.group  || !req.body.linkToDemo || !req.body.linkToGitHub) res.status(400).send('Missing parameter')
    const group = await Group.findById(req.body.group).catch((err: any) => res.status(404).send('Group id is not valid'))
    if (!group) res.status(404).send('Group not found')

    const project = await Project.findById(req.params.projectId)

    const projectData = await {
        title: req.body.title,
        description: req.body.description,
        group: group,
        linkToDemo: req.body.linkToDemo,
        linkToGitHub: req.body.linkToGitHub,
        timestamp: project.timestamp
    }

    Project.findByIdAndUpdate(req.params.projectId, projectData, {new: true})
        .exec()
        .then((response: any) => {
            res.status(200).json({
                message: "Updated successfully!",
                data: response
            })
        })
        .catch( (error: any) => {
            res.status(500).json({
                error: error
            })
        })
}

exports.projects_delete_project = (req: Request, res: Response) => {
                  // #swagger.tags = ['Projects']

    Types.ObjectId.isValid(req.params.projectId) ? null : res.status(400).send('Id is not valid')

    Project.findByIdAndRemove(req.params.projectId)
        .exec()
        .then((doc: any) => {
            if (doc) {
                res.status(200).json({
                    message: "Deleted successfully",
                    data: doc
                })
            } else {
                res.status(404).json({
                    message: "No data to delete"
                })
            }      
        })
        .catch( (error: any) => {
            res.status(500).json({
                error: error
            })
        })
}