"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const tasksSchema_1 = require("../../src/models/tasksSchema");
const projectSchema_1 = tslib_1.__importDefault(require("../../src/models/projectSchema"));
const userSchema_1 = require("../../src/models/userSchema");
const tasksRouter_1 = tslib_1.__importDefault(require("../../src/routes/tasksRouter"));
const express_1 = tslib_1.__importDefault(require("express"));
const body_parser_1 = require("body-parser");
const supertest = require('supertest');
const app = express_1.default();
app.use(body_parser_1.json());
app.use(body_parser_1.urlencoded({ extended: false }));
app.use("/", tasksRouter_1.default);
const request = supertest(app);
const newTask = {
    _id: new mongoose_1.default.Types.ObjectId(),
    name: 'Test task',
    description: 'This is test task',
    deadline: 1615923590,
    done: false,
    projectId: '',
    userId: ''
};
const newMentor = {
    _id: new mongoose_1.default.Types.ObjectId(),
    firstName: 'A',
    lastName: 'B',
    email: 'abc@abc.abc',
    password: 'abcdefghij',
    login: 'abc',
    role: 'mentor'
};
const newUser = {
    _id: new mongoose_1.default.Types.ObjectId(),
    firstName: 'C',
    lastName: 'D',
    email: 'def@def.def',
    password: 'abcdefghij',
    login: 'def',
    role: "participant"
};
const newProject = {
    _id: new mongoose_1.default.Types.ObjectId(),
    title: "First project",
    description: "First firs",
    mentor: newMentor._id,
    authors: [newUser._id],
    linkToDemo: null,
    linkToGitHub: 'testtest',
    timestamp: 1615923590
};
const databaseName = 'taskTest';
describe('/tasks', () => {
    beforeAll(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const url = `mongodb://127.0.0.1/${databaseName}`;
        yield mongoose_1.default.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    }));
    afterEach(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield tasksSchema_1.Task.deleteMany();
        yield projectSchema_1.default.deleteMany();
        yield userSchema_1.User.deleteMany();
    }));
    describe('create user successfully', () => {
        const task = new tasksSchema_1.Task(newTask);
        expect(task._id).toBeDefined();
        expect(task.name).toBe(newTask.name);
        expect(task.description).toBe(newTask.description);
        expect(task.deadline).toBe(newTask.deadline);
        expect(task.done).toBe(newTask.done);
    });
    describe('GET /', () => {
        it('get empty []', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/');
            expect(response.body.length).toEqual(0);
            expect(response.status).toEqual(200);
            done();
        }));
        it('get one task', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const task = new tasksSchema_1.Task(newTask);
            yield task.save();
            const response = yield request.get('/');
            expect(response.body.length).toEqual(1);
            expect(response.status).toEqual(200);
            expect(response.body[0].name).toBe(task.name);
            expect(response.body[0].description).toBe(task.description);
            expect(response.body[0].deadline).toBe(task.deadline);
            expect(response.body[0].done).toBe(task.done);
            done();
        }));
    });
    describe('GET /:id', () => {
        it('with correct Id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const task = new tasksSchema_1.Task(newTask);
            yield task.save();
            const response = yield request.get('/' + task._id);
            expect(response.status).toEqual(200);
            expect(response.body.name).toBe(newTask.name);
            expect(response.body.description).toBe(newTask.description);
            expect(response.body.deadline).toBe(newTask.deadline);
            expect(response.body.done).toBe(newTask.done);
            done();
        }));
        it('throw error - task not found', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const task = new tasksSchema_1.Task(newTask);
            yield task.save();
            const response = yield request.get('/6043cf5f981add1944946a23');
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Task not found');
            done();
        }));
        it('throw error - id is invalid', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/6043cf5');
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('Id is invalid');
            done();
        }));
    });
    describe('GET /project/:id', () => {
        it('with correct Project Id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const project = new projectSchema_1.default(newProject);
            yield project.save();
            yield request.post('/').send(Object.assign(Object.assign({}, newTask), { projectId: project._id }));
            const response = yield request.get('/project/' + project._id);
            expect(response.status).toEqual(200);
            expect(response.body.length).toEqual(1);
            expect(response.body[0].name).toBe(newTask.name);
            expect(response.body[0].description).toBe(newTask.description);
            expect(response.body[0].deadline).toBe(newTask.deadline);
            expect(response.body[0].done).toBe(newTask.done);
            expect(JSON.stringify(response.body[0].project)).toBe(JSON.stringify(newProject._id));
            done();
        }));
        it('with lack of task for project ID', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const project = new projectSchema_1.default(newProject);
            yield project.save();
            const response = yield request.get('/project/' + project._id);
            expect(response.status).toEqual(200);
            done();
        }));
        it('with no Project Id in database', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/project/6043cf5f981add1944946acc');
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Project not found');
            done();
        }));
        it('with incorrect Project Id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/project/6043cf');
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('Project Id is not valid');
            done();
        }));
    });
    describe('GET /user/:id', () => {
        it('with correct User Id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const user = new userSchema_1.User(newUser);
            yield user.save();
            yield request.post('/').send(Object.assign(Object.assign({}, newTask), { userId: user._id }));
            const response = yield request.get('/user/' + user._id);
            expect(response.status).toEqual(200);
            expect(response.body.length).toEqual(1);
            expect(response.body[0].name).toBe(newTask.name);
            expect(response.body[0].description).toBe(newTask.description);
            expect(response.body[0].deadline).toBe(newTask.deadline);
            expect(response.body[0].done).toBe(newTask.done);
            expect(JSON.stringify(response.body[0].user)).toBe(JSON.stringify(newUser._id));
            done();
        }));
        it('with lack of task for user ID', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const user = new userSchema_1.User(newUser);
            yield user.save();
            const response = yield request.get('/user/' + user._id);
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Tasks not found or incorrect if for user');
            done();
        }));
        it('with no User Id in database', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/user/6043cf5f981add1944946acc');
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Tasks not found or incorrect if for user');
            done();
        }));
        it('with incorrect User Id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/user/6043cf');
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('User Id is not valid');
            done();
        }));
    });
    describe('DELETE /:id', () => {
        it('with correct Id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const task = new tasksSchema_1.Task(newTask);
            yield task.save();
            const response = yield request.delete('/' + task._id);
            expect(response.status).toEqual(200);
            expect(response.body.name).toBe(task.name);
            expect(response.body.description).toBe(task.description);
            expect(response.body.deadline).toBe(task.deadline);
            expect(response.body.done).toBe(task.done);
            done();
        }));
        it('throw error - no data to delete', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const task = new tasksSchema_1.Task(newTask);
            yield task.save();
            const response = yield request.delete('/6043cf5f981add1944946a23');
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('No data to delete');
            done();
        }));
        it('throw error - id is not valid', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete('/6043cf5');
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('Id is not valid');
            done();
        }));
    });
    describe('PUT /:id', () => {
        it('update task', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const task = new tasksSchema_1.Task(newTask);
            yield task.save();
            const response = yield request.put('/' + task._id).send(newTask)
                .send({ name: 'Test task',
                description: 'Updated task',
                deadline: 1615923590,
                done: true,
                userId: null,
                projectId: null });
            expect(response.status).toEqual(200);
            expect(response.body.name).toBe(task.name);
            expect(response.body.description).toBe('Updated task');
            expect(response.body.deadline).toBe(task.deadline);
            expect(response.body.done).toBe(true);
            done();
        }));
        it('throw error - no task to update', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.put('/6043cf5f981add1944946a23').send(newTask)
                .send({ name: 'Test task',
                description: 'Updated task',
                deadline: 1615923590,
                done: true,
                userId: null,
                projectId: null });
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('No task to update');
            done();
        }));
        it('throw error - Id is not valid', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const task = new tasksSchema_1.Task(newTask);
            yield task.save();
            const response = yield request.put('/1234').send(newTask)
                .send({ name: 'Test task',
                description: 'Updated task',
                deadline: 1615923590,
                done: true,
                userId: null,
                projectId: null });
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('Id is not valid');
            done();
        }));
    });
    describe('POST /', () => {
        it('whithout embeded Project Id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/').send(newTask);
            expect(response.status).toEqual(200);
            expect(response.status).toEqual(200);
            expect(response.body.name).toBe(newTask.name);
            expect(response.body.description).toBe(newTask.description);
            expect(response.body.deadline).toBe(newTask.deadline);
            expect(response.body.done).toBe(newTask.done);
            done();
        }));
        it('with Project Id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const project = new projectSchema_1.default(newProject);
            yield project.save();
            const task = newTask;
            task.projectId = project._id;
            const response = yield request.post('/').send(task);
            expect(response.status).toEqual(200);
            expect(response.body.project.title).toBe(newProject.title);
            expect(response.body.project.description).toBe(newProject.description);
            done();
        }));
        it('throw error - project id is invalid', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/').send(Object.assign(Object.assign({}, newTask), { projectId: '6043cf5' }));
            expect(response.status).toEqual(400);
            done();
        }));
    });
});
//# sourceMappingURL=tasksTest.spec.js.map