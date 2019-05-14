import express from 'express';
import comments from './comments';
import likes from './likes';

const router = express.Router();

router.use('/articles', comments);
router.use('/', likes);

export default router;
