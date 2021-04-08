"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const projectSchema_1 = tslib_1.__importDefault(require("../../src/models/projectSchema"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("../../src/app"));
const request = supertest_1.default(app_1.default);
const authorId = new mongoose_1.default.Types.ObjectId("604a7ba6d610101287aa2957");
const newProject = {
    _id: new mongoose_1.default.Types.ObjectId(),
    title: "test project",
    description: "This is first project",
    group: "606b52280cd20000155ae8a7",
    linkToDemo: 'www.test.pl',
    linkToGitHub: 'www.test.com/test',
    timestamp: Date.now()
};
const databaseName = 'rest-mongoose-test';
describe('/projects', () => {
    afterEach(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield projectSchema_1.default.deleteMany({ title: "test project" });
    }));
    it('create project successfully', () => {
        const project = new projectSchema_1.default(newProject);
        expect(project._id).toBeDefined();
        expect(project.title).toBe(newProject.title);
        expect(project.description).toBe(newProject.description);
        expect(project.linkToDemo).toBe(newProject.linkToDemo);
        expect(project.linkToGitHub).toBe(newProject.linkToGitHub);
    });
    it('GET /projects', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/projects');
        expect(response.status).toBe(200);
        done();
    }));
    it('GET /projects/{projectIs}', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const project = new projectSchema_1.default(newProject);
        yield project.save();
        const response = yield request.get('/projects/' + project._id);
        expect(response.status).toBe(200);
        done();
    }));
    it('POST /projects', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/projects')
            .send(newProject)
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        done();
    }));
    it('DELETE /projects/:id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const project = new projectSchema_1.default(newProject);
        yield project.save();
        const response = yield request.delete('/projects/' + project._id);
        expect(response.status).toBe(200);
        done();
    }));
});
//# sourceMappingURL=projectsTest.spec.js.map