import { Router } from 'express';
import { addMember, getMember } from '../controllers/user-controller';

export const routerUser = Router();

routerUser.post('/addmember', addMember);
routerUser.get('/getMember/:id', getMember);
