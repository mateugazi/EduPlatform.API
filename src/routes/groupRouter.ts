import express from 'express';
import { groupCreateGroup } from '../controllers/groupController';

const groupRouter = express.Router();

groupRouter.post('/createGroup', groupCreateGroup);

export default groupRouter;
