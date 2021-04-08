import mongoose from 'mongoose';
import Project from '../../src/models/projectSchema';
import projectsRouter from '../../src/routes/projectsRouter'
import express from 'express';
import bodyParser from 'body-parser';
import supertest from 'supertest'
import app from '../../src/app'

const request = supertest(app)

const authorId = new mongoose.Types.ObjectId("604a7ba6d610101287aa2957")
const newProject = {
    _id: new mongoose.Types.ObjectId(),
    title: "test project",
    description: "This is first project",
    group: "606b52280cd20000155ae8a7",
    linkToDemo: 'www.test.pl',
    linkToGitHub: 'www.test.com/test',
    timestamp: Date.now()
}

const databaseName = 'rest-mongoose-test';

describe('/projects', () => {

    afterEach(async () => {
        await Project.deleteMany({title: "test project"})
    })

    it('create project successfully', () => {
        const project = new Project(newProject);

        expect(project._id).toBeDefined();
        expect(project.title).toBe(newProject.title);
        expect(project.description).toBe(newProject.description);
        expect(project.linkToDemo).toBe(newProject.linkToDemo);
        expect(project.linkToGitHub).toBe(newProject.linkToGitHub);
    });

    it('GET /projects', async (done) => {
        const response = await request.get('/projects')
        expect(response.status).toBe(200)

        done()
    })

    it('GET /projects/{projectIs}', async (done) => {
        const project = new Project(newProject)
        await project.save()
        const response = await request.get('/projects/' + project._id)
        expect(response.status).toBe(200)

        done()
    })

    it('POST /projects', async (done) => {
        const response = await request.post('/projects')
            .send(newProject)
            .set('Accept', 'application/json')
        expect(response.status).toBe(201)

        done()
    })

    it('DELETE /projects/:id', async (done) => {
        const project = new Project(newProject)
        await project.save()
        const response = await request.delete('/projects/' + project._id)
        expect(response.status).toBe(200)

        done()
    })
})