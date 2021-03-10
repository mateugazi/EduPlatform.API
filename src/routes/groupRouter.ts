import express from 'express';
import { groupCreateGroup, groupGetSingleGroup, groupGetAllGroup, groupAddMember } from '../controllers/groupController';

const groupRouter = express.Router();

groupRouter.post('/createGroup', groupCreateGroup);
groupRouter.get('/', groupGetAllGroup)
groupRouter.get('/:groupId', groupGetSingleGroup)
groupRouter.put('/addMember/:id', groupAddMember)

export default groupRouter;
