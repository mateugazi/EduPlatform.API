import mongoose from 'mongoose';
import Project from '../../src/models/projectSchema';
import projectRouter from '../../src/routes/projectsRouter'
import express from 'express';
import bodyParser from 'body-parser';
const supertest = require('supertest');

const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use("/", projectRouter);

const request = supertest(app)

const newProject = {
    _id: new mongoose.Types.ObjectId(),
    title: "First project",
    description: "This is first project",
    mentor: "Józef",
    authors: ["Ania", "Kasia"],
    linkToDemo: 'www.demo.pl',
    linkToGitHub: 'www.github.com/project',
    timestamp: Date.now()
}

const databaseName = 'projectsTest';

describe('projects', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${databaseName}`
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    })

    afterEach(async () => {
        await Project.deleteMany()
    })

    it('create project successfully', () => {
        const project = new Project(newProject);

        expect(project._id).toBeDefined();
        expect(project.title).toBe(newProject.title);
        expect(project.description).toBe(newProject.description);
        expect(project.mentor).toBe(newProject.mentor);
        expect(project.linkToDemo).toBe(newProject.linkToDemo);
        expect(project.linkToGitHub).toBe(newProject.linkToGitHub);
    });

    it ('GET /', async done => {
        const response = await request.get('/')
        expect(response.status).toBe(200)
        
        // await request.get('/')
        // .expect(200)

        done()
    })
})