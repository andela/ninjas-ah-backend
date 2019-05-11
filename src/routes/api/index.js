import express from 'express';
import articles from './articles';
import comments from './comments';

const router = express.Router();

router.use(articles);
router.use('/articles', comments);
export default router;
