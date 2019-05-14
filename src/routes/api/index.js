import express from 'express';
import articles from './articles';
import comments from './comments';
import tags from './tags';
import users from './users';
import chats from './chats';
import likes from './likes';

const router = express.Router();

router.use(articles);
router.use(tags);
router.use('/articles', comments);
router.use('/users', users);
router.use('/chats', chats);
router.use('/articles', likes);

export default router;
