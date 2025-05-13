import { Router } from 'express';
import { addMember, editMember, getMember, loginMember } from '../controllers/user-controller';
import { uploads } from '../middlewares/multer-middleware';
import { authUser } from '../middlewares/auth-middleware';

export const routerUser = Router();

routerUser.post('/addmember', addMember);
routerUser.post('/loginMember', uploads.none(), loginMember);
routerUser.get('/getMember/:id', authUser, getMember);
routerUser.patch('/editMember/:id', uploads.none(), editMember);
