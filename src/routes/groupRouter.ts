import express from 'express';
import { 
    groupCreateGroup, 
    groupGetSingleGroup,
    groupGetAllGroup, 
    groupAddMember, 
    groupDeleteMember,
    groupChangeName,
    groupDeleteGroup
} from '../controllers/groupController';

const groupRouter = express.Router();

groupRouter.get('/', groupGetAllGroup)
groupRouter.get('/:groupId', groupGetSingleGroup)
groupRouter.post('/createGroup', groupCreateGroup);
groupRouter.put('/addMember/:groupId', groupAddMember)
groupRouter.put('/deleteMember/:groupId', groupDeleteMember)
groupRouter.put('/changeName/:groupId', groupChangeName)
groupRouter.delete('/deleteGroup/:groupId', groupDeleteGroup)

export default groupRouter;
