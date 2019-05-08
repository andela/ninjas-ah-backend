import express from 'express';
import auth from './auth';
import articles from './api/articles';

const router = express.Router();

router.use('/auth', auth);
router.use(articles);

export default router;
