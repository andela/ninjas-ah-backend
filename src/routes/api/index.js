import express from 'express';
import articles from './articles';
import comments from './comments';
import users from './users';
import auth from './auth';

const router = express.Router();

router.use(articles);
router.use('/articles', comments);
router.use(users);
router.use(auth);

export default router;
