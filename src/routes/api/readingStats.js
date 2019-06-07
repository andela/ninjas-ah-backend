import { Router } from 'express';
import ReadingStat from '../../controllers/ReadingStatController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';
import checkArticleBySlug from '../../middlewares/checkArticleBySlug';

const statsRouter = Router();

statsRouter.post(
  '/profile/:slug/stats',
  verifyToken,
  checkArticleBySlug,
  asyncHandler(ReadingStat.create)
);

statsRouter.get('/profile/stats', verifyToken, asyncHandler(ReadingStat.getAll));

export default statsRouter;
