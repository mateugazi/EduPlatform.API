import mongoose from 'mongoose';
import groupSchema from '../../src/models/groupSchema';
import express from 'express';
import bodyParser from 'body-parser';
import supertest from 'supertest'
import app from '../../src/app'

const request = supertest(app)

const userId = new mongoose.Types.ObjectId("604a7ba6d610101287aa2957")
const newGroup = {
    _id: new mongoose.Types.ObjectId(),
    mentor: "604a7b12d610101287aa2955",
    groupName: "testGroup",
    members: [userId]
}

describe('/groupManagement', () => {

    afterEach(async () => {
        await groupSchema.deleteMany({groupName: "testGroup"})
    })

    it('Creates group', () => {
        const group = new groupSchema(newGroup);

        expect(group._id).toBeDefined();
        expect(group.groupName).toBe(newGroup.groupName);
        expect(JSON.stringify(group.mentor)).toEqual(JSON.stringify(newGroup.mentor));
        expect(group.members.length).toBe(newGroup.members.length);;
    });

    it('GET /group', async (done) => {
        const response = await request.get('/group')
        expect(response.status).toBe(200)

        done()
    })

   it('GET /group/:groupId', async (done) => {
        const group = new groupSchema(newGroup)
        await group.save()
        const response = await request.get('/group/' + group._id)
        expect(response.status).toBe(200)

        done()
    })
    
    it('POST /group/createGroup', async (done) => {
        const response = await request.post('/group/createGroup')
            .send(newGroup)
            .set('Accept', 'application/json')
        expect(response.status).toBe(201)

        done()
    })
    
    it('DELETE /group/deleteGroup/:groupId', async (done) => {
        const group = new groupSchema(newGroup)
        await group.save()
        const response = await request.delete('/group/deleteGroup/' + group._id)
        expect(response.status).toBe(200)

        done()
    })
})