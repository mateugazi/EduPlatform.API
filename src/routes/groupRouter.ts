import express from 'express';
import { groupCreateGroup } from '../controllers/groupController';

const groupRouter = express.Router();

groupRouter.post('/group', groupCreateGroup);

export default groupRouter;
