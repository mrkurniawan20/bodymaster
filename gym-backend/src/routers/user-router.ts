import { Router } from 'express';
import { addMember, getMember, loginMember } from '../controllers/user-controller';
import { uploads } from '../middlewares/multer-middleware';

export const routerUser = Router();

routerUser.post('/addmember', addMember);
routerUser.post('/loginMember', uploads.none(), loginMember);
routerUser.get('/getMember/:id', getMember);
