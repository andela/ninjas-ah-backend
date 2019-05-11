import express from 'express';
import comments from './comments';

const router = express.Router();

router.use('/articles', comments);

export default router;
