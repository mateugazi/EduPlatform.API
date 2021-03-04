import mongoose from 'mongoose';
import {Task} from '../../src/models/tasksSchema';
import Project from '../../src/models/projectSchema';
import tasksRouter from '../../src/routes/tasksRouter';
import express from 'express';
import bodyParser from 'body-parser';
const supertest = require('supertest');

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", tasksRouter);

const request = supertest(app);

const newTask = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Test task',
    description: 'This is test task',
    deadline: 1615923590,
    done: false,
    projectId: null
}

const newProject = {
    _id: new mongoose.Types.ObjectId(),
    title: "First project",
    description: "First firs",
    authors: ["First", "Second"],
    linkToDemo: null,
    linkToGitHub: 'testtest',
    timestamp: 1615923590
}

const databaseName= 'taskTest';

describe('/tasks', () => {
    beforeAll(async () => {
        const url = `mongodb://127.0.0.1/${databaseName}`
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    })
    
    afterEach(async () => {
        await Task.deleteMany()
        await Project.deleteMany()
      })

    it('create user successfully', () => {
        const task = new Task(newTask);

        expect(task._id).toBeDefined();
        expect(task.name).toBe(newTask.name);
        expect(task.description).toBe(newTask.description);
        expect(task.deadline).toBe(newTask.deadline);
        expect(task.done).toBe(newTask.done);
    });

    it('GET /', async done => {
        await request.get('/')
        .expect(200)
        .expect([]);

        done()
    });

    it('GET /:id', async done => {
        const task = new Task(newTask);
        await task.save()
        console.log(task._id)
        const response = await request.get('/' + task._id)
        .expect(200)
        
        done()
    });

    it('DELETE /:id', async done => {
        const task = new Task(newTask);
        await task.save()
        const response = await request.delete('/' + task._id)
        .expect(200);

        done()
    })

    it('POST /', async done => {
        const response = await request.post('/').send(newTask)
        .expect(200);
        done()
    })

    it('PUT /:id', async done => {
        const task = new Task(newTask);
        await task.save();
        const response = await request.put('/' + task._id).send(newTask)
        .send({name: 'Test task',
        description: 'This is test task',
        deadline: 1615923590,
        done: true,
        projectId: null})
        .expect(200);

        done()
    })

    it('POST / with Project ID', async done => {
        const project = new Project(newProject)
        await project.save()
        const response = await request.post('/').send({...newTask, projectId: project._id})
        .expect(200);
        done()
    })

})