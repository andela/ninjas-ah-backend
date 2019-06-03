import express from 'express';
import articles from './articles';
import comments from './comments';
import tags from './tags';
import users from './users';
import chats from './chats';
import upload from './upload';
import likes from './likes';
import report from './reports';

const router = express.Router();

router.use(articles);
router.use(tags);
router.use('/articles', comments);
router.use('/users', users);
router.use('/chats', chats);
router.use(upload);
router.use('/articles', likes);
router.use('/article', report);

export default router;
