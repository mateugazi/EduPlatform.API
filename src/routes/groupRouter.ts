import express from 'express';
import { groupCreateGroup, groupGetSingleGroup } from '../controllers/groupController';

const groupRouter = express.Router();

groupRouter.post('/createGroup', groupCreateGroup);
groupRouter.get('/:groupId', groupGetSingleGroup)

export default groupRouter;
