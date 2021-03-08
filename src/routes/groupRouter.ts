import express from 'express';
import { groupCreateGroup, groupGetSingleGroup, groupGetAllGroup } from '../controllers/groupController';

const groupRouter = express.Router();

groupRouter.post('/createGroup', groupCreateGroup);
groupRouter.get('/', groupGetAllGroup)
groupRouter.get('/:groupId', groupGetSingleGroup)

export default groupRouter;
