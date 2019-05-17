import express from 'express';
import articles from './articles';
import comments from './comments';
import tags from './tags';

const router = express.Router();

router.use(articles);
router.use(tags);
router.use('/articles', comments);

export default router;
