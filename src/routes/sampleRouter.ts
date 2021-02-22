import express from 'express';
import { sampleController } from '../controllers/sampleController';

const sampleRouter = express.Router();

sampleRouter.post('/sampleRoute', sampleController);

export default sampleRouter;
