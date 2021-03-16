import mongoose from 'mongoose';
import express from 'express';
import Announcement from '../../src/models/announcementSchema';
import supertest from 'supertest'
import app from '../../src/app';


const request = supertest(app);
 
const newAnnouncement = {
    _id: new mongoose.Types.ObjectId(),
    title: "test",
    content: "Here goes the content of announcement",
    type: "important"
}
const databaseName = 'announcementTest';

 
describe('/announcements', () => {

  afterEach(async () => {
        await Announcement.deleteMany({title: newAnnouncement.title})
    })
 
    describe('create announcement successfully', () => {
        const announcement = new Announcement (newAnnouncement)
        expect(announcement._id).toBeDefined();
        expect(announcement.title).toBe(newAnnouncement.title);
        expect(announcement.content).toBe(newAnnouncement.content);
        expect(announcement.type).toBe(newAnnouncement.type);
 
    });
 
    describe('GET /', () => {

    	it('get all announcements', async (done) => {
			const response = await request.get('/announcements')
			expect(response.status).toBe(200)
			done()
    });
	});

	describe('GET /announcements:id', () => {

		it('with correct Id', async done => {
			const announcement = new Announcement (newAnnouncement)
			await announcement.save()
			const response = await request.get('/announcements/' + announcement._id)
			expect(response.body.title).toBe(newAnnouncement.title)
			expect(response.body.content).toBe(newAnnouncement.content)
			expect(response.body.type).toBe(newAnnouncement.type)
			expect(response.status).toBe(200)
			done()
	});
		it('throw error - Announcement with given Id does not exist', async done => {
			const announcement = new Announcement (newAnnouncement)
			await announcement.save()
			const response = await request.get('/announcements/604ab2e675dd0751647a9870')
			expect(response.status).toEqual(404);
			expect(response.text).toEqual('Announcement with given Id does not exist');
			done()
	});
});

describe('POST /', () => {

	it('with announcement Id', async done => {
		const announcement = new Announcement (newAnnouncement)
		const response = await request.post('/announcements/').send({...newAnnouncement, announcementId: announcement._id})
		expect(response.body.title).toBe(newAnnouncement.title)
		expect(response.body.content).toBe(newAnnouncement.content)
		expect(response.body.type).toBe(newAnnouncement.type)
		expect(response.status).toBe(201)
		done()
});
});

describe('PATCH /', () => {
	it('update annoucement with given id', async done => {
		const announcement = new Announcement (newAnnouncement)
			await announcement.save()
		const patchRequest = {
			title: "test2"
		}
        const response = await request.patch('/announcements/'+ announcement._id).send({...patchRequest})
		expect(response.status).toBe(204)
		done()
});
});


describe ('DELETE /:id', () => {
        
	it('with correct Id+', async done => {
		const announcement = new Announcement (newAnnouncement)
		const response = await request.delete('/announcements/' + announcement._id)
		expect(response.status).toBe(204)
		done()
	});

	it('throw error - given id is not valid', async done => {
		const response = await request.delete('/announcements/6043cf5')
		expect(response.status).toEqual(400);
		expect(response.text).toEqual('Given id is not valid');
		done() 
	})

	it('throw error - no announcement to delete', async done => {
		const announcement = new Announcement (newAnnouncement)
		const response = await request.delete('/announcements/604ab2e675dd0751647a9874')
		expect(response.status).toEqual(404);
		expect(response.text).toEqual('There is no announcement with given id');
		done() 
	});

})
})
