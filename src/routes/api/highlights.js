import { Router } from 'express';
import HighlightController from '../../controllers/HighlightController';
import validateHighlight from '../../middlewares/validation/highlights';
import checkArticle from '../../middlewares/checkArticle';
import verifyToken from '../../middlewares/verifyToken';
import asyncHandler from '../../middlewares/asyncHandler';

const router = Router();

router.post(
  '/:articleSlug/highlights',
  verifyToken,
  validateHighlight.create,
  checkArticle,
  asyncHandler(HighlightController.create)
);

router.get(
  '/:articleSlug/highlights',
  verifyToken,
  checkArticle,
  asyncHandler(HighlightController.getHighlights)
);

router.delete(
  '/:articleSlug/highlights/:id',
  verifyToken,
  checkArticle,
  asyncHandler(HighlightController.deleteHighlights)
);

export default router;
