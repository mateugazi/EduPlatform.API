import mongoose from 'mongoose';
import {Task} from '../../src/models/tasksSchema';
import Project from '../../src/models/projectSchema';
import tasksRouter from '../../src/routes/tasksRouter';
import express from 'express';
import {json, urlencoded} from 'body-parser';
const supertest = require('supertest');

const app = express();
app.use(json())
app.use(urlencoded({ extended: false }));
app.use("/", tasksRouter);

const request = supertest(app);

const newTask = {
    _id: new mongoose.Types.ObjectId(),
    name: 'Test task',
    description: 'This is test task',
    deadline: 1615923590,
    done: false,
    projectId: ''
}

const newProject = {
    _id: new mongoose.Types.ObjectId(),
    title: "First project",
    description: "First firs",
    mentor: "Mentor",
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

    describe('create user successfully', () => {
        const task = new Task(newTask);

        expect(task._id).toBeDefined();
        expect(task.name).toBe(newTask.name);
        expect(task.description).toBe(newTask.description);
        expect(task.deadline).toBe(newTask.deadline);
        expect(task.done).toBe(newTask.done);
    });

    describe('GET /', () => {
        
        it('get empty []', async done => {
            const response = await request.get('/');
            expect(response.body.length).toEqual(0);
            expect(response.status).toEqual(200);
            done()
        });

        it('get one task', async done => {
            const task = new Task(newTask);
            await task.save()
            const response = await request.get('/')
            
            expect(response.body.length).toEqual(1);
            expect(response.status).toEqual(200);
            expect(response.body[0].name).toBe(task.name)
            expect(response.body[0].description).toBe(task.description);
            expect(response.body[0].deadline).toBe(task.deadline);
            expect(response.body[0].done).toBe(task.done);
            done()
        })
    })

    describe ('GET /:id', () => {
        
        it('with correct Id', async done => {
            const task = new Task(newTask);
            await task.save()
            const response = await request.get('/' + task._id);
            expect(response.status).toEqual(200);
            expect(JSON.stringify(response.body)).toEqual(JSON.stringify(task._id));
            done()
        });

        it('throw error - task not found', async done => {
            const task = new Task(newTask);
            await task.save()
            const response = await request.get('/6043cf5f980add1944946a23')
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Task not found');
            done()
            });

        it('throw error - id is invalid', async done => {
            const response = await request.get('/6043cf5')
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('Id is invalid');
            done()
        })
    })

    describe ('GET /project/:id', () => {

        it('with correct Project Id', async done => {
            const project = new Project(newProject)
            await project.save();
            await request.post('/').send({...newTask, projectId: project._id})
            const response = await request.get('/project/' + project._id);
            expect(response.status).toEqual(200);
            expect(response.body.length).toEqual(1);
            expect(response.body[0].name).toBe(newTask.name);
            expect(response.body[0].description).toBe(newTask.description);
            expect(response.body[0].deadline).toBe(newTask.deadline);
            expect(response.body[0].done).toBe(newTask.done);
            done()
        });

        it('with lack of task for project ID', async done => {
            const project = new Project(newProject)
            await project.save();
            const response = await request.get('/project/' + project._id);
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Tasks not found or incorrect id for project');
            done()
        });

        it('with no Project Id in database', async done => {
            const response = await request.get('/project/6043cf5f980add1944946acc');
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Tasks not found or incorrect id for project');
            done()
        })

        it('with incorrect Project Id', async done => {
            const response = await request.get('/project/6043cf');
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('Project Id is not valid');
            done()
        })
    })

    describe ('DELETE /:id', () => {
        
        it('with correct Id', async done => {
            const task = new Task(newTask);
            await task.save()
            const response = await request.delete('/' + task._id)
            expect(response.status).toEqual(200);
            expect(response.body.name).toBe(task.name)
            expect(response.body.description).toBe(task.description);
            expect(response.body.deadline).toBe(task.deadline);
            expect(response.body.done).toBe(task.done);
            done()
        });

        it('throw error - no data to delete', async done => {
            const task = new Task(newTask);
            await task.save()
            const response = await request.delete('/6043cf5f980add1944946a23')
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('No data to delete');
            done() 
        });

        it('throw error - id is not valid', async done => {
            const response = await request.delete('/6043cf5')
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('Id is not valid');
            done() 
        })
    })

    describe('PUT /:id', () => {
        
        it('update task', async done => {
            const task = new Task(newTask);
            await task.save();
            const response = await request.put('/' + task._id).send(newTask)
                .send({name: 'Test task',
                description: 'Updated task',
                deadline: 1615923590,
                done: true,
                projectId: null});

            expect(response.status).toEqual(200);
            expect(response.body.name).toBe(task.name)
            expect(response.body.description).toBe('Updated task');
            expect(response.body.deadline).toBe(task.deadline);
            expect(response.body.done).toBe(true);
            done()
        });

        it('throw error - no task to update', async done => {
            const response = await request.put('/6043cf5f980add1944946a23').send(newTask)
                .send({name: 'Test task',
                description: 'Updated task',
                deadline: 1615923590,
                done: true,
                projectId: null});

            expect(response.status).toEqual(404);
            expect(response.text).toEqual('No task to update');
            done()
        })

        it('throw error - Id is not valid', async done => {
            const task = new Task(newTask);
            await task.save();
            const response = await request.put('/1234').send(newTask)
                .send({name: 'Test task',
                description: 'Updated task',
                deadline: 1615923590,
                done: true,
                projectId: null});

            expect(response.status).toEqual(400);
            expect(response.text).toEqual('Id is not valid');
            done()
        }) 
})

    describe ('POST /', () => {

        it('whithout embeded Project Id', async done => {
            const response = await request.post('/').send(newTask)
            expect(response.status).toEqual(200);
            expect(response.status).toEqual(200);
            expect(response.body.name).toBe(newTask.name)
            expect(response.body.description).toBe(newTask.description);
            expect(response.body.deadline).toBe(newTask.deadline);
            expect(response.body.done).toBe(newTask.done);
            done()
        });

        it('with Project Id', async done => {
            const project = new Project(newProject)
            await project.save()
            const response = await request.post('/').send({...newTask, projectId: project._id})
            expect(response.status).toEqual(200);
            expect(response.body.project.title).toBe(newProject.title)
            expect(response.body.project.description).toBe(newProject.description)
            done()
        });

        it('throw error - project not found', async done => {
            const response = await request.post('/').send({...newTask, projectId: '6043cf5f980add1944946a23'})
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Project not found');
            done()
        });

        it('throw error - project id is invalid', async done => {
            const response = await request.post('/').send({...newTask, projectId: '6043cf5'})
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('Project Id is invalid');
            done()
        })
    })

})
