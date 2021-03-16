"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const announcementSchema_1 = tslib_1.__importDefault(require("../../src/models/announcementSchema"));
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("../../src/app"));
const request = supertest_1.default(app_1.default);
const newAnnouncement = {
    _id: new mongoose_1.default.Types.ObjectId(),
    title: "test",
    content: "Here goes the content of announcement",
    type: "important"
};
const databaseName = 'announcementTest';
describe('/announcements', () => {
    afterEach(() => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        yield announcementSchema_1.default.deleteMany({ title: newAnnouncement.title });
    }));
    describe('create announcement successfully', () => {
        const announcement = new announcementSchema_1.default(newAnnouncement);
        expect(announcement._id).toBeDefined();
        expect(announcement.title).toBe(newAnnouncement.title);
        expect(announcement.content).toBe(newAnnouncement.content);
        expect(announcement.type).toBe(newAnnouncement.type);
    });
    describe('GET /', () => {
        it('get all announcements', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/announcements');
            expect(response.status).toBe(200);
            done();
        }));
    });
    describe('GET /announcements:id', () => {
        it('with correct Id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const announcement = new announcementSchema_1.default(newAnnouncement);
            yield announcement.save();
            const response = yield request.get('/announcements/' + announcement._id);
            expect(response.body.title).toBe(newAnnouncement.title);
            expect(response.body.content).toBe(newAnnouncement.content);
            expect(response.body.type).toBe(newAnnouncement.type);
            expect(response.status).toBe(200);
            done();
        }));
        it('throw error - Announcement with given Id does not exist', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const announcement = new announcementSchema_1.default(newAnnouncement);
            yield announcement.save();
            const response = yield request.get('/announcements/604ab2e675dd0751647a9870');
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('Announcement with given Id does not exist');
            done();
        }));
    });
    describe('POST /', () => {
        it('with announcement Id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const announcement = new announcementSchema_1.default(newAnnouncement);
            const response = yield request.post('/announcements/').send(Object.assign(Object.assign({}, newAnnouncement), { announcementId: announcement._id }));
            expect(response.body.title).toBe(newAnnouncement.title);
            expect(response.body.content).toBe(newAnnouncement.content);
            expect(response.body.type).toBe(newAnnouncement.type);
            expect(response.status).toBe(201);
            done();
        }));
    });
    describe('PATCH /', () => {
        it('update annoucement with given id', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const announcement = new announcementSchema_1.default(newAnnouncement);
            yield announcement.save();
            const patchRequest = {
                title: "test2"
            };
            const response = yield request.patch('/announcements/' + announcement._id).send(Object.assign({}, patchRequest));
            expect(response.status).toBe(204);
            done();
        }));
    });
    describe('DELETE /:id', () => {
        it('with correct Id+', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const announcement = new announcementSchema_1.default(newAnnouncement);
            const response = yield request.delete('/announcements/' + announcement._id);
            expect(response.status).toBe(204);
            done();
        }));
        it('throw error - given id is not valid', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete('/announcements/6043cf5');
            expect(response.status).toEqual(400);
            expect(response.text).toEqual('Given id is not valid');
            done();
        }));
        it('throw error - no announcement to delete', (done) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            const announcement = new announcementSchema_1.default(newAnnouncement);
            const response = yield request.delete('/announcements/604ab2e675dd0751647a9874');
            expect(response.status).toEqual(404);
            expect(response.text).toEqual('There is no announcement with given id');
            done();
        }));
    });
});
//# sourceMappingURL=announcementsTest.spec.js.map