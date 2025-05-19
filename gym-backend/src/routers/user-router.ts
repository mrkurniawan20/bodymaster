import { Router } from 'express';
import { addMember, editMember, extendMember, getAllMember, getAllPayment, getLogVisit, getMember, getTodayVisit, loginMember, recordVisit } from '../controllers/user-controller';
// import { uploads } from '../middlewares/multer-middleware';

import { authUser } from '../middlewares/auth-middleware';
import { uploadProfilePicture, uploads } from '../middlewares/multer-middleware';

export const routerUser = Router();

routerUser.post('/addmember', authUser, uploadProfilePicture.none(), addMember);
routerUser.post('/loginMember', uploadProfilePicture.none(), loginMember);
routerUser.get('/getMember/:id', authUser, getMember);
routerUser.get('/getAllMember', authUser, getAllMember);
routerUser.patch('/editMember/:id', uploadProfilePicture.none(), editMember);
routerUser.post('/visit/:id', recordVisit);
routerUser.get('/getTodayVisit', authUser, getTodayVisit);
routerUser.get('/getVisitLog', authUser, getLogVisit);
routerUser.get('/getpayment', authUser, getAllPayment);
routerUser.post('/extendMember', uploadProfilePicture.none(), extendMember);
