import { Router } from 'express';
import { addMember, editMember, extendMember, getAllMember, getLogVisit, getMember, getTodayVisit, loginMember, recordVisit } from '../controllers/user-controller';
import { uploads } from '../middlewares/multer-middleware';
import { authUser } from '../middlewares/auth-middleware';

export const routerUser = Router();

routerUser.post('/addmember', addMember);
routerUser.post('/loginMember', uploads.none(), loginMember);
routerUser.get('/getMember/:id', authUser, getMember);
routerUser.get('/getAllMember', getAllMember);
routerUser.patch('/editMember/:id', uploads.none(), editMember);
routerUser.post('/visit/:id', recordVisit);
routerUser.get('/getTodayVisit', getTodayVisit);
routerUser.get('/getVisitLog', getLogVisit);
routerUser.post('/extendMember', uploads.none(), extendMember);
