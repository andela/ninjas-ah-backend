import express from 'express';
import articles from './articles';
import comments from './comments';
import tags from './tags';
import users from './users';
import chats from './chats';
<<<<<<< HEAD
import upload from './upload';
import likes from './likes';
import report from './reports';
=======
>>>>>>> [ft-165412939] add role based functionality
import roles from './roles';
import permissions from './permissions';

const router = express.Router();

router.use(articles);
router.use('/users/roles', roles);
router.use(tags);
router.use('/articles', comments);
router.use('/users', users);
router.use('/chats', chats);
<<<<<<< HEAD
router.use(upload);
router.use('/articles', likes);
router.use('/article', report);
=======
>>>>>>> [ft-165412939] add role based functionality
router.use('/permissions', permissions);

export default router;
