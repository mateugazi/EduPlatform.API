"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const groupSchema_1 = tslib_1.__importDefault(require("../../src/models/groupSchema"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("../../src/app"));
const request = supertest_1.default(app_1.default);
const userId = new mongoose_1.default.Types.ObjectId("604a7ba6d610101287aa2957");
const newGroup = {
    _id: new mongoose_1.default.Types.ObjectId(),
    mentor: "604a7b12d610101287aa2955",
    groupName: "testGroup",
    members: [userId]
};
describe('/groupManagement', () => {
    afterEach(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield groupSchema_1.default.deleteMany({ groupName: "testGroup" });
    }));
    it('Creates group', () => {
        const group = new groupSchema_1.default(newGroup);
        expect(group._id).toBeDefined();
        expect(group.groupName).toBe(newGroup.groupName);
        expect(JSON.stringify(group.mentor)).toEqual(JSON.stringify(newGroup.mentor));
        expect(group.members.length).toBe(newGroup.members.length);
        ;
    });
    it('GET /group', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/group');
        expect(response.status).toBe(200);
        done();
    }));
    it('GET /group/:groupId', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const group = new groupSchema_1.default(newGroup);
        yield group.save();
        const response = yield request.get('/group/' + group._id);
        expect(response.status).toBe(200);
        done();
    }));
    it('POST /group/createGroup', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post('/group/createGroup')
            .send(newGroup)
            .set('Accept', 'application/json');
        expect(response.status).toBe(201);
        done();
    }));
    it('DELETE /group/deleteGroup/:groupId', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const group = new groupSchema_1.default(newGroup);
        yield group.save();
        const response = yield request.delete('/group/deleteGroup/' + group._id);
        expect(response.status).toBe(200);
        done();
    }));
});
//# sourceMappingURL=groupManagementTest.spec.js.map