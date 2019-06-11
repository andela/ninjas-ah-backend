import { Router } from 'express';
import ReadingStat from '../../controllers/ReadingStatController';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const statsRouter = Router();

statsRouter.post('/profile/:articleSlug/stats', verifyToken, asyncHandler(ReadingStat.create));

statsRouter.get('/profile/stats', verifyToken, asyncHandler(ReadingStat.getAll));

export default statsRouter;
