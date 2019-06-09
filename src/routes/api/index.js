import express from 'express';
import articles from './articles';
import comments from './comments';
import tags from './tags';
import users from './users';
import chats from './chats';
import upload from './upload';
import likes from './likes';
import report from './reports';
import roles from './roles';
import permissions from './permissions';
import highlights from './highlights';
import notifications from './notifications';
import rating from './rating';

const router = express.Router();

router.use(articles);
router.use('/users/roles', roles);
router.use(tags);
router.use('/articles', comments);
router.use('/users', users);
router.use('/chats', chats);
router.use(upload);
router.use('/articles', likes);
router.use('/article', report);
router.use('/permissions', permissions);
router.use(highlights);
router.use('/notifications', notifications);
router.use(rating);

export default router;
