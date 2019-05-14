import express from 'express';
import articles from './articles';
import comments from './comments';
import tags from './tags';
import likes from './likes';

const router = express.Router();

router.use(articles);
router.use(tags);
router.use('/articles', comments);
router.use('/articles', likes);

export default router;
