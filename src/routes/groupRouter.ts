import express from 'express';
import { 
    groupCreateGroup, 
    groupGetSingleGroup,
    groupGetAllGroup, 
    groupAddMember, 
    groupDeleteMember,
    groupChangeName
} from '../controllers/groupController';

const groupRouter = express.Router();

groupRouter.post('/createGroup', groupCreateGroup);
groupRouter.get('/', groupGetAllGroup)
groupRouter.get('/:groupId', groupGetSingleGroup)
groupRouter.put('/addMember/:groupId', groupAddMember)
groupRouter.put('/deleteMember/:groupId', groupDeleteMember)
groupRouter.put('/changeName/:groupId', groupChangeName)

export default groupRouter;
