import express from 'express';
import articles from './articles';

const router = express.Router();

router.use(articles);

export default router;
